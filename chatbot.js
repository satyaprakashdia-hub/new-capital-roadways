/* NCRW FAQ chatbot: runs entirely in the visitor's browser. No API key or backend. */
(() => {
  const config = (typeof NCRW_CONFIG !== 'undefined') ? NCRW_CONFIG : {};
  const phone = config.primaryPhone || '9338759080';
  const wa = `https://wa.me/${config.primaryWhatsApp || '919338759080'}`;
  const map = config.mapUrl || 'https://maps.app.goo.gl/Yd5YJ37T7SHEsDhS8?g_st=ac';

  const faqs = [
    { keys:['service','services','what do you do','what can you do'], answer:'We provide Container Service, Packers & Movers, Transport Contracting, and Lorry Supply for requirements across India.' },
    { keys:['location','where','address','office'], answer:'Our office is at Plot No. 31, Near Shiv Mandir, National Highway 16, Pahala, Bhubaneswar, Odisha 752101, India.', map:true },
    { keys:['phone','number','call','contact','mobile'], answer:`You can call NCRW on +91 ${phone}.`, call:true },
    { keys:['whatsapp','message'], answer:`You can WhatsApp NCRW on +91 ${phone}.`, whatsapp:true },
    { keys:['quote','quotation','price','rate','cost'], answer:`For a quotation, send your route and requirement on WhatsApp. Our team can discuss the vehicle/transport requirement with you.`, whatsapp:true },
    { keys:['timing','time','open','24','hours'], answer:'Customer support is available 24×7 through Call and WhatsApp.' },
    { keys:['pan india','india','all india','delivery'], answer:'Yes. NCRW provides transport and moving support for routes and requirements across India.' },
    { keys:['lorry','vehicle','407','909','1109','1110','eicher'], answer:'Lorry supply includes Open 407, 909, 1109, 1110 and Eicher vehicles, subject to availability.' },
    { keys:['industries','industry','business'], answer:'We support Manufacturing, Retail & Distribution, Household Relocation, and Commercial Movement requirements.' },
    { keys:['career','job','jobs','work'], answer:'For transport, driving, operations or support opportunities, please contact the NCRW team directly.', whatsapp:true }
  ];

  const root = document.createElement('div');
  root.innerHTML = `
    <button class="ncrw-chat-toggle" type="button" aria-label="Open NCRW help chat" aria-expanded="false">💬</button>
    <section class="ncrw-chat-panel" aria-label="NCRW help chat" aria-hidden="true">
      <header class="ncrw-chat-head">
        <div><strong>NCRW Help</strong><small>Quick answers about our services</small></div>
        <button class="ncrw-chat-close" type="button" aria-label="Close chat">×</button>
      </header>
      <div class="ncrw-chat-body" data-chat-body></div>
      <footer class="ncrw-chat-foot">
        <form class="ncrw-chat-form" data-chat-form>
          <input class="ncrw-chat-input" data-chat-input type="text" placeholder="Ask about services, location..." autocomplete="off" aria-label="Ask NCRW a question">
          <button class="ncrw-chat-send" type="submit">Send</button>
        </form>
        <div class="ncrw-chat-note">FAQ assistant • <a href="${wa}" target="_blank" rel="noopener">WhatsApp us</a></div>
      </footer>
    </section>`;
  document.body.appendChild(root);

  const toggle = root.querySelector('.ncrw-chat-toggle');
  const panel = root.querySelector('.ncrw-chat-panel');
  const close = root.querySelector('.ncrw-chat-close');
  const body = root.querySelector('[data-chat-body]');
  const form = root.querySelector('[data-chat-form]');
  const input = root.querySelector('[data-chat-input]');

  const chips = [
    ['Services', 'What services do you provide?'],
    ['Location', 'Where are you located?'],
    ['Get a quote', 'How can I get a quotation?'],
    ['Contact', 'What is your phone number?']
  ];

  function addMessage(text, type='bot', actions={}) {
    const msg = document.createElement('div');
    msg.className = `ncrw-chat-msg ${type}`;
    msg.textContent = text;
    body.appendChild(msg);
    if (actions.map || actions.call || actions.whatsapp) {
      const row = document.createElement('div'); row.className = 'ncrw-chat-chips';
      if (actions.map) row.appendChild(actionChip('Open Google Maps', map));
      if (actions.call) row.appendChild(actionChip('Call NCRW', `tel:+91${phone}`));
      if (actions.whatsapp) row.appendChild(actionChip('WhatsApp NCRW', `${wa}?text=${encodeURIComponent('Hello New Capital Roadways, I need a transport/vehicle requirement.')}`));
      body.appendChild(row);
    }
    body.scrollTop = body.scrollHeight;
  }

  function actionChip(label, href) {
    const a = document.createElement('a'); a.className='ncrw-chat-chip'; a.textContent=label; a.href=href;
    if (href.startsWith('http')) { a.target='_blank'; a.rel='noopener'; }
    return a;
  }

  function showChips() {
    const row = document.createElement('div'); row.className='ncrw-chat-chips';
    chips.forEach(([label, question]) => {
      const b=document.createElement('button'); b.type='button'; b.className='ncrw-chat-chip'; b.textContent=label;
      b.addEventListener('click', () => handle(question)); row.appendChild(b);
    });
    body.appendChild(row); body.scrollTop=body.scrollHeight;
  }

  function normalize(s){return s.toLowerCase().replace(/[^a-z0-9+ ]/g,' ').replace(/\s+/g,' ').trim();}
  function findFaq(question){
    const q=normalize(question);
    let best=null, score=0;
    faqs.forEach(f => { let s=0; f.keys.forEach(k => { if(q.includes(normalize(k))) s += Math.max(1, normalize(k).split(' ').length); }); if(s>score){score=s;best=f;} });
    return best;
  }

  function handle(question){
    if(!question.trim()) return;
    addMessage(question,'user');
    const faq=findFaq(question);
    if(faq) addMessage(faq.answer,'bot',{map:faq.map,call:faq.call,whatsapp:faq.whatsapp});
    else addMessage(`I can answer common NCRW questions about services, location, contact, quotations and vehicles. For anything else, please call +91 ${phone} or WhatsApp us.`, 'bot', {call:true, whatsapp:true});
  }

  function setOpen(open){
    panel.classList.toggle('open',open); panel.setAttribute('aria-hidden',String(!open)); toggle.setAttribute('aria-expanded',String(open));
    if(open) setTimeout(()=>input.focus(),80);
  }

  addMessage('Hello! 👋 I can help with common NCRW questions. What would you like to know?');
  showChips();
  toggle.addEventListener('click',()=>setOpen(!panel.classList.contains('open')));
  close.addEventListener('click',()=>setOpen(false));
  form.addEventListener('submit',e=>{e.preventDefault(); const q=input.value.trim(); input.value=''; handle(q);});
})();
