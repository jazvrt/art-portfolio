// Google Sheets config
const SHEET_ID = '1U9lZTWG_lEH2PAMBdAKZYkdK5doxbwfM-lbcnWruW8A';
const SHEET_BASE = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=`;
const proxySheet = sheetName => `https://corsproxy.io/?url=${encodeURIComponent(SHEET_BASE + encodeURIComponent(sheetName))}`;

function loadCsv(sheetName){
  return fetch(proxySheet(sheetName), {cache:'no-store'})
    .then(response => {
      if(!response.ok) throw new Error(`Could not load ${sheetName}`);
      return response.text();
    })
    .then(csv => new Promise((resolve, reject) => {
      if(typeof Papa === 'undefined') return reject(new Error('CSV parser unavailable'));
      Papa.parse(csv, {header:true, skipEmptyLines:true, complete:resolve, error:reject});
    }));
}

function escapeHtml(value){
  return String(value ?? '').replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
}

function loadGallery(){
  const gallery = document.getElementById('galleryGrid');
  if(!gallery) return;
  loadCsv('Gallery').then(result => {
    const rows = result.data.filter(item => item.Title && item.ImageURL);
    gallery.innerHTML = rows.map(item => `<figure class="gallery-item${String(item.Size).toLowerCase()==='large'?' large':''}" data-title="${escapeHtml(item.Title)}"><img src="${escapeHtml(item.ImageURL)}" alt="${escapeHtml(item.Title)}"><figcaption>${escapeHtml(item.Title)}</figcaption></figure>`).join('');
    initLightbox();
  }).catch(error => {
    console.error('Gallery load error:', error);
    gallery.innerHTML = '<p class="muted">Gallery temporarily unavailable. Please try again shortly.</p>';
  });
}

function loadPoetry(){
  const poemList = document.getElementById('poemList');
  if(!poemList) return;
  loadCsv('Poetry').then(result => {
    const rows = result.data.filter(item => item.Number && item.Poem);
    poemList.innerHTML = rows.map(item => `<article class="poem-full"><p class="poem-number">${escapeHtml(String(item.Number).padStart(2,'0'))}</p><p class="poem-text">${escapeHtml(item.Poem).replace(/\n/g,'<br>')}</p></article>`).join('');
  }).catch(error => {
    console.error('Poetry load error:', error);
    poemList.innerHTML = '<p class="muted">Poetry temporarily unavailable. Please try again shortly.</p>';
  });
}

function initLightbox(){
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  if(!lightbox || !galleryItems.length || lightbox.dataset.ready === 'true') return;
  lightbox.dataset.ready = 'true';
  const viewport=document.getElementById('zoomViewport'), image=document.getElementById('lightboxImage'), caption=document.getElementById('lightboxCaption'), close=document.getElementById('lightboxClose'), overlay=document.getElementById('lightboxOverlay'), prev=document.getElementById('lightboxPrev'), next=document.getElementById('lightboxNext');
  const images=[...galleryItems].map(item=>({src:item.querySelector('img').src,title:item.dataset.title||'Artwork'}));
  let index=0, zoomed=false, dragging=false, startX=0, startY=0, offsetX=0, offsetY=0;
  function resetZoom(){zoomed=false;dragging=false;offsetX=offsetY=0;viewport.classList.remove('zoomed','dragging');image.style.transform='translate(0px,0px) scale(1)';}
  function open(){const item=images[index];image.src=item.src;image.alt=item.title;caption.textContent=item.title;lightbox.classList.add('active');document.body.style.overflow='hidden';resetZoom();}
  function closeBox(){lightbox.classList.remove('active');document.body.style.overflow='';resetZoom();}
  function show(direction){index=(index+direction+images.length)%images.length;open();}
  galleryItems.forEach((item,i)=>item.addEventListener('click',()=>{index=i;open();}));
  image.addEventListener('click',event=>{if(dragging)return;if(!zoomed){zoomed=true;viewport.classList.add('zoomed');const rect=viewport.getBoundingClientRect();offsetX=(rect.width/2-(event.clientX-rect.left))*1.4;offsetY=(rect.height/2-(event.clientY-rect.top))*1.4;image.style.transform=`translate(${offsetX}px,${offsetY}px) scale(2.4)`;}else resetZoom();});
  viewport.addEventListener('pointerdown',event=>{if(!zoomed)return;dragging=true;viewport.classList.add('dragging');startX=event.clientX-offsetX;startY=event.clientY-offsetY;viewport.setPointerCapture(event.pointerId);});
  viewport.addEventListener('pointermove',event=>{if(!dragging)return;offsetX=event.clientX-startX;offsetY=event.clientY-startY;image.style.transform=`translate(${offsetX}px,${offsetY}px) scale(2.4)`;});
  viewport.addEventListener('pointerup',()=>{dragging=false;viewport.classList.remove('dragging');});
  close.addEventListener('click',closeBox);overlay.addEventListener('click',closeBox);prev.addEventListener('click',()=>show(-1));next.addEventListener('click',()=>show(1));
  document.addEventListener('keydown',event=>{if(!lightbox.classList.contains('active'))return;if(event.key==='Escape')closeBox();if(event.key==='ArrowLeft')show(-1);if(event.key==='ArrowRight')show(1);});
}

