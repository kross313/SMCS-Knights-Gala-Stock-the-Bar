(() => {
  const D = window.STOCK_BAR_DATA;
  const root = document.getElementById('app');

  const icons = {
    menu:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
    heart:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z"/></svg>`,
    bottle:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 2h6v4l2 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-3zM9 6h6M7 13h10"/></svg>`,
    ticket:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18v10H3zM8 7c0 2-1 3-3 3v4c2 0 3 1 3 3M16 7c0 2 1 3 3 3v4c-2 0-3 1-3 3"/><path d="m12 10 .7 1.5 1.7.2-1.2 1.1.3 1.7-1.5-.8-1.5.8.3-1.7-1.2-1.1 1.7-.2z"/></svg>`,
    shaker:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 2h6l-1 4h-4zM8 6h8l2 5-2 11H8L6 11zM7 11h10"/></svg>`,
    gift:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10h18v11H3zM2 6h20v4H2zM12 6v15M12 6H8.5a2.5 2.5 0 1 1 0-5c2.5 0 3.5 5 3.5 5zM12 6h3.5a2.5 2.5 0 1 0 0-5C13 1 12 6 12 6z"/></svg>`,
    bag:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2"/></svg>`,
    arrow:`<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    back:`<svg class="icon-svg" style="width:18px;height:18px" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`
  };

  const route = () => (location.hash.replace(/^#\/?/,'').split('?')[0] || 'home').toLowerCase();
  const param = key => new URLSearchParams(location.hash.includes('?') ? location.hash.split('?')[1] : '').get(key);
  const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

  function topbar(){
    return `<header class="topbar"><div class="topbar-inner">
      <button class="icon-button" data-menu aria-label="Open menu" aria-expanded="false">${icons.menu}</button>
      <a class="school-mini" href="#home">St. Martha Catholic School</a>
      <a class="icon-button" href="#basket" aria-label="View our basket">${icons.heart}</a>
    </div></header>
    <nav class="nav-drawer" id="nav-drawer" hidden>
      <a href="#home">Home <span>→</span></a>
      <a href="#basket">Our Basket <span>→</span></a>
      <a href="#experiences">Experiences & Memberships <span>→</span></a>
      <a href="#barware">Barware & Extras <span>→</span></a>
      <a href="#giftcards">Gift Cards <span>→</span></a>
      <a href="#curated">Shop Curated List <span>→</span></a>
      <a href="#contribute">Contribute Any Amount <span>→</span></a>
      <a href="#donate">Donate Something Similar <span>→</span></a>
    </nav>`;
  }

  function wrap(content){ return `<main class="site">${topbar()}<div class="page">${content}</div></main>`; }

  function logoLockup(){
    return `<div class="hero-intro">
      <div class="wordmark-school">St. Martha Catholic School</div>
      <div class="wordmark-title"><strong>Stock the Bar</strong><svg class="wine-icon" viewBox="0 0 32 58" aria-hidden="true"><path d="M7 2h18l-2 23a8 8 0 0 1-7 7 8 8 0 0 1-7-7zM16 32v19M10 55h12"/><path d="M8 17h16"/></svg></div>
      <div class="wordmark-tagline">Sip &nbsp; Support &nbsp; Make a Difference</div>
      <div class="gala-line">Gala 2026</div>
      <p class="intro-copy">Help us stock the bar for an unforgettable night! Choose an item, contribute toward it, or donate something similar. Every gift helps make the evening a success — and supports our students!</p>
    </div>`;
  }

  function categoryRow(){
    return `<nav class="category-row" aria-label="Browse categories">
      <a class="category-link" href="#bottles"><div class="category-circle">${icons.bottle}</div><span>Bottles</span></a>
      <a class="category-link" href="#experiences"><div class="category-circle">${icons.ticket}</div><span>Experiences &<br>Memberships</span></a>
      <a class="category-link" href="#barware"><div class="category-circle">${icons.shaker}</div><span>Barware &<br>Extras</span></a>
      <a class="category-link" href="#giftcards"><div class="category-circle">${icons.gift}</div><span>Gift Cards</span></a>
    </nav>`;
  }

  function progress(){
    const p = D.progress;
    return `<section class="progress-card" aria-label="Basket progress">
      <div class="progress-head"><div class="progress-title">${icons.gift}<span>Basket Progress</span></div><div class="progress-number">${p.percent}%</div></div>
      <div class="progress-track"><div class="progress-fill" style="width:${p.percent}%"></div></div>
      <div class="progress-meta"><span>${p.gifted} of ${p.total} items gifted</span><span>${p.received} received</span></div>
      <p class="goal-note">Nothing has been purchased or received yet. Each grade is asked to create a basket valued at <strong>$500 or more</strong>.</p>
    </section>`;
  }

  function actionRow(){
    return `<section class="action-row" aria-label="Ways to help">
      <a class="action-card primary" href="#curated">${icons.bag}<span>Shop<br>Curated List</span></a>
      <a class="action-card gold" href="#contribute">${icons.heart}<span>Contribute<br>Any Amount</span></a>
      <a class="action-card" href="#donate">${icons.gift}<span>Donate<br>Something Similar</span></a>
    </section>`;
  }

  function home(){
    return wrap(`${logoLockup()}${categoryRow()}
      <a class="reference-hero" href="${D.giftster}" target="_blank" rel="noopener" aria-label="Browse our curated Giftster list"><img src="assets/hero_good_drinks_KVV.jpg" alt="Good Drinks. Brighter Futures. Browse our curated Giftster list"></a>
      ${progress()}${actionRow()}<div class="tagline">Same Spirits. Brighter Tomorrows.</div>`);
  }

  function pageHead(title,copy){ return `<header class="page-head"><a class="back-link" href="#home">${icons.back} Back to Home</a><div class="page-kicker">3rd Grade · Knights Gala</div><h1>${title}</h1>${copy?`<p>${copy}</p>`:''}</header>`; }

  function experienceCard(x){
    return `<article class="item-card">
      <a class="item-visual${x.image?'':' brand'}" href="#detail?id=${encodeURIComponent(x.id)}">${x.image?`<img src="${x.image}" alt="${esc(x.name)}">`:esc(x.name)}</a>
      <div class="item-card-body"><div class="item-kicker">${esc(x.kicker)}</div><h3>${esc(x.name)}</h3><p>${esc(x.copy)}</p>
      <div class="card-actions"><a class="btn" href="#detail?id=${encodeURIComponent(x.id)}">${esc(x.action)}</a><a class="btn outline" href="${D.giftster}" target="_blank" rel="noopener">Claim on Giftster</a></div></div>
    </article>`;
  }

  function experiences(){
    return wrap(`${pageHead('Experiences & Memberships','A curated set of standout local experiences. The full list lives on Giftster so families can claim items without duplicates.')}
      <section class="page-body"><div class="card-grid">${D.experiences.map(experienceCard).join('')}</div><div class="full-list"><a class="btn gold" href="${D.giftster}" target="_blank" rel="noopener">See Full Curated List</a></div></section>`);
  }

  function barware(){
    return wrap(`${pageHead('Barware & Extras','Useful, giftable additions that make the basket feel finished and premium.')}
      <section class="page-body"><div class="card-grid">${D.barware.map(x=>`<article class="item-card"><a class="item-visual" href="${x.url}" target="_blank" rel="noopener"><img src="${x.image}" alt="${esc(x.name)}"></a><div class="item-card-body"><div class="item-kicker">Barware & Extras</div><h3>${esc(x.name)}</h3><div class="price">${esc(x.price)}</div><div class="card-actions"><a class="btn" href="${x.url}" target="_blank" rel="noopener">View Product</a><a class="btn outline" href="${D.giftster}" target="_blank" rel="noopener">Claim on Giftster</a></div></div></article>`).join('')}</div><div class="full-list"><a class="btn gold" href="${D.giftster}" target="_blank" rel="noopener">See Full Curated List</a></div></section>`);
  }

  function giftcards(){
    return wrap(`${pageHead('Gift Cards','Flexible favorites that are easy to contribute and easy to use in the final basket.')}
      <section class="page-body"><div class="card-grid">${D.giftcards.map((x,i)=>`<article class="item-card"><div class="item-visual brand">${esc(x.name)}</div><div class="item-card-body"><div class="item-kicker">Gift Card</div><h3>${esc(x.name)}</h3><p>${esc(x.note)}</p><div class="card-actions"><a class="btn" href="${D.giftster}" target="_blank" rel="noopener">Claim on Giftster</a></div></div></article>`).join('')}</div><div class="full-list"><a class="btn gold" href="${D.giftster}" target="_blank" rel="noopener">See Full Curated List</a></div></section>`);
  }

  function bottles(){
    return wrap(`${pageHead('Bottles','The curated bottle list is managed through Giftster so families can claim an item and avoid duplicates.')}
      <section class="page-body"><div class="info-card"><div class="page-kicker">Curated List</div><h3>Browse the Full Bottle List on Giftster</h3><p>Use Giftster to see the current adult-managed list and claim a contribution. This keeps the website clean and helps prevent duplicate gifts.</p><div class="full-list"><a class="btn gold" href="${D.giftster}" target="_blank" rel="noopener">Open Bottle List on Giftster</a></div></div></section>`);
  }

  function curated(){
    return wrap(`${pageHead('Shop Our Curated List','Giftster is the claiming system for the complete list, so families can reserve an item and reduce duplicates.')}
      <section class="page-body"><div class="info-card" style="text-align:center;padding:28px 20px"><div class="page-kicker">Giftster</div><h3 style="font-size:29px">One List. Easy Claiming.</h3><p style="max-width:440px;margin:0 auto 16px">See the full wish list, claim an item, and return here anytime to follow basket progress.</p><a class="btn gold" href="${D.giftster}" target="_blank" rel="noopener">Open Our Giftster List</a></div></section>`);
  }

  function contribute(){
    return wrap(`${pageHead('Contribute Any Amount','Prefer to contribute toward the basket instead of shopping? Choose the method that works best for you.')}
      <section class="page-body"><div class="pay-grid">
        <a class="pay-card" href="${D.payments.venmoUrl}" target="_blank" rel="noopener"><h3>Venmo</h3><p>${D.payments.venmo}</p><small>Open Venmo →</small></a>
        <button class="pay-card" data-copy="${esc(D.payments.zelle)}"><h3>Zelle</h3><p>${esc(D.payments.zelle)}</p><small>Tap to copy</small></button>
        <button class="pay-card" data-copy="${esc(D.payments.appleCash)}"><h3>Apple Cash</h3><p>${esc(D.payments.appleCash)}</p><small>Tap to copy</small></button>
        <a class="pay-card" href="${D.payments.emailCash}"><h3>Cash / Check</h3><p>Email the Room Moms to coordinate.</p><small>Open email →</small></a>
      </div><div class="roommoms"><a href="${D.payments.emailQuestion}"><strong>Questions? Email the Room Moms</strong></a><br>Kelly Van Vleet · Amanda Bond · Kelly Huston</div><div class="toast" data-toast role="status" aria-live="polite"></div></section>`);
  }

  function donate(){
    return wrap(`${pageHead('Donate Something Similar','Have something great that fits the Stock the Bar theme but is not on the list? Tell us before bringing it in.')}
      <section class="page-body"><div class="card-grid"><article class="info-card"><h3>Barware</h3><p>Unused, giftable bar tools, glassware, serving pieces or presentation items.</p></article><article class="info-card"><h3>Gift Card or Experience</h3><p>A local gift card or experience that complements the package.</p></article><article class="info-card"><h3>Something Special</h3><p>If it fits the theme, ask us first so we can make sure it is not already covered.</p></article><article class="info-card"><h3>Another Idea?</h3><p>We are happy to help you figure out whether it fits the basket.</p></article></div><div class="full-list"><a class="btn" href="${D.payments.emailDonation}">Let Us Know What You’re Donating</a></div></section>`);
  }

  function basket(){
    return wrap(`${pageHead('Our Basket','A toast to generosity. Follow the 3rd Grade basket as it comes together.')}
      <section class="page-body"><div class="basket-subtitle">A Toast to Generosity</div><div class="basket-hero"><img src="assets/basket_hero_KVV.jpg" alt="Stock the Bar basket concept"></div>${progress()}
      <div class="basket-empty"><h3>What’s in the Basket</h3><p>Nothing has been purchased or received yet. As contributions are confirmed during weekly updates, items will appear here.</p><div class="empty-grid"><div class="empty-slot">Claimed items will appear here</div><div class="empty-slot">Received items will appear here</div><div class="empty-slot">Gift cards & experiences will appear here</div></div></div>
      <div class="full-list"><a class="btn" href="${D.giftster}" target="_blank" rel="noopener">Browse More Items</a></div><a class="gala-poster" href="${D.gala.eventUrl}" target="_blank" rel="noopener"><img src="assets/gala_poster_KVV.jpg" alt="Knights Gala at Mote SEA"></a></section>`);
  }

  function detail(){
    const id=param('id')||'coopers'; const x=D.experiences.find(e=>e.id===id)||D.experiences[0];
    const image=x.detailImage||x.image;
    const hero = image ? `<div class="detail-hero"><img src="${image}" alt="${esc(x.name)}"></div>` : `<div class="detail-hero brand-detail">${esc(x.name)}</div>`;
    return wrap(`${pageHead('Experiences & Memberships','Featured experience details.')}
      <section class="page-body">${hero}<div class="detail-tag">${esc(x.kicker)}</div><h1 class="detail-title">${esc(x.name)}</h1><p class="detail-copy">${esc(x.copy)}</p>
      <div class="feature-list"><div class="feature-row"><div class="feature-dot">✓</div><div>Featured local experience</div></div><div class="feature-row"><div class="feature-dot">✓</div><div>Claim through Giftster to reduce duplicates</div></div><div class="feature-row"><div class="feature-dot">✓</div><div>Room Moms can help with questions</div></div></div>
      <div class="detail-actions"><a class="btn" href="${D.giftster}" target="_blank" rel="noopener">Claim on Giftster</a><a class="btn outline" href="${D.payments.emailQuestion}">Ask the Room Moms</a></div></section>`);
  }

  const views={home,bottles,experiences,barware,giftcards,curated,contribute,donate,basket,detail};

  function bind(){
    const menu=document.querySelector('[data-menu]'), nav=document.querySelector('#nav-drawer');
    if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.hasAttribute('hidden'); if(open) nav.removeAttribute('hidden'); else nav.setAttribute('hidden',''); menu.setAttribute('aria-expanded',String(open));}); nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.setAttribute('hidden','')));}
    document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',async()=>{const value=btn.dataset.copy||''; try{await navigator.clipboard.writeText(value)}catch(e){const t=document.createElement('textarea');t.value=value;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();} const toast=document.querySelector('[data-toast]'); if(toast){toast.textContent='Copied: '+value;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1700);}}));
  }

  function render(){const r=route(); root.innerHTML=(views[r]||views.home)(); bind(); window.scrollTo(0,0);}
  window.addEventListener('hashchange',render); render();
})();
