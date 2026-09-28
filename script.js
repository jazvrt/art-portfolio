// Google Sheets config
const SHEET_ID = '1U9lZTWG_lEH2PAMBdAKZYkdK5doxbwfM-lbcnWruW8A';
const GALLERY_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
const POETRY_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=1`;

// Load gallery from Google Sheet
if(document.getElementById('galleryGrid')){
  fetch(GALLERY_URL)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const gallery = document.getElementById('galleryGrid');
          gallery.innerHTML = '';
          results.data.forEach((item, idx) => {
            if(item.Title && item.ImageURL) {
              const fig = document.createElement('figure');
              fig.className = item.Size === 'large' ? 'gallery-item large' : 'gallery-item';
              fig.dataset.title = item.Title;
              fig.innerHTML = `
                <img src="${item.ImageURL}" alt="${item.Title}">
                <figcaption>${item.Title}</figcaption>
              `;
              gallery.appendChild(fig);
            }
          });
          // Re-initialize gallery lightbox
          initLightbox();
        }
      });
    })
    .catch(err => console.log('Gallery load error:', err));
}

// Load poetry from Google Sheet
if(document.getElementById('poemList')){
  fetch(POETRY_URL)
    .then(res => res.text())
    .then(csv => {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const poemList = document.getElementById('poemList');
          poemList.innerHTML = '';
          results.data.forEach((item) => {
            if(item.Number && item.Poem) {
              const article = document.createElement('article');
              article.className = 'poem-full';
              article.innerHTML = `
                <p class="poem-number">${String(item.Number).padStart(2, '0')}</p>
                <p class="poem-text">${item.Poem.replace(/\n/g, '<br>')}</p>
              `;
              poemList.appendChild(article);
            }
          });
        }
      });
    })
    .catch(err => console.log('Poetry load error:', err));
}

function initLightbox(){
  const galleryItems=document.querySelectorAll('.gallery-item'),lightbox=document.getElementById('lightbox');
  if(lightbox&&galleryItems.length){
    const viewport=document.getElementById('zoomViewport'),image=document.getElementById('lightboxImage'),caption=document.getElementById('lightboxCaption'),close=document.getElementById('lightboxClose'),overlay=document.getElementById('lightboxOverlay'),prev=document.getElementById('lightboxPrev'),next=document.getElementById('lightboxNext');
    let images=[],index=0,zoomed=false,dragging=false,startX=0,startY=0,offsetX=0,offsetY=0;
    galleryItems.forEach((item,i)=>{const img=item.querySelector('img');images.push({src:img.src,title:item.dataset.title||'Artwork'});item.addEventListener('click',()=>{index=i;open();});});
    function resetZoom(){zoomed=false;dragging=false;offsetX=offsetY=0;viewport.classList.remove('zoomed','dragging');image.style.transform='translate(0px, 0px) scale(1)';}
    function open(){const item=images[index];image.src=item.src;image.alt=item.title;caption.textContent=item.title;lightbox.classList.add('active');document.body.style.overflow='hidden';resetZoom();}
    function closeBox(){lightbox.classList.remove('active');document.body.style.overflow='';resetZoom();}
    function show(direction){index=(index+direction+images.length)%images.length;open();}
    image.addEventListener('click',e=>{if(dragging)return;if(!zoomed){zoomed=true;viewport.classList.add('zoomed');const r=viewport.getBoundingClientRect();offsetX=(r.width/2-(e.clientX-r.left))*1.4;offsetY=(r.height/2-(e.clientY-r.top))*1.4;image.style.transform=`translate(${offsetX}px,${offsetY}px) scale(2.4)`;}else resetZoom();});
    viewport.addEventListener('pointerdown',e=>{if(!zoomed)return;dragging=true;viewport.classList.add('dragging');startX=e.clientX-offsetX;startY=e.clientY-offsetY;viewport.setPointerCapture(e.pointerId);});
    viewport.addEventListener('pointermove',e=>{if(!dragging)return;offsetX=e.clientX-startX;offsetY=e.clientY-startY;image.style.transform=`translate(${offsetX}px,${offsetY}px) scale(2.4)`;});
    viewport.addEventListener('pointerup',()=>{dragging=false;viewport.classList.remove('dragging');});
    close.addEventListener('click',closeBox);overlay.addEventListener('click',closeBox);prev.addEventListener('click',()=>show(-1));next.addEventListener('click',()=>show(1));
    document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('active'))return;if(e.key==='Escape')closeBox();if(e.key==='ArrowLeft')show(-1);if(e.key==='ArrowRight')show(1);});
  }
}

// Menu toggle
const menuToggle=document.querySelector('.menu-toggle'),mainNav=document.querySelector('.main-nav');
if(menuToggle&&mainNav){
  menuToggle.addEventListener('click',()=>{
    const open=mainNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
  });
  mainNav.querySelectorAll('a').forEach(link=>
    link.addEventListener('click',()=>{
      mainNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    })
  );
}

// Back to top button
const backToTop=document.createElement('button');
backToTop.className='back-to-top';
backToTop.textContent='↑';
backToTop.setAttribute('aria-label','Back to top');
document.body.appendChild(backToTop);
window.addEventListener('scroll',()=>backToTop.classList.toggle('show',window.scrollY>300));
backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Contact form
const contactForm=document.getElementById('contactForm');
if(contactForm)contactForm.addEventListener('submit',e=>{
  e.preventDefault();
  const button=contactForm.querySelector('.btn'),original=button.textContent;
  button.textContent='Sent ✓';
  button.disabled=true;
  setTimeout(()=>{
    button.textContent=original;
    button.disabled=false;
    contactForm.reset();
  },2000);
});

// Cart functionality
const cartItems=document.getElementById('cartItems');
if(cartItems){
  const cart=[];
  const count=document.getElementById('cartCount'),total=document.getElementById('cartTotal');
  document.querySelectorAll('.add-to-cart').forEach(button=>
    button.addEventListener('click',()=>{
      cart.push({name:button.dataset.name,price:Number(button.dataset.price)});
      showToast(`${button.dataset.name} added to cart ✓`);
      renderCart();
    })
  );
  function renderCart(){
    count.textContent=cart.length;
    total.textContent='$'+cart.reduce((sum,item)=>sum+item.price,0).toLocaleString();
    cartItems.innerHTML=cart.length?cart.map((item,i)=>`<div class="cart-row"><span>${item.name}</span><span>$${item.price.toLocaleString()} <button aria-label="Remove item" data-remove="${i}">×</button></span></div>`).join(''):'<p class="cart-empty">Your cart is empty.</p>';
    cartItems.querySelectorAll('[data-remove]').forEach(button=>
      button.addEventListener('click',()=>{
        cart.splice(Number(button.dataset.remove),1);
        renderCart();
      })
    );
  }
  const checkout=document.getElementById('checkoutButton');
  if(checkout)checkout.addEventListener('click',()=>alert(cart.length?'This is a demo checkout. Connect Stripe, PayPal, or another provider to accept payment.':'Add a work to your cart first.'));
}

function showToast(message){
  const toast=document.createElement('div');
  toast.className='toast';
  toast.textContent=message;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),3e3);
}