const menuToggle=document.querySelector('.menu-toggle'), mainNav=document.querySelector('.main-nav');
if(menuToggle&&mainNav){
  menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('active');menuToggle.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'';});
  mainNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mainNav.classList.remove('active');menuToggle.setAttribute('aria-expanded','false');document.body.style.overflow='';}));
}

const backToTop=document.createElement('button');backToTop.className='back-to-top';backToTop.textContent='↑';backToTop.setAttribute('aria-label','Back to top');document.body.appendChild(backToTop);window.addEventListener('scroll',()=>backToTop.classList.toggle('show',window.scrollY>300));backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const contactForm=document.getElementById('contactForm');
if(contactForm)contactForm.addEventListener('submit',event=>{event.preventDefault();const button=contactForm.querySelector('.btn'),original=button.textContent;button.textContent='Sent ✓';button.disabled=true;setTimeout(()=>{button.textContent=original;button.disabled=false;contactForm.reset();},2000);});

const cartItems=document.getElementById('cartItems');
if(cartItems){const cart=[];const count=document.getElementById('cartCount'),total=document.getElementById('cartTotal');document.querySelectorAll('.add-to-cart').forEach(button=>button.addEventListener('click',()=>{cart.push({name:button.dataset.name,price:Number(button.dataset.price)});showToast(`${button.dataset.name} added to cart ✓`);renderCart();}));function renderCart(){count.textContent=cart.length;total.textContent='$'+cart.reduce((sum,item)=>sum+item.price,0).toLocaleString();cartItems.innerHTML=cart.length?cart.map((item,i)=>`<div class="cart-row"><span>${escapeHtml(item.name)}</span><span>$${item.price.toLocaleString()} <button aria-label="Remove item" data-remove="${i}">×</button></span></div>`).join(''):'<p class="cart-empty">Your cart is empty.</p>';cartItems.querySelectorAll('[data-remove]').forEach(button=>button.addEventListener('click',()=>{cart.splice(Number(button.dataset.remove),1);renderCart();}));}const checkout=document.getElementById('checkoutButton');if(checkout)checkout.addEventListener('click',()=>alert(cart.length?'This is a demo checkout. Connect Stripe, PayPal, or another provider to accept payment.':'Add a work to your cart first.'));}
function showToast(message){const toast=document.createElement('div');toast.className='toast';toast.textContent=message;document.body.appendChild(toast);setTimeout(()=>toast.remove(),3000);}

loadGallery();
loadPoetry();
