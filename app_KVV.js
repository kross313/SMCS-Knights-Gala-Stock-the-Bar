(()=>{
  const D = window.STB_DATA;
  const app = document.getElementById('app');
  const page = document.body.dataset.page || 'home';

  const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const giftster = D.giftsterUrl;
  const pct = D.gala.goalItems ? Math.round((D.gala.gifted / D.gala.goalItems)*100) : 0;

  function icon(name, cls='icon'){
    const common=`class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
    const p={
      heart:`<svg ${common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>`,
      home:`<svg ${common}><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/></svg>`,
      bottle:`<svg ${common}><path d="M9 2h6v4l1.5 2.5V21h-9V8.5L9 6V2z"/><path d="M9 6h6M8 12h8"/></svg>`,
      ticket:`<svg ${common}><path d="M3 7h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V7z"/><path d="M12 8.5v7"/></svg>`,
      shaker:`<svg ${common}><path d="M8 4h8l-1 3 2 3-2 10H9L7 10l2-3-1-3z"/><path d="M9 7h6"/></svg>`,
      gift:`<svg ${common}><path d="M3 10h18v11H3z"/><path d="M12 10v11M2 7h20v3H2z"/><path d="M12 7H8.5A2.5 2.5 0 1 1 11 4.5L12 7zM12 7h3.5A2.5 2.5 0 1 0 13 4.5L12 7z"/></svg>`,
      basket:`<svg ${common}><path d="M4 9h16l-1.5 11h-13L4 9z"/><path d="M8 9c0-3 1.8-5 4-5s4 2 4 5"/><path d="M8 13v3M12 13v3M16 13v3"/></svg>`,
      arrow:`<svg ${common}><path d="M5 12h14M14 7l5 5-5 5"/></svg>`,
      back:`<svg ${common}><path d="M19 12H5M10 7l-5 5 5 5"/></svg>`,
      external:`<svg ${common}><path d="M14 3h7v7M10 14 21 3"/><path d="M21 13v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7"/></svg>`,
      mail:`<svg ${common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
      check:`<svg ${common}><path d="m5 12 4 4L19 6"/></svg>`
    };
    return p[name] || p.gift;
  }

  function header(){
    return `<header class="topbar">
      <a class="home-dot" href="index.html" aria-label="Home">${icon('home')}</a>
      <a class="brand-home" href="index.html">ST. MARTHA CATHOLIC SCHOOL</a>
      <a class="heart-link" href="basket.html" aria-label="Our Basket">${icon('heart')}</a>
    </header>`;
  }

  function footerNav(){
    return `<nav class="footer-nav" aria-label="Quick links">
      <a href="index.html">Home</a>
      <a href="basket.html">Our Basket</a>
      <a href="curated.html">Curated List</a>
      <a href="contribute.html">Contribute</a>
    </nav>`;
  }

  function progressCard(){
    return `<section class="progress-card" aria-label="Basket progress">
      <div class="progress-head">
        <div class="progress-title">${icon('gift','icon-lg')} <span>Basket Progress</span></div>
        <div class="progress-percent">${pct}%</div>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
      <div class="progress-meta"><span>${D.gala.gifted} of ${D.gala.goalItems} items gifted</span><span>${D.gala.received} received</span></div>
      <p class="progress-note">${D.gala.gifted===0 && D.gala.received===0 ? 'Nothing has been purchased or received yet.' : 'Thank you — the basket is growing.'} Each grade is asked to create a basket valued at <strong>$${D.gala.goalValue} or more</strong>.</p>
    </section>`;
  }

  function mailto(subject, body=''){
    const to=D.contacts.kelly.email;
    const cc=[D.contacts.amanda.email,D.contacts.huston.email].join(',');
    return `mailto:${to}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function gmailCompose(subject, body=''){
    const to=D.contacts.kelly.email;
    const cc=[D.contacts.amanda.email,D.contacts.huston.email].join(',');
    const q=new URLSearchParams({view:'cm',fs:'1',to,cc,su:subject,body});
    return `https://mail.google.com/mail/?${q.toString()}`;
  }

  function contactBlock(){
    const c=[D.contacts.kelly,D.contacts.amanda,D.contacts.huston];
    return `<section class="contact-card" aria-label="Contact the Room Moms">
      <div class="eyebrow">Questions?</div>
      <h3>Contact the 3rd Grade Room Moms</h3>
      <p class="contact-intro">Questions about an item, contribution, or donation? Email all three Room Moms at once.</p>
      <a class="btn contact-gmail" href="${gmailCompose('3rd Grade Stock the Bar Question')}" target="_blank" rel="noopener">${icon('mail','icon-sm')} Open Gmail to Email the Room Moms</a>
      <div class="contact-list">${c.map(x=>`<div class="contact-person"><strong>${esc(x.name)}</strong><a href="mailto:${esc(x.email)}">${esc(x.email)}</a><a href="tel:${String(x.phone).replace(/\D/g,'')}">${esc(x.phone)}</a></div>`).join('')}</div>
    </section>`;
  }

  function categoryRow(){
    const items=[
      ['bottles.html','bottle','Bottles'],
      ['experiences.html','ticket','Experiences &<br>Memberships'],
      ['barware.html','shaker','Barware &<br>Extras'],
      ['giftcards.html','gift','Gift Cards']
    ];
    return `<nav class="category-row" aria-label="Browse categories">${items.map(([href,ic,label])=>`<a class="category-link" href="${href}"><span class="category-circle">${icon(ic,'icon-lg')}</span><span class="category-label">${label}</span></a>`).join('')}</nav>`;
  }

  function actionRow(){
    return `<div class="action-row">
      <a class="action-card primary" href="curated.html">${icon('basket')}<span>Shop<br>Curated List</span></a>
      <a class="action-card gold" href="contribute.html">${icon('heart')}<span>Contribute<br>Any Amount</span></a>
      <a class="action-card" href="donate.html">${icon('gift')}<span>Donate<br>Something Similar</span></a>
    </div>`;
  }

  function brandVisual(text){ return `<div class="item-visual brand">${esc(text)}</div>`; }

  function productVisual(kind){
    let body='';
    if(kind==='tumbler') body='<rect x="18" y="20" width="38" height="70" rx="12"/><path d="M18 34h38"/>';
    else if(kind==='chiller') body='<path d="M20 18h36l-5 76H25z"/><path d="M24 34h28"/>';
    else if(kind==='cups') body='<path d="M12 34h25l-4 45H16z"/><path d="M39 34h25l-4 45H43z"/>';
    else body='<path d="M22 20h34l-5 14 8 12-10 48H29L19 46l8-12z"/><path d="M27 34h24"/>';
    return `<div class="item-visual"><svg class="product-svg" viewBox="0 0 76 110" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg></div>`;
  }

  function pageShell(content){ return `<div class="site-wrap">${header()}${content}${contactBlock()}${footerNav()}</div>`; }

  function home(){
    const featured=D.experiences[0];
    return pageShell(`
      <section class="hero-logo"><div class="hero-logo-art"><img src="assets_KVV/logo_lockup_KVV.png" alt="Stock the Bar — Gala 2026"></div></section>
      <p class="hero-copy">Help us stock the bar for an unforgettable night! Choose an item, contribute toward it, or donate something similar. Every gift helps make the evening a success — and supports our students!</p>
      ${categoryRow()}
      <section class="hero-card"><img src="assets_KVV/hero_good_drinks_KVV.jpg" alt="Good Drinks. Brighter Futures."><a class="hero-button" href="basket.html">See Our Basket ${icon('arrow','icon-sm')}</a></section>
      ${progressCard()}
      ${actionRow()}
      <div class="tagline">Same Spirits. Brighter Tomorrows.</div>

      <div class="section-break"></div>
      <section class="section-head"><div class="eyebrow">A Toast to Generosity</div><h2>Our Basket</h2><p class="section-sub">Track the 3rd Grade package as contributions come in. The launch state is intentionally empty and accurate.</p></section>
      <div class="basket-photo"><img src="assets_KVV/basket_hero_KVV.jpg" alt="Stock the Bar basket inspiration"></div>
      ${progressCard()}
      <div class="empty-state"><h3>Nothing in the basket yet</h3><p>Be the first to claim an item, contribute any amount, or donate something similar.</p></div>
      <div class="inline-cta"><a class="btn" href="basket.html">Open Our Basket ${icon('arrow','icon-sm')}</a><a class="btn secondary" href="curated.html">Browse More Items</a></div>

      <div class="section-break"></div>
      <section class="section-head"><div class="eyebrow">Featured Experience</div><h2>Individual Item Detail</h2><p class="section-sub">Featured items open into the polished detail-page treatment from the approved design.</p></section>
      <article class="feature-panel">
        <img src="${featured.hero}" alt="Cooper's Hawk featured experience">
        <div class="feature-content"><div class="eyebrow">${esc(featured.eyebrow)}</div><h2 class="feature-title">${esc(featured.name)}<br>${esc(featured.title)}</h2><p class="feature-copy">${esc(featured.desc)}</p>
        <div class="detail-actions"><a class="btn" href="detail.html?id=${featured.id}">View Featured Detail ${icon('arrow','icon-sm')}</a><a class="btn secondary" href="${giftster}" target="_blank" rel="noopener">Claim on Giftster ${icon('external','icon-sm')}</a></div></div>
      </article>`);
  }

  function pageIntro(title, subtitle, eyebrow='3rd Grade · Knights Gala'){
    return `<div class="page-pad"><a class="page-back" href="index.html">${icon('back','icon-sm')} Back to Home</a><div class="eyebrow">${eyebrow}</div><h1 class="page-title">${title}</h1><p class="page-intro">${subtitle}</p>`;
  }

  function bottles(){
    const cards=D.bottles.map(x=>`<article class="item-card">
      <div class="item-visual">${icon('bottle','icon-lg')}</div>
      <div class="item-body"><div class="item-type">${esc(x.type)}</div><div class="item-name">${esc(x.name)}</div><div class="item-sub">${esc(x.note)}</div>
      <div class="item-actions two"><a class="btn secondary" href="${mailto('3rd Grade Stock the Bar — '+x.name,'Hi Room Moms,\n\nCan you send me the adult purchase link for '+x.name+'?')}" >Request Link</a><a class="btn" href="${giftster}" target="_blank" rel="noopener">Claim</a></div></div>
    </article>`).join('');
    return pageShell(`${pageIntro('Bottles','Specific bottle selections from the Room Mom master list — not a generic bottle page.')}<div class="grid">${cards}</div><p class="admin-note">Alcohol-specific purchase links are maintained by the adult Room Moms; the public site keeps the exact item names and a working request/claim path.</p></div>`);
  }

  function experiences(){
    const cards=D.experiences.map(x=>`<article class="item-card">${x.hero?`<img class="item-photo" src="${x.hero}" alt="${esc(x.name)}">`:brandVisual(x.name)}<div class="item-body"><div class="item-type">${esc(x.eyebrow)}</div><div class="item-name">${esc(x.name)}</div><div class="item-sub">${esc(x.title)}</div><div class="item-actions"><a class="btn" href="detail.html?id=${x.id}">View Details</a></div></div></article>`).join('');
    return pageShell(`${pageIntro('Experiences & Memberships','A focused set of the strongest experience options, with the full curated list always available on Giftster.')}<div class="grid">${cards}</div><div class="inline-cta"><a class="btn gold" href="${giftster}" target="_blank" rel="noopener">See Full Curated List ${icon('external','icon-sm')}</a></div></div>`);
  }

  function barware(){
    const cards=D.barware.map(x=>`<article class="item-card">${productVisual(x.icon)}<div class="item-body"><div class="item-type">Barware & Extras</div><div class="item-name">${esc(x.name)}</div><div class="item-sub">${esc(x.variant)}</div><div class="item-price">${esc(x.price)}</div><div class="item-actions"><a class="btn" href="${x.link}" target="_blank" rel="noopener">View Item ${icon('external','icon-sm')}</a></div></div></article>`).join('');
    return pageShell(`${pageIntro('Barware & Extras','Useful additions from the curated list, presented with crisp live type instead of low-resolution screenshots.')}<div class="grid">${cards}</div><div class="inline-cta"><a class="btn gold" href="${giftster}" target="_blank" rel="noopener">See Full Curated List</a></div></div>`);
  }

  function giftcards(){
    const cards=D.giftCards.map(x=>`<article class="item-card">${brandVisual(x.name)}<div class="item-body"><div class="item-type">Gift Card</div><div class="item-name">${esc(x.name)}</div><div class="item-sub">${esc(x.sub)}</div><div class="item-actions"><a class="btn" href="${giftster}" target="_blank" rel="noopener">Claim on Giftster</a></div></div></article>`).join('');
    return pageShell(`${pageIntro('Gift Cards','More flexible options, including Cooper’s Hawk and additional local favorites.')}<div class="grid">${cards}</div><div class="inline-cta"><a class="btn gold" href="${giftster}" target="_blank" rel="noopener">See Full Curated List</a></div></div>`);
  }

  function curated(){
    return pageShell(`${pageIntro('Shop Our Curated List','Giftster is the single place families use to see the full list and claim an item.')}<div class="feature-panel"><div class="feature-content center"><div class="eyebrow">Full Wish List</div><h2 style="margin-top:6px">Giftster</h2><p class="feature-copy">See the complete curated list, claim an item, and help prevent duplicate contributions.</p><a class="btn gold full" href="${giftster}" target="_blank" rel="noopener">Open Our Giftster List ${icon('external','icon-sm')}</a><p class="admin-note">Official list: ${esc(giftster)}</p></div></div></div>`);
  }

  function contribute(){
    const k=D.contacts.kelly;
    return pageShell(`${pageIntro('Contribute Any Amount','Every contribution helps us reach the $500+ basket goal.')}<div class="goal-band">Basket goal: <strong>$${D.gala.goalValue}+</strong> · Contributions due ${D.gala.deadline}</div><div class="spacer-md"></div><div class="payment-grid">
      <div class="payment-card"><h3>Venmo</h3><p>${esc(k.venmo)}</p><a class="btn full" href="https://venmo.com/u/Kelly-VANVLEET" target="_blank" rel="noopener">Open Venmo</a></div>
      <div class="payment-card"><h3>Zelle</h3><p>${esc(k.phone)}<br>${esc(k.email)}</p><a class="btn full" href="mailto:${k.email}?subject=${encodeURIComponent('3rd Grade Stock the Bar — Zelle Contribution')}">Email Kelly</a></div>
      <div class="payment-card"><h3>Apple Cash</h3><p>${esc(k.phone)}</p><a class="btn full" href="sms:${k.phone.replace(/\D/g,'')}?body=${encodeURIComponent('3rd Grade Stock the Bar contribution')}">Message Kelly</a></div>
      <div class="payment-card"><h3>Cash / Check</h3><p>Contact the Room Moms and we’ll coordinate.</p><a class="btn full" href="${mailto('3rd Grade Stock the Bar — Cash or Check')}">Email Room Moms</a></div>
    </div><div class="inline-cta"><a class="btn secondary" href="${mailto('3rd Grade Stock the Bar Question')}">${icon('mail','icon-sm')} Questions? Email the Room Moms</a></div></div>`);
  }

  function donate(){
    return pageShell(`${pageIntro('Donate Something Similar','Have something great in mind that is not on the list? Tell the Room Moms.')}<div class="grid">
      <div class="item-card">${brandVisual('A Different Item')}<div class="item-body"><div class="item-name">Something comparable</div><div class="item-sub">A different brand or item that fits the basket.</div></div></div>
      <div class="item-card">${brandVisual('Barware')}<div class="item-body"><div class="item-name">Tools, glassware or extras</div><div class="item-sub">Useful additions are welcome.</div></div></div>
    </div><div class="inline-cta"><a class="btn full" href="${mailto('3rd Grade Stock the Bar — I Have Something to Donate','Hi Room Moms,\n\nI have something I would like to donate to the 3rd Grade Stock the Bar basket:')}">Let Us Know What You’re Donating ${icon('mail','icon-sm')}</a></div></div>`);
  }

  function basket(){
    const items = Array.isArray(D.basketItems) ? D.basketItems : [];
    const basketContent = items.length ? `<div class="grid">${items.map(x=>`<article class="item-card">${brandVisual(x.name||'Basket Item')}<div class="item-body"><div class="item-type">${esc(x.status||'Received')}</div><div class="item-name">${esc(x.name||'Basket Item')}</div><div class="item-sub">${esc(x.note||'Confirmed contribution')}</div></div></article>`).join('')}</div>` : `<div class="empty-state"><h3>What’s in the Basket</h3><p>No items have been purchased or received yet. This section will populate as contributions are confirmed during weekly updates.</p></div>`;
    return pageShell(`${pageIntro('Our Basket','A toast to generosity — track the basket as it comes together.','A Toast to Generosity')}<div class="basket-photo" style="margin-left:0;margin-right:0"><img src="assets_KVV/basket_hero_KVV.jpg" alt="Stock the Bar basket inspiration"></div>${progressCard()}${basketContent}<div class="inline-cta"><a class="btn" href="curated.html">Browse More Items ${icon('arrow','icon-sm')}</a><a class="btn secondary" href="contribute.html">Contribute Any Amount</a></div><div class="gala-card"><img src="assets_KVV/gala_poster_KVV.jpg" alt="Knights Gala — October 24, 2026 at Mote SEA"></div></div>`);
  }

  function detail(){
    const params=new URLSearchParams(location.search);
    const id=params.get('id') || 'coopers-hawk';
    const x=D.experiences.find(v=>v.id===id) || D.experiences[0];
    const heroMarkup=x.hero ? `<div class="detail-hero"><img src="${x.hero}" alt="${esc(x.name)}"></div>` : `<div class="detail-brand-hero">${esc(x.name)}</div>`;
    const features=x.features.map(f=>`<li>${icon('check','icon-sm')}<span>${esc(f)}</span></li>`).join('');
    return pageShell(`<div class="page-pad"><a class="page-back" href="experiences.html">${icon('back','icon-sm')} Back to Experiences</a>${heroMarkup}<div class="eyebrow">${esc(x.eyebrow)}</div><h1 class="page-title">${esc(x.name)}<br>${esc(x.title)}</h1><p class="page-intro">${esc(x.desc)}</p><ul class="feature-list">${features}</ul><div class="detail-note">For age-restricted purchases or bookings, the adult Room Moms manage the direct business purchase link. Families can claim the contribution on Giftster or contact the Room Moms for the business link.</div><div class="detail-actions"><a class="btn" href="${giftster}" target="_blank" rel="noopener">Claim on Giftster ${icon('external','icon-sm')}</a><a class="btn secondary" href="${mailto('3rd Grade Stock the Bar — '+x.name,'Hi Room Moms,\n\nCan you send me the direct business link for '+x.name+'?')}">Request Business Link ${icon('mail','icon-sm')}</a><a class="btn secondary" href="curated.html">Browse Our Curated List ${icon('arrow','icon-sm')}</a></div></div>`);
  }

  const renderers={home,bottles,experiences,barware,giftcards,curated,contribute,donate,basket,detail};
  app.innerHTML=(renderers[page]||home)();
})();
