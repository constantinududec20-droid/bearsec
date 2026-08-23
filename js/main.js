/* ============ INTRO: URSUL SARE SI LOVESTE VIRUSUL ============ */
(function(){
  const fx = document.getElementById('introFx');
  if(!fx) return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let seen = false;
  try{ seen = sessionStorage.getItem('bearsec-intro-seen') === '1'; }catch(e){}
  if(seen) return;

  document.documentElement.classList.add('intro-lock');
  fx.classList.add('active');
  requestAnimationFrame(()=>requestAnimationFrame(()=>fx.classList.add('in')));

  function spawnScratchAt(x, y, scale){
    const scratch = document.createElement('div');
    scratch.className = 'scratch';
    scratch.style.left = x + 'px';
    scratch.style.top = y + 'px';
    scratch.style.transform = 'scale(' + scale + ') rotate(-8deg)';
    scratch.style.zIndex = 100000;
    scratch.innerHTML =
      '<svg viewBox="0 0 150 150">'+
      '<path d="M24 40 C54 26 92 34 122 60" style="stroke-width:2.6"/>'+
      '<path d="M18 63 C50 49 92 57 128 84" style="stroke-width:3.8"/>'+
      '<path d="M20 87 C52 74 92 82 126 106" style="stroke-width:3.2"/>'+
      '<path d="M30 110 C58 100 92 106 118 124" style="stroke-width:2.2"/>'+
      '</svg>';
    document.body.appendChild(scratch);
    setTimeout(()=>scratch.remove(), 820);
  }

  function spawnImpact(){
    const pt = fx.querySelector('.impact-point');
    if(!pt) return;
    const r = pt.getBoundingClientRect();
    const x = r.left, y = r.top;

    fx.classList.add('impact');
    setTimeout(()=>fx.classList.remove('impact'), 340);

    const flash = document.createElement('div');
    flash.className = 'impact-flash';
    flash.style.setProperty('--ix', x + 'px');
    flash.style.setProperty('--iy', y + 'px');
    document.body.appendChild(flash);
    setTimeout(()=>flash.remove(), 520);

    const ring = document.createElement('div');
    ring.className = 'impact-ring';
    ring.style.left = x + 'px';
    ring.style.top = y + 'px';
    document.body.appendChild(ring);
    setTimeout(()=>ring.remove(), 560);

    for(let i=0;i<9;i++){
      const a = (Math.PI*2/9)*i + Math.random()*0.4;
      const dist = 40 + Math.random()*70;
      const sh = document.createElement('div');
      sh.className = 'impact-shard';
      sh.style.left = x + 'px';
      sh.style.top = y + 'px';
      sh.style.setProperty('--tx', Math.cos(a)*dist + 'px');
      sh.style.setProperty('--ty', Math.sin(a)*dist + 'px');
      document.body.appendChild(sh);
      setTimeout(()=>sh.remove(), 600);
    }

    spawnScratchAt(x, y, 1.7);
  }

  // ursul aterizeaza dupa lunge (~620ms), exact atunci lovim virusul
  setTimeout(spawnImpact, 640);

  // tinem scena putin dupa impact, apoi tragem cortina si iesim
  setTimeout(()=>{
    fx.classList.add('out');
    spawnScratchAt(window.innerWidth/2, window.innerHeight/2, 2.2);

    setTimeout(()=>{
      fx.remove();
      document.documentElement.classList.remove('intro-lock');
    }, 700);
  }, 2100);

  try{ sessionStorage.setItem('bearsec-intro-seen', '1'); }catch(e){}
})();

const I18N = {
  ro:{},
  en:{
    'nav.services':'Services','nav.packages':'Packages','nav.process':'Process','nav.who':'Who it\'s for',
    'nav.faq':'FAQ','nav.cta':'Get an assessment','nav.contact':'Contact','nav.founder':'Founder','nav.team':'Team',
    'hero.pill':'Active 24/7 monitoring · SIEM · Endpoint',
    'hero.h1a':'Your always-on','hero.h1b':'security watchtower',
    'hero.lead':'We monitor your servers and workstations, centralise your logs, triage the alerts and tell you exactly what matters. Real protection for small and mid-sized companies — without enterprise cost or complexity.',
    'hero.cta1':'Get a free assessment','hero.cta2':'See what we monitor',
    'hero.m1':'Live in 5 business days','hero.m2':'Critical alerts in &lt; 30 min','hero.m3':'A monthly report you\'ll actually read',
    'trust.t1':'Open-source SIEM, rules and endpoint agents',
    'trust.t2':'Segmented data, NDA and GDPR process',
    'trust.t3':'Critical alerts are validated by a human',
    'dash.assets':'Assets','dash.triage':'In triage','dash.critical':'Critical','dash.events':'Events / hour','dash.feed':'Alert feed',
    'prob.eyebrow':'The problem','prob.h2':'Most companies find out far too late that they\'ve been breached',
    'prob.lead':'Antivirus is not monitoring. Logs nobody reads are not security. An attack doesn\'t start with ransomware — it starts with a compromised account, an odd 3 a.m. login, a new service quietly running on a server.',
    'prob.n1':'~200 days','prob.p1':'Average time a breach goes undetected in a company without active monitoring.',
    'prob.n2':'1 in 3','prob.p2':'SMBs report at least one security incident a year — mostly phishing or stolen credentials.',
    'prob.n3':'0','prob.p3':'The number of small companies that can afford an in-house SOC with three shifts. That\'s why we exist.',
    'bat.eyebrow':'BearSec in action','bat.h2':'The bear never sleeps',
    'bat.lead':'A simplified view of what happens behind the monitoring every day: threats come in, the shield stops them, and anything that gets past the shield is cut down by hand.',
    'bat.blocked':'Threats blocked','bat.active':'Active now','bat.shield':'Shield integrity',
    'bat.btn':'Launch an attack wave','bat.hint':'// click anywhere to spawn a threat',
    'grd.eyebrow':'The bear','grd.h2':'Someone is watching. All the time.',
    'grd.lead':'The bear isn\'t just a logo. It\'s the idea behind BearSec: something that stays calm, doesn\'t make noise for nothing, but sees everything moving in its territory — and reacts exactly when it has to.',
    'grd.mono':'// always awake · always watching',
    'grd.b1':'24/7','grd.s1':'Continuous monitoring',
    'grd.b2':'&lt; 30 min','grd.s2':'Response to critical alerts',
    'grd.b3':'0','grd.s3':'Alerts we ignore',
    'svc.eyebrow':'Services','svc.h2':'What we actually do','svc.lead':'No acronyms thrown around. Here\'s exactly what you get.',
    'svc.t1':'SIEM & log centralisation','svc.d1':'Wazuh + Elastic collecting and correlating logs from servers, firewalls, Active Directory and cloud. One place, with retention and search.',
    'svc.t2':'Endpoint visibility','svc.d2':'Agents on workstations and servers: processes, new services, changes to critical files, USB devices, vulnerable software. See what happens, not just what got blocked.',
    'svc.t3':'Alert triage','svc.d3':'This is the real difference. A human reviews the alerts, strips out the noise and calls you only when it genuinely matters. Not 400 emails nobody opens.',
    'svc.t4':'Threat detection','svc.d4':'Rules for brute-force, privilege escalation, persistence and ransomware behaviour, enriched with threat intelligence (VirusTotal, AbuseIPDB, MISP).',
    'svc.t5':'Monthly report','svc.d5':'A short, useful document: what happened, what we stopped, what risk remains and what to fix this month. Works for audits and cyber insurance too.',
    'svc.t6':'Incident response','svc.d6':'When something does happen: we isolate the host, disable the account, collect evidence and walk you through it step by step until you\'re back to normal.',
    'risk.eyebrow':'Mini audit','risk.h2':'How visible is your infrastructure?','risk.lead':'Tick what you already have. The score is not a formal audit, but it quickly shows where monitoring is missing.',
    'risk.score':'Security score','risk.title.low':'Blind spots exposed','risk.title.mid':'Partial visibility','risk.title.high':'Strong baseline',
    'risk.text.low':'The basics are not enough yet. A compromised account or endpoint could stay quiet for too long.',
    'risk.text.mid':'You have several good controls, but quieter attacks can still sit in logs without being seen in time.',
    'risk.text.high':'You have a solid foundation. The next gain is better correlation, triage and evidence for audits.',
    'risk.c1':'MFA on important accounts<small>mail, VPN, admin, cloud</small>',
    'risk.c2':'Endpoint protection on workstations<small>active, updated antivirus/EDR</small>',
    'risk.c3':'Centralised logs<small>servers, firewall, AD, cloud</small>',
    'risk.c4':'Someone reviews alerts<small>not only automated emails</small>',
    'risk.c5':'Recurring patching<small>monthly, faster for critical fixes</small>',
    'risk.c6':'Tested backups<small>restore verified, not just copies</small>',
    'risk.c7':'Separate admin access<small>privileged accounts controlled</small>',
    'risk.c8':'Asset inventory<small>you know what must be monitored</small>',
    'risk.result.low':'<b>Recommendation:</b> BearSec Start, focused on log collection, visibility and the first useful alerts.',
    'risk.result.mid':'<b>Recommendation:</b> BearSec Business, with human triage and rules tuned to your environment.',
    'risk.result.high':'<b>Recommendation:</b> BearSec Response, to add priority containment, exercises and stronger incident readiness.',
    'soc.kicker':'SOC alert detail','soc.sev':'Severity','soc.asset':'Asset','soc.time':'Detected','soc.sla':'SLA',
    'soc.step1':'We correlate the event with endpoint, firewall and identity logs.',
    'soc.step2':'We remove noise and check whether real compromise indicators exist.',
    'soc.step3':'If the alert is real, we isolate or limit impact together with IT.',
    'soc.step4':'We send a concrete recommendation and include it in the monthly report.',
    'pkg.eyebrow':'Packages','pkg.h2':'Pick your level of coverage','pkg.lead':'Fixed monthly price, set by your number of endpoints and servers. No surprises on the invoice.',
    'pkg.price1':'quote by infrastructure','pkg.price2':'monitoring + triage','pkg.price3':'incident priority',
    'pkg.for1':'For companies that finally want to see what\'s happening in their infrastructure.',
    'pkg.s1a':'Server & critical infrastructure monitoring','pkg.s1b':'Log collection and retention','pkg.s1c':'Critical alerts via email / Slack / Teams','pkg.s1d':'Monthly security report','pkg.s1e':'Email support during business hours',
    'pkg.for2':'Full coverage across workstations and servers, with alerts triaged by a human.',
    'pkg.s2a':'Everything in Start','pkg.s2b':'Endpoint monitoring (workstations)','pkg.s2c':'Analyst-led alert triage','pkg.s2d':'File integrity & vulnerability monitoring','pkg.s2e':'Prioritised remediation guidance','pkg.s2f':'Monthly 60-minute review call',
    'pkg.for3':'For companies where a slow incident response means real money lost.',
    'pkg.s3a':'Everything in Business','pkg.s3b':'Priority incident line, 24/7','pkg.s3c':'Initial investigation & containment','pkg.s3d':'Evidence collection and post-incident report','pkg.s3e':'Response plan and annual exercise','pkg.s3f':'A dedicated analyst on your account',
    'pkg.popular':'Most chosen','pkg.cta':'Request a quote',
    'pkg.note':'We won\'t promise you\'ll never be attacked — nobody serious does. We promise you\'ll know in time, and you\'ll know what to do.',
    'proc.eyebrow':'Process','proc.h2':'From first call to active monitoring','proc.lead':'No six-month projects. You\'re on the radar in under a week.',
    'proc.t1':'Assessment','proc.d1':'A 45-minute call about your infrastructure, your risks and what hurts right now.',
    'proc.t2':'Agent rollout','proc.d2':'We deploy agents on servers and workstations. No downtime, no drama.',
    'proc.t3':'Alert tuning','proc.d3':'We tune the rules to your environment, so you get signal instead of noise.',
    'proc.t4':'Monitoring','proc.d4':'We watch, triage and escalate. You get on with your work.',
    'proc.t5':'Reporting','proc.d5':'Monthly: what happened, what we fixed, what\'s next.',
    'fdr.eyebrow':'Founder','fdr.h2':'Who\'s behind BearSec',
    'fdr.p1':'I\'m <strong>Constantin Ududec</strong>, Security Engineer &amp; SOC Analyst. Since August 26, 2022 I\'ve worked daily at Expertware as a SOC analyst — monitoring alerts, triaging real incidents and tuning detections across SIEM, EDR and firewalls, on production infrastructure. BearSec is how I bring that same operational discipline to small and mid-sized companies that can\'t afford an in-house 24/7 SOC.',
    'fdr.s1':'years in security operations','fdr.s2':'SIEM / EDR / SOAR platforms','fdr.s3':'cybersecurity certifications',
    'fdr.badge':'Available for first clients',
    'fdr.c1':'Fortinet Certified Cybersecurity Associate &amp; FortiGate 7.6 Operator',
    'fdr.c2':'Cisco Certified CyberOps Associate',
    'fdr.c3':'Microsoft Security, Compliance &amp; Identity Fundamentals',
    'fdr.c4':'Exabeam Advanced Analytics &amp; Rule Tuning (4 certifications)',
    'fdr.cta':'See my full CV',
    'aud.eyebrow':'Who it\'s for','aud.h2':'BearSec is for you if…',
    'aud.l1':'You have 10 to 250 machines and nobody dedicated to security.',
    'aud.l2':'You have internal IT or a provider, but nobody is reading the logs.',
    'aud.l3':'A client, an auditor or your insurer is asking for proof of monitoring.',
    'aud.l4':'You hold sensitive data: finance, medical, legal, manufacturing, e-commerce.',
    'aud.l5':'You\'ve already had an incident and don\'t want a repeat.',
    'aud.q':'“We don\'t sell fear and we don\'t sell acronyms. We sell the fact that when something goes wrong at 2 a.m., someone is watching — and knows exactly what to do.”',
    'aud.qa':'— BearSec',
    'faq.eyebrow':'FAQ','faq.h2':'What everyone asks us',
    'faq.q1':'Do we have to replace our current antivirus?',
    'faq.a1':'No. We work on top of what you already have — Microsoft Defender, any existing EDR or antivirus. We add the layer of visibility, correlation and triage that\'s missing. If what you have is weak, we\'ll tell you straight and suggest alternatives.',
    'faq.q2':'How long does implementation take?',
    'faq.a2':'Typically 3–5 business days for a small company. Day 1: information gathering. Days 2–3: agent deployment. Days 4–5: alert tuning and validation. From day 6 you\'re monitored.',
    'faq.q3':'Where does our data live?',
    'faq.a3':'Logs can stay inside your own infrastructure, or in an instance dedicated to you and hosted in the EU. We never mix client data and never use it for anything else. We sign an NDA and a GDPR data processing agreement.',
    'faq.q4':'What exactly happens when a critical alert fires?',
    'faq.a4':'The alert is validated by an analyst, not auto-forwarded. If it\'s real, you get a notification on your agreed channel with what happened, which systems are affected and what to do immediately. On the Response plan, we act on containment ourselves.',
    'faq.q5':'Are we too small for this?',
    'faq.a5':'It\'s the opposite — small companies are targets precisely because everyone assumes nobody is watching. The Start package is built for teams under 25 people.',
    'faq.q6':'What technology do you use?',
    'faq.a6':'Mostly industrial-grade open source: Wazuh, Elastic, Suricata, Grafana, plus threat intelligence feeds. No expensive licences passed on to you, and no vendor lock-in.',
    'band.h2':'Let\'s see what\'s actually happening on your network',
    'band.p':'A free 45-minute assessment. We tell you what we see, which risks are real, and whether it makes sense to work together. No sales pressure.',
    'band.cta':'Book the assessment',
    'ct.eyebrow':'Contact','ct.h2':'Get in touch','ct.lead':'We reply within one business day. If you have an incident in progress, call us directly.',
    'ct.formk':'Secure intake','ct.formh':'Tell us what you want protected','ct.status':'Fast reply',
    'ct.email':'Email','ct.phone':'Phone','ct.hours':'Hours',
    'ct.hoursv':'Monday–Friday, 09:00–18:00<br>24/7 incident line for Response clients',
    'ct.f1':'Name','ct.f2':'Company','ct.f3':'Email','ct.f4':'Phone','ct.f5':'Approximate number of machines','ct.f6':'What brings you here?','ct.f7':'Priority',
    'ct.q1':'Assessment','ct.q2':'Quote','ct.q3':'Incident',
    'ct.o1':'Under 25','ct.o2':'25 – 75','ct.o3':'75 – 250','ct.o4':'Over 250',
    'ct.send':'Send message','ct.proof':'The message opens in your email client, already filled in.','ct.note':'No newsletters, and we don\'t sell anyone\'s data. Full stop.',
    'ct.asset':'Affected system','ct.severity':'Severity','ct.plan':'Estimated package','ct.estimate':'Estimate',
    'quote.eyebrow':'Estimator','quote.h3':'Configure a quick estimate','quote.lead':'It is not a final quote, but it shows which BearSec level fits your infrastructure.','quote.endpoints':'Workstations','quote.servers':'Servers','quote.reco':'Recommendation','quote.month':'/ month, indicative','quote.assets':'monitored assets','quote.sla':'critical target time','quote.setup':'typical start','quote.cta':'Send configuration','quote.audit':'Run mini audit',
    'foot.tag':'Cybersecurity monitoring & alert response',
    'foot.back':'← Main site',

    'team.eyebrow':'Team','team.h1':'The people behind BearSec',
    'team.lead':'We\'re not a call center. We\'re two people with real experience in security and in running enterprise programs, who work directly with the first clients.',
    'team.f.badge':'BearSec Founder',
    'team.f.h2':'Constantin Ududec — Security Engineer & SOC Analyst',
    'team.f.p1':'Since August 26, 2022 I\'ve worked daily at Expertware as a SOC analyst — monitoring alerts, triaging real incidents and tuning detections across SIEM, EDR and firewalls, on production infrastructure. BearSec is how I bring that same operational discipline to small and mid-sized companies that can\'t afford an in-house 24/7 SOC.',
    'team.m.eyebrow':'Associate',
    'team.m.h2':'Magda Ududec — IT Project Manager & Client Delivery',
    'team.m.p1':'Since April 2022 I\'ve been leading complex enterprise programs at Emerson — cloud migrations (OCI & AWS, 500+ workloads), global acquisitions and divestitures, program governance and executive reporting for sponsors and directors. At BearSec I handle project coordination, client communication and service delivery — so every client always knows exactly where things stand.',
    'team.m.s1':'years in enterprise programs','team.m.s2':'workloads migrated (OCI / AWS)','team.m.s3':'sites migrated globally',
    'team.m.chip.pr':'PR & Client Communication',
    'team.m.badge':'Part of the BearSec team',
    'team.m.cta':'LinkedIn profile'
  }
};

document.querySelectorAll('[data-i18n]').forEach(el=>{
  const k = el.getAttribute('data-i18n');
  if(!(k in I18N.ro)) I18N.ro[k] = el.innerHTML;
});

function setLang(lang){
  const dict = I18N[lang];
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const v = dict[el.getAttribute('data-i18n')];
    if(v!==undefined) el.innerHTML = v;
  });
  document.documentElement.lang = lang;
  document.title = lang==='en'
    ? 'BearSec — 24/7 security monitoring'
    : 'BearSec — Monitorizare de securitate 24/7';
  document.querySelectorAll('.lang button').forEach(b=>b.classList.toggle('on', b.dataset.lang===lang));
  try{ localStorage.setItem('bearsec-lang', lang); }catch(e){}
  buildFeed(lang);
  updateRiskScore();
  updateQuote();
  updateIntake();
}
document.querySelectorAll('.lang button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));

const hdr=document.getElementById('hdr');
addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>12));
const burger=document.getElementById('burger'), links=document.getElementById('navlinks');
burger.onclick=()=>links.classList.toggle('open');
links.querySelectorAll('a').forEach(a=>a.onclick=()=>links.classList.remove('open'));

const io=new IntersectionObserver((es)=>{
  es.forEach((e,i)=>{ if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('in'), i*70); io.unobserve(e.target);} });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting) return;
  const el=e.target, target=+el.dataset.count; let n=0;
  const step=Math.max(1,Math.round(target/38));
  const t=setInterval(()=>{ n+=step; if(n>=target){n=target;clearInterval(t);} el.textContent=n; },28);
  cio.unobserve(el);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

(function(){
  const N=34, pts=[]; for(let i=0;i<N;i++) pts.push(28+Math.random()*30);
  const line=document.getElementById('line'), area=document.getElementById('area'), eps=document.getElementById('evtNow');
  if(!line || !area || !eps) return;
  function draw(){
    const W=300,H=76,stepX=W/(N-1);
    let d='';
    pts.forEach((v,i)=>{ d+=(i?' L':'M')+(i*stepX).toFixed(1)+' '+(H-v).toFixed(1); });
    line.setAttribute('d',d);
    area.setAttribute('d',d+' L'+W+' '+H+' L0 '+H+' Z');
    eps.textContent=Math.round(pts[N-1]*13)+' eps';
  }
  draw();
  setInterval(()=>{
    pts.shift();
    const last=pts[pts.length-1]+(Math.random()-.48)*13;
    pts.push(Math.max(12,Math.min(62,last)));
    draw();
  },1400);
})();

const ALERTS = {
  ro:[
    ['high','Brute-force SSH blocat · srv-app-01','b-high'],
    ['med','Login în afara programului · user: contab03','b-med'],
    ['low','Software vulnerabil detectat · 7-Zip 21.x','b-low'],
    ['res','Stație izolată automat · WS-042','b-res'],
    ['high','Executabil nesemnat pornit din %TEMP%','b-high'],
    ['med','Serviciu nou creat · srv-file-02','b-med'],
    ['low','Dispozitiv USB nou conectat · WS-018','b-low'],
    ['res','Cont dezactivat după 12 eșecuri','b-res'],
    ['med','Modificare fișier critic · /etc/passwd','b-med'],
    ['high','Conexiune către IP din listă neagră','b-high']
  ],
  en:[
    ['high','SSH brute-force blocked · srv-app-01','b-high'],
    ['med','Out-of-hours login · user: finance03','b-med'],
    ['low','Vulnerable software found · 7-Zip 21.x','b-low'],
    ['res','Host auto-isolated · WS-042','b-res'],
    ['high','Unsigned binary executed from %TEMP%','b-high'],
    ['med','New service created · srv-file-02','b-med'],
    ['low','New USB device attached · WS-018','b-low'],
    ['res','Account disabled after 12 failures','b-res'],
    ['med','Critical file modified · /etc/passwd','b-med'],
    ['high','Outbound connection to blacklisted IP','b-high']
  ]
};
const LABEL={high:'HIGH',med:'MED',low:'LOW',res:'DONE'};
const ALERT_DETAIL = {
  ro:{
    high:'Recomandare: validare cont, schimbare parola, verificare sesiuni active si blocare IOC daca apare lateral movement.',
    med:'Recomandare: confirmare cu ownerul sistemului, verificare change ticket si monitorizare intensificata 24h.',
    low:'Recomandare: patch la urmatoarea fereastra de mentenanta si confirmare inventar software.',
    res:'Rezolvat: actiunea automata a redus impactul. Analistul verifica daca exista urme ramase.'
  },
  en:{
    high:'Recommendation: validate the account, rotate credentials, review active sessions and block IOCs if lateral movement appears.',
    med:'Recommendation: confirm with the system owner, check the change ticket and increase monitoring for 24h.',
    low:'Recommendation: patch during the next maintenance window and confirm software inventory.',
    res:'Resolved: automated action reduced impact. The analyst checks whether any traces remain.'
  }
};
let feedTimer=null, feedLang='ro', idx=0;
const feedEl=document.getElementById('feed');

function stamp(){ return new Date().toTimeString().slice(0,8); }
function assetFromAlert(msg){
  const bits=msg.split('·');
  return (bits[1]||bits[0]).trim().replace(/^user:\s*/i,'');
}
function openSoc(item,time){
  const lang=document.documentElement.lang || feedLang;
  document.getElementById('socTitle').textContent=item[1];
  document.getElementById('socSev').textContent=LABEL[item[0]];
  document.getElementById('socAsset').textContent=assetFromAlert(item[1]);
  document.getElementById('socTime').textContent=time;
  document.getElementById('socSla').innerHTML=item[0]==='high'?'&lt; 30 min':item[0]==='med'?'same day':'monthly review';
  document.getElementById('socReco').textContent=(ALERT_DETAIL[lang]||ALERT_DETAIL.ro)[item[0]];
  const m=document.getElementById('socModal');
  m.classList.add('open');
  m.setAttribute('aria-hidden','false');
}
function closeSoc(){
  const m=document.getElementById('socModal');
  m.classList.remove('open');
  m.setAttribute('aria-hidden','true');
}
function addAlert(){
  const list=ALERTS[feedLang];
  const item=list[idx % list.length]; idx++;
  const li=document.createElement('li');
  const time=stamp();
  li.className=item[2];
  li.innerHTML='<span class="sev sev-'+item[0]+'">'+LABEL[item[0]]+'</span><span class="m">'+item[1]+'</span><span class="t">'+time+'</span>';
  li.addEventListener('click',()=>openSoc(item,time));
  feedEl.prepend(li);
  while(feedEl.children.length>5) feedEl.lastElementChild.remove();
}
function buildFeed(lang){
  feedLang=lang; feedEl.innerHTML=''; idx=0;
  for(let i=0;i<5;i++) addAlert();
  if(feedTimer) clearInterval(feedTimer);
  feedTimer=setInterval(addAlert,2600);
}

document.querySelectorAll('[data-close-soc]').forEach(el=>el.addEventListener('click',closeSoc));
addEventListener('keydown',e=>{ if(e.key==='Escape') closeSoc(); });

function updateRiskScore(){
  const checks=[...document.querySelectorAll('#riskChecks input')];
  if(!checks.length) return;
  const maxScore=84;
  const totals={id:20,ep:28,rs:36}, got={id:0,ep:0,rs:0};
  let rawScore=0;
  checks.forEach(c=>{
    if(!c.checked) return;
    const v=+c.dataset.score;
    rawScore+=v;
    got[c.dataset.area]+=v;
  });
  const score=Math.round(Math.min(100,(rawScore/maxScore)*100));
  const lang=document.documentElement.lang || 'ro';
  const level=score<45?'low':score<76?'mid':'high';
  const titles={
    ro:{low:'Zone oarbe expuse',mid:'Vizibilitate partiala',high:'Baza solida'},
    en:{low:I18N.en['risk.title.low'],mid:I18N.en['risk.title.mid'],high:I18N.en['risk.title.high']}
  };
  const texts={
    ro:{
      low:'Controalele de baza nu sunt inca suficiente. Un cont sau endpoint compromis poate ramane tacut prea mult.',
      mid:'Ai cateva controale bune, dar atacurile mai discrete pot ramane in loguri fara sa fie vazute la timp.',
      high:'Ai o fundatie buna. Urmatorul castig este corelarea, triajul si dovezile utile pentru audit.'
    },
    en:{low:I18N.en['risk.text.low'],mid:I18N.en['risk.text.mid'],high:I18N.en['risk.text.high']}
  };
  const results={
    ro:{
      low:'<b>Recomandare:</b> BearSec Start, pentru colectare loguri, vizibilitate si primele alerte utile.',
      mid:'<b>Recomandare:</b> BearSec Business, cu triaj uman si reguli ajustate pe mediul tau.',
      high:'<b>Recomandare:</b> BearSec Response, pentru containment prioritar, exercitii si pregatire de incident.'
    },
    en:{low:I18N.en['risk.result.low'],mid:I18N.en['risk.result.mid'],high:I18N.en['risk.result.high']}
  };
  const badges={low:'Start',mid:'Core SOC',high:'Response'};
  document.getElementById('riskScore').textContent=score;
  const ring=document.getElementById('scoreRing');
  ring.style.setProperty('--score-pct',score+'%');
  ring.className='score-ring '+level;
  document.getElementById('riskTitle').textContent=titles[lang][level];
  document.getElementById('riskText').textContent=texts[lang][level];
  document.getElementById('riskResult').innerHTML=results[lang][level];
  const badge=document.getElementById('riskBadge');
  badge.textContent=badges[level];
  badge.className='score-badge '+level;
  const pct=(area)=>Math.round(Math.min(100,(got[area]/totals[area])*100));
  [['Id','id'],['Ep','ep'],['Rs','rs']].forEach(([suffix,area])=>{
    const v=pct(area);
    document.getElementById('bar'+suffix).style.setProperty('--w',v+'%');
    document.getElementById('bar'+suffix+'Txt').textContent=v;
  });
}
document.querySelectorAll('#riskChecks input').forEach(c=>c.addEventListener('change',updateRiskScore));

document.querySelectorAll('.q').forEach(q=>{
  const btn=q.querySelector('button'), a=q.querySelector('.a');
  btn.onclick=()=>{
    const open=q.classList.contains('open');
    document.querySelectorAll('.q').forEach(o=>{o.classList.remove('open');o.querySelector('.a').style.maxHeight=null;});
    if(!open){ q.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px'; }
  };
});

const quoteState={plan:'BearSec Business', price:'EUR 1.150 - 1.500'};
function updateQuote(){
  const ep=document.getElementById('quoteEndpoints'), sv=document.getElementById('quoteServers');
  if(!ep || !sv) return;
  const endpoints=+ep.value, servers=+sv.value, mode=document.querySelector('input[name="quoteMode"]:checked').value;
  const assets=endpoints+servers;
  const base={start:180,business:340,response:600}[mode];
  const perEndpoint={start:6,business:12,response:18}[mode];
  const perServer={start:22,business:42,response:65}[mode];
  const low=Math.round((base+endpoints*perEndpoint+servers*perServer)/50)*50;
  const high=Math.round(low*1.32/50)*50;
  const plan={start:'BearSec Start',business:'BearSec Business',response:'BearSec Response'}[mode];
  const coverage={start:'Starter',business:'Core SOC',response:'Response'}[mode];
  const advice={
    start:'<b>Include:</b> colectare loguri, alerte critice si raport lunar pentru baza de vizibilitate.',
    business:'<b>Include:</b> loguri, endpoint visibility, triaj uman si raport lunar.',
    response:'<b>Include:</b> tot pachetul Business plus prioritate incident si containment ghidat.'
  }[mode];
  quoteState.plan=plan;
  quoteState.price='EUR '+low.toLocaleString('ro-RO')+' - '+high.toLocaleString('ro-RO');
  document.getElementById('quoteEndpointsVal').textContent=endpoints;
  document.getElementById('quoteServersVal').textContent=servers;
  document.getElementById('quotePlan').textContent=plan;
  document.getElementById('quoteCoverage').textContent=coverage;
  document.getElementById('quotePrice').textContent=quoteState.price;
  document.getElementById('quoteAssets').textContent=assets;
  document.getElementById('quoteSla').innerHTML=mode==='response'?'24/7':mode==='business'?'&lt; 30 min':'same day';
  document.getElementById('quoteSetup').textContent=assets>130?'5-8 zile':'3-5 zile';
  document.getElementById('quoteAdvice').innerHTML=advice;
  document.querySelector('.quote-meter').style.setProperty('--quote-w',Math.min(100,Math.round((assets/290)*100)+18)+'%');
  const formPlan=document.getElementById('formPlan'), formEstimate=document.getElementById('formEstimate');
  if(formPlan) formPlan.value=quoteState.plan;
  if(formEstimate) formEstimate.value=quoteState.price+' / luna';
}
['quoteEndpoints','quoteServers'].forEach(id=>{
  const el=document.getElementById(id);
  if(el) el.addEventListener('input',updateQuote);
});
document.querySelectorAll('input[name="quoteMode"]').forEach(el=>el.addEventListener('change',updateQuote));
const quoteToForm=document.getElementById('quoteToForm');
if(quoteToForm) quoteToForm.addEventListener('click',()=>{
  const radio=[...document.querySelectorAll('input[name="prioritate"]')].find(r=>r.value==='Oferta monitorizare');
  if(radio){ radio.checked=true; updateIntake(); }
});
const formPlanSelect=document.getElementById('formPlan');
if(formPlanSelect) formPlanSelect.addEventListener('change',()=>{
  const modeByPlan={'BearSec Start':'start','BearSec Business':'business','BearSec Response':'response'};
  const mode=modeByPlan[formPlanSelect.value];
  const radio=document.querySelector('input[name="quoteMode"][value="'+mode+'"]');
  if(radio){ radio.checked=true; updateQuote(); }
});

function updateIntake(){
  const selected=document.querySelector('input[name="prioritate"]:checked');
  if(!selected) return;
  const val=selected.value, lang=document.documentElement.lang || 'ro';
  const ctx=document.getElementById('intakeContext'), title=document.getElementById('intakeTitle'), text=document.getElementById('intakeText');
  const incident=document.getElementById('incidentFields'), quote=document.getElementById('quoteFields');
  const copy={
    ro:{
      eval:['Evaluare initiala','Spune-ne ce ai acum si iti raspundem cu urmatorii pasi pentru vizibilitate.'],
      offer:['Configuratie pregatita','Am atasat estimarea din calculator. Mai trebuie doar contextul tau real.'],
      incident:['Incident activ','Completeaza ce stii acum. Pentru impact critic, suna direct si trimite formularul dupa.']
    },
    en:{
      eval:['Initial assessment','Tell us what you have now and we will reply with the next visibility steps.'],
      offer:['Configuration ready','The calculator estimate is attached. We only need your real context.'],
      incident:['Active incident','Fill in what you know now. For critical impact, call directly and send the form after.']
    }
  };
  const key=val.includes('Incident')?'incident':val.includes('Oferta')?'offer':'eval';
  title.textContent=copy[lang][key][0];
  text.textContent=copy[lang][key][1];
  ctx.classList.toggle('urgent',key==='incident');
  incident.hidden=key!=='incident';
  quote.hidden=key!=='offer';
  incident.querySelectorAll('input,select,textarea').forEach(el=>el.disabled=key!=='incident');
  quote.querySelectorAll('input,select,textarea').forEach(el=>el.disabled=key!=='offer');
  if(key==='offer') updateQuote();
}
document.querySelectorAll('input[name="prioritate"]').forEach(el=>el.addEventListener('change',updateIntake));
updateQuote();
updateIntake();

const cformEl=document.getElementById('cform');
if(cformEl) cformEl.addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.target);
  const lang=document.documentElement.lang;
  const subject=encodeURIComponent('[BearSec] '+(lang==='en'?'Assessment request':'Cerere evaluare')+' — '+(f.get('companie')||f.get('nume')));
  const body=encodeURIComponent(
    (lang==='en'?'Name':'Nume')+': '+f.get('nume')+'\n'+
    (lang==='en'?'Company':'Companie')+': '+(f.get('companie')||'-')+'\n'+
    'Email: '+f.get('email')+'\n'+
    (lang==='en'?'Phone':'Telefon')+': '+(f.get('telefon')||'-')+'\n'+
    (lang==='en'?'Priority':'Prioritate')+': '+f.get('prioritate')+'\n'+
    (lang==='en'?'Machines':'Calculatoare')+': '+f.get('marime')+'\n\n'+f.get('mesaj')
    +((f.get('pachet_estimat')||f.get('estimare'))?'\n\nEstimator: '+(f.get('pachet_estimat')||'-')+' / '+(f.get('estimare')||'-'):'')
    +((f.get('sistem_afectat')||f.get('severitate'))?'\nIncident: '+(f.get('sistem_afectat')||'-')+' / '+(f.get('severitate')||'-'):'')
  );
  location.href='mailto:contact@bearsec.ro?subject='+subject+'&body='+body;
});

/* ============ LOVITURA DE LABA LA CLICK ============ */
(function(){
  if(!matchMedia('(pointer:fine)').matches) return;
  const layer=document.createElement('div');
  layer.id='clawfx';
  document.body.appendChild(layer);
  let last=0;
  addEventListener('pointerdown',e=>{
    const now=Date.now(); if(now-last<90) return; last=now;
    const rot=(Math.random()*50-25)+(Math.random()<.5?0:180);
    const flip=Math.random()<.5?-1:1;
    const el=document.createElement('div');
    el.className='scratch';
    el.style.left=e.clientX+'px'; el.style.top=e.clientY+'px';
    el.style.transform='rotate('+rot+'deg) scaleX('+flip+')';
    // patru urme de gheara, ca de la o laba
    el.innerHTML=
      '<svg viewBox="0 0 150 150">'+
      '<path d="M24 40 C54 26 92 34 122 60" style="stroke-width:2.6"/>'+
      '<path d="M18 63 C50 49 92 57 128 84" style="stroke-width:3.8"/>'+
      '<path d="M20 87 C52 74 92 82 126 106" style="stroke-width:3.2"/>'+
      '<path d="M30 110 C58 100 92 106 118 124" style="stroke-width:2.2"/>'+
      '</svg>';
    layer.appendChild(el);
    setTimeout(()=>el.remove(),760);
  },{passive:true});
})();

/* ============ TILT 3D + ZOOM PE CARDURI ============ */
(function(){
  const fine=matchMedia('(pointer:fine)').matches;
  document.querySelectorAll('.card,.pkg,.prob-card,.cbox,.quote').forEach(el=>{
    el.classList.add('tiltable');
    el.insertAdjacentHTML('afterbegin','<span class="sheen"></span><span class="scan"></span>');
    if(!fine) return;
    const isPkg=el.classList.contains('pkg');
    const zoom=isPkg?1.045:1.022;
    const lift=isPkg?10:7;
    const tilt=isPkg?5:7;
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      el.style.setProperty('--mx',(px*100).toFixed(1)+'%');
      el.style.setProperty('--my',(py*100).toFixed(1)+'%');
      el.style.transition='transform .12s linear';
      el.style.transform=
        'perspective(1100px) rotateY('+((px-.5)*tilt).toFixed(2)+'deg) rotateX('+((.5-py)*tilt).toFixed(2)+
        'deg) translateY(-'+lift+'px) scale('+zoom+')';
    });
    el.addEventListener('pointerleave',()=>{
      el.style.transition='transform .5s cubic-bezier(.2,.7,.3,1)';
      el.style.transform='';
    });
  });
})();

/* ============ BUTOANE: ripple + magnetic ============ */
(function(){
  const fine=matchMedia('(pointer:fine)').matches;
  document.querySelectorAll('.btn').forEach(b=>{
    b.addEventListener('pointerdown',e=>{
      const r=b.getBoundingClientRect();
      const s=document.createElement('span');
      s.className='rip';
      s.style.left=(e.clientX-r.left)+'px';
      s.style.top=(e.clientY-r.top)+'px';
      s.style.width=s.style.height=Math.max(r.width,r.height)/4+'px';
      b.appendChild(s); setTimeout(()=>s.remove(),560);
    });
    if(!fine) return;
    b.addEventListener('pointermove',e=>{
      const r=b.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)/r.width, dy=(e.clientY-r.top-r.height/2)/r.height;
      b.style.transform='translate('+(dx*7).toFixed(1)+'px,'+(dy*5-2).toFixed(1)+'px)';
    });
    b.addEventListener('pointerleave',()=>{ b.style.transform=''; });
  });
})();

/* linia de proces se deseneaza la intrare in ecran */
(function(){
  const st=document.querySelector('.steps'); if(!st) return;
  new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ st.classList.add('in'); }
  }),{threshold:.3}).observe(st);
})();

/* ============ BATTLE: ursul vs. virusi ============ */
(function(){
  const cv=document.getElementById('battle'); if(!cv) return;
  const ctx=cv.getContext('2d');
  const ACC='#e8a33d', RED='#f2555a', GRN='#3ddc97', CYA='#4fd1c5';
  let W=0,H=0,cx=0,cy=0,DPR=1,running=false,t=0;
  let bearR=64, shieldR=132, BS=50;
  const viruses=[], parts=[], ripples=[], slashes=[];
  let blocked=0, shield=100, look={x:0,y:0}, hit=0, roar=0;
  let swipe=null;
  const elB=document.getElementById('hudBlocked'), elA=document.getElementById('hudActive'), elS=document.getElementById('hudShield');

  function resize(){
    DPR=Math.min(devicePixelRatio||1,2);
    W=cv.clientWidth; H=cv.clientHeight;
    cv.width=W*DPR; cv.height=H*DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
    cx=W/2; cy=H*0.46;
    BS=Math.max(20,Math.min(52,Math.min(H*0.098,W*0.05)));
    bearR=BS*0.95;
    shieldR=BS*3.9;
  }
  addEventListener('resize',resize);

  function spawn(x,y){
    let px,py;
    if(x!==undefined){ px=x; py=y; }
    else{
      const a=Math.random()*Math.PI*2, d=Math.max(W,H)*0.62+40;
      px=cx+Math.cos(a)*d; py=cy+Math.sin(a)*d;
    }
    const ang=Math.atan2(cy-py,cx-px)+(Math.random()-.5)*0.5;
    const sp=0.45+Math.random()*0.7;
    viruses.push({
      x:px,y:py,vx:Math.cos(ang)*sp,vy:Math.sin(ang)*sp,
      r:9+Math.random()*7, rot:Math.random()*6.28, vr:(Math.random()-.5)*0.045,
      spikes:6+Math.floor(Math.random()*4), ph:Math.random()*6.28, dead:0
    });
  }
  function burst(x,y,color,n){
    for(let i=0;i<n;i++){
      const a=Math.random()*6.28, s=.6+Math.random()*3.2;
      parts.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,c:color,r:.9+Math.random()*2.2});
    }
  }
  function kill(v,color){
    burst(v.x,v.y,color,16);
    ripples.push({x:v.x,y:v.y,r:4,a:.8,c:color});
    blocked++; elB.textContent=blocked;
  }

  cv.addEventListener('click',e=>{
    const b=cv.getBoundingClientRect();
    spawn(e.clientX-b.left, e.clientY-b.top);
  });
  document.getElementById('waveBtn').addEventListener('click',()=>{
    for(let i=0;i<9;i++) setTimeout(spawn,i*110);
    roar=1;
  });

  /* ---- desen urs (corp intreg) ---- */
  function glow(a){ ctx.shadowColor='rgba(232,163,61,'+a+')'; ctx.shadowBlur=a?14:0; }

  function paw(x,y,S,ang,side,open){
    ctx.save(); ctx.translate(x,y); ctx.rotate(ang);
    ctx.strokeStyle=ACC; ctx.lineWidth=2; glow(.6);
    ctx.beginPath(); ctx.ellipse(0,0,S*0.42,S*0.34,0,0,6.28); ctx.stroke();
    glow(0);
    // gheare
    ctx.strokeStyle=open>0.15?'rgba(255,245,225,.95)':'rgba(232,163,61,.85)';
    ctx.lineWidth=1.8; glow(open>0.15?.9:0);
    for(let k=-1;k<=1;k++){
      const a=k*0.42, L=S*(0.3+open*0.34);
      ctx.beginPath();
      ctx.moveTo(Math.cos(a)*S*0.36,Math.sin(a)*S*0.3);
      ctx.quadraticCurveTo(Math.cos(a)*(S*0.36+L*0.6),Math.sin(a)*S*0.3+L*0.12,
                           Math.cos(a)*(S*0.36+L),Math.sin(a)*S*0.3+L*0.3);
      ctx.stroke();
    }
    glow(0); ctx.restore();
  }

  function arm(side,S,tx,ty,open){
    const sx=side*S*1.1, sy=-S*1.0;
    const l1=S*1.25, l2=S*1.18;
    let dx=tx-sx, dy=ty-sy;
    let d=Math.hypot(dx,dy); if(d<1) d=1;
    const maxd=(l1+l2)*0.985, mind=Math.abs(l1-l2)+S*0.1;
    const dd=Math.max(mind,Math.min(maxd,d));
    const nx=sx+dx/d*dd, ny=sy+dy/d*dd;
    const base=Math.atan2(ny-sy,nx-sx);
    const cosv=Math.max(-1,Math.min(1,(l1*l1+dd*dd-l2*l2)/(2*l1*dd)));
    const th=Math.acos(cosv)*side;
    const ex=sx+Math.cos(base+th)*l1, ey=sy+Math.sin(base+th)*l1;

    ctx.strokeStyle=ACC; ctx.lineWidth=S*0.3; glow(.45);
    ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(ex,ey); ctx.lineTo(nx,ny); ctx.stroke();
    ctx.lineWidth=2.1; ctx.strokeStyle='rgba(255,220,160,.55)'; glow(0);
    ctx.beginPath(); ctx.moveTo(sx,sy); ctx.lineTo(ex,ey); ctx.lineTo(nx,ny); ctx.stroke();
    // umar + cot
    ctx.fillStyle=ACC; glow(.6);
    ctx.beginPath(); ctx.arc(sx,sy,S*0.2,0,6.28); ctx.fill();
    ctx.beginPath(); ctx.arc(ex,ey,S*0.13,0,6.28); ctx.fill();
    glow(0);
    paw(nx,ny,S,Math.atan2(ny-ey,nx-ex),side,open);
    return {x:nx,y:ny};
  }

  function leg(side,S){
    ctx.strokeStyle=ACC; ctx.lineWidth=2.1; glow(.45);
    ctx.beginPath();
    ctx.moveTo(side*S*0.3,S*1.3);
    ctx.lineTo(side*S*0.95,S*1.38);
    ctx.quadraticCurveTo(side*S*0.95,S*2.4,side*S*0.86,S*3.15);
    ctx.lineTo(side*S*0.3,S*3.15);
    ctx.quadraticCurveTo(side*S*0.34,S*2.4,side*S*0.3,S*1.3);
    ctx.closePath(); ctx.stroke();
    glow(0);
    // laba
    ctx.beginPath(); ctx.ellipse(side*S*0.6,S*3.32,S*0.52,S*0.24,0,0,6.28); ctx.stroke();
    ctx.strokeStyle='rgba(232,163,61,.6)'; ctx.lineWidth=1.4;
    for(let k=-1;k<=1;k++){
      ctx.beginPath();
      ctx.moveTo(side*S*0.6+k*S*0.22,S*3.44);
      ctx.lineTo(side*S*0.6+k*S*0.26,S*3.6);
      ctx.stroke();
    }
  }

  function head(S){
    const hy=-S*2.42, R=S*0.95;
    ctx.save(); ctx.translate(look.x*S*0.07,hy);
    ctx.rotate(look.x*0.1);
    ctx.strokeStyle=ACC; ctx.lineWidth=2.2; glow(.6);
    // urechi
    [-1,1].forEach(s=>{
      ctx.beginPath(); ctx.arc(s*R*0.72,-R*0.76,R*0.3,0,6.28); ctx.stroke();
    });
    glow(0);
    ctx.strokeStyle='rgba(232,163,61,.45)'; ctx.lineWidth=1.2;
    [-1,1].forEach(s=>{ ctx.beginPath(); ctx.arc(s*R*0.72,-R*0.76,R*0.14,0,6.28); ctx.stroke(); });

    // craniu poligonal
    ctx.strokeStyle=ACC; ctx.lineWidth=2.2; glow(.6);
    const pts=[[0,-R],[R*.78,-R*.6],[R,0],[R*.8,R*.66],[0,R*1.05],[-R*.8,R*.66],[-R,0],[-R*.78,-R*.6]];
    ctx.beginPath();
    pts.forEach((p,i)=> i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));
    ctx.closePath(); ctx.stroke(); glow(0);

    // mesh
    ctx.strokeStyle='rgba(232,163,61,.2)'; ctx.lineWidth=.9;
    ctx.beginPath();
    ctx.moveTo(0,-R); ctx.lineTo(0,R*1.05);
    ctx.moveTo(-R,0); ctx.lineTo(R,0);
    ctx.moveTo(-R*.78,-R*.6); ctx.lineTo(R*.8,R*.66);
    ctx.moveTo(R*.78,-R*.6); ctx.lineTo(-R*.8,R*.66);
    ctx.stroke();

    // bot
    ctx.strokeStyle='rgba(232,163,61,.85)'; ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(0,R*.28); ctx.lineTo(R*.34,R*.44); ctx.lineTo(R*.3,R*.76);
    ctx.lineTo(0,R*.9); ctx.lineTo(-R*.3,R*.76); ctx.lineTo(-R*.34,R*.44); ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0,R*.44); ctx.lineTo(R*.12,R*.55); ctx.lineTo(0,R*.66); ctx.lineTo(-R*.12,R*.55); ctx.closePath();
    ctx.fillStyle='rgba(232,163,61,.9)'; ctx.fill();
    const open=roar*R*0.16;
    ctx.beginPath(); ctx.moveTo(0,R*.66); ctx.lineTo(0,R*.76);
    ctx.moveTo(0,R*.76+open); ctx.quadraticCurveTo(-R*.14,R*.88+open,-R*.2,R*.74);
    ctx.moveTo(0,R*.76+open); ctx.quadraticCurveTo(R*.14,R*.88+open,R*.2,R*.74);
    ctx.stroke();
    if(roar>0.02){
      ctx.fillStyle='rgba(255,242,222,'+Math.min(1,roar*1.4)+')';
      [-1,1].forEach(s=>{
        ctx.beginPath();
        ctx.moveTo(s*R*.04,R*.76); ctx.lineTo(s*R*.13,R*.76); ctx.lineTo(s*R*.085,R*.92+open);
        ctx.closePath(); ctx.fill();
      });
    }
    // ochi
    const ex=R*.36, ey=-R*.06;
    [-1,1].forEach(s=>{
      ctx.beginPath(); ctx.arc(s*ex,ey,R*.15,0,6.28);
      ctx.fillStyle='rgba(255,244,224,.95)';
      ctx.shadowColor=hit>0?'rgba(242,85,90,.95)':'rgba(232,163,61,.95)';
      ctx.shadowBlur=13; ctx.fill(); ctx.shadowBlur=0;
      ctx.beginPath();
      ctx.arc(s*ex+look.x*R*.055, ey+look.y*R*.055, R*.065,0,6.28);
      ctx.fillStyle=hit>0?RED:'#1a1206'; ctx.fill();
    });
    ctx.strokeStyle='rgba(232,163,61,.8)'; ctx.lineWidth=1.7;
    ctx.beginPath();
    ctx.moveTo(-R*.6,-R*.34+roar*R*.06); ctx.lineTo(-R*.18,-R*.2);
    ctx.moveTo(R*.6,-R*.34+roar*R*.06); ctx.lineTo(R*.18,-R*.2);
    ctx.stroke();
    ctx.restore();
  }

  function bear(){
    const S=BS;
    const bob=Math.sin(t*0.042)*S*0.05;
    ctx.save();
    ctx.translate(cx,cy+bob);
    ctx.lineJoin='round'; ctx.lineCap='round';

    // platforma
    ctx.strokeStyle='rgba(232,163,61,.22)'; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.ellipse(0,S*3.62,S*2.15,S*0.42,0,0,6.28); ctx.stroke();
    ctx.strokeStyle='rgba(232,163,61,.1)';
    ctx.beginPath(); ctx.ellipse(0,S*3.62,S*1.35,S*0.26,0,0,6.28); ctx.stroke();

    leg(-1,S); leg(1,S);

    // trunchi
    ctx.strokeStyle=ACC; ctx.lineWidth=2.3; glow(.6);
    ctx.beginPath();
    ctx.moveTo(-S*1.12,-S*1.12);
    ctx.quadraticCurveTo(-S*1.42,S*0.25,-S*1.02,S*1.45);
    ctx.lineTo(S*1.02,S*1.45);
    ctx.quadraticCurveTo(S*1.42,S*0.25,S*1.12,-S*1.12);
    ctx.quadraticCurveTo(S*0.6,-S*1.5,S*0.4,-S*1.45);
    ctx.lineTo(-S*0.4,-S*1.45);
    ctx.quadraticCurveTo(-S*0.6,-S*1.5,-S*1.12,-S*1.12);
    ctx.closePath(); ctx.stroke();
    // gat
    ctx.beginPath();
    ctx.moveTo(-S*0.4,-S*1.45); ctx.lineTo(-S*0.36,-S*1.72);
    ctx.moveTo(S*0.4,-S*1.45); ctx.lineTo(S*0.36,-S*1.72);
    ctx.stroke(); glow(0);

    // mesh trunchi
    ctx.strokeStyle='rgba(232,163,61,.18)'; ctx.lineWidth=.9;
    ctx.beginPath();
    ctx.moveTo(0,-S*1.3); ctx.lineTo(0,S*1.45);
    ctx.moveTo(-S*1.25,S*0.25); ctx.lineTo(S*1.25,S*0.25);
    ctx.moveTo(-S*1.12,-S*1.12); ctx.lineTo(S*1.02,S*1.45);
    ctx.moveTo(S*1.12,-S*1.12); ctx.lineTo(-S*1.02,S*1.45);
    ctx.stroke();

    // emblema scut pe piept
    const eg=0.5+Math.sin(t*0.06)*0.2+hit*0.5;
    ctx.strokeStyle='rgba(232,163,61,'+eg.toFixed(2)+')'; ctx.lineWidth=2;
    glow(.7);
    ctx.beginPath();
    ctx.moveTo(0,-S*0.62); ctx.lineTo(S*0.4,-S*0.4); ctx.lineTo(S*0.4,S*0.1);
    ctx.lineTo(0,S*0.42); ctx.lineTo(-S*0.4,S*0.1); ctx.lineTo(-S*0.4,-S*0.4);
    ctx.closePath(); ctx.stroke();
    ctx.lineWidth=2.2; ctx.strokeStyle='rgba(255,238,205,'+eg.toFixed(2)+')';
    ctx.beginPath(); ctx.moveTo(-S*0.16,-S*0.1); ctx.lineTo(-S*0.02,S*0.06); ctx.lineTo(S*0.2,-S*0.22); ctx.stroke();
    glow(0);

    // brate
    const idleL={x:-S*1.72,y:S*1.4+Math.sin(t*0.042+1)*S*0.07};
    const idleR={x: S*1.72,y:S*1.4+Math.sin(t*0.042)*S*0.07};
    let tgtL=idleL, tgtR=idleR, openL=0, openR=0;
    if(swipe){
      const p=1-swipe.life;
      const reach=Math.min(swipe.d, S*3.3)*(0.75+p*0.42);
      const wob=(p-0.5)*0.5;
      const tp={x:Math.cos(swipe.a+wob)*reach, y:Math.sin(swipe.a+wob)*reach - bob};
      if(swipe.side<0){ tgtL=tp; openL=swipe.life; } else { tgtR=tp; openR=swipe.life; }
    }
    arm(-1,S,tgtL.x,tgtL.y,openL);
    arm( 1,S,tgtR.x,tgtR.y,openR);

    head(S);
    ctx.restore();
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    t++;

    // tinta cea mai apropiata
    let near=null,nd=1e9;
    viruses.forEach(v=>{ const d=Math.hypot(v.x-cx,v.y-cy); if(d<nd){nd=d;near=v;} });
    if(near){ const d=Math.hypot(near.x-cx,near.y-cy)||1; look.x=(near.x-cx)/d; look.y=(near.y-cy)/d; }

    // gheara: taie cea mai apropiata amenintare din raza
    if(near && nd<shieldR*1.75 && nd>shieldR*0.75 && !swipe && t%34===0){
      const a=Math.atan2(near.y-cy,near.x-cx);
      swipe={a:a,d:nd,life:1,side:Math.cos(a)<0?-1:1};
      slashes.push({a:a,d:nd,life:1});
      kill(near,ACC); near.dead=1; roar=Math.max(roar,.7);
    }
    if(swipe){ swipe.life-=0.05; if(swipe.life<=0) swipe=null; }

    // scut
    const sp=0.6+Math.sin(t*0.04)*0.12+hit*0.5;
    ctx.save();
    ctx.translate(cx,cy); ctx.rotate(t*0.004);
    ctx.setLineDash([6,13]); ctx.lineWidth=1.4;
    ctx.strokeStyle='rgba(232,163,61,'+sp.toFixed(3)+')';
    ctx.shadowColor='rgba(232,163,61,.5)'; ctx.shadowBlur=hit>0?22:8;
    ctx.beginPath(); ctx.arc(0,0,shieldR,0,6.28); ctx.stroke();
    ctx.setLineDash([2,20]); ctx.rotate(-t*0.009);
    ctx.strokeStyle='rgba(79,209,197,'+(0.28+hit*0.4).toFixed(3)+')';
    ctx.beginPath(); ctx.arc(0,0,shieldR*1.16,0,6.28); ctx.stroke();
    ctx.setLineDash([]); ctx.shadowBlur=0;
    ctx.restore();

    // virusi
    for(let i=viruses.length-1;i>=0;i--){
      const v=viruses[i];
      if(v.dead){ viruses.splice(i,1); continue; }
      v.x+=v.vx; v.y+=v.vy; v.rot+=v.vr; v.ph+=0.08;
      const d=Math.hypot(v.x-cx,v.y-cy);
      if(d<shieldR+v.r){
        kill(v,RED); viruses.splice(i,1);
        hit=1; shield=Math.max(72,shield-0.6);
        continue;
      }
      if(d>Math.max(W,H)){ viruses.splice(i,1); continue; }

      ctx.save(); ctx.translate(v.x,v.y); ctx.rotate(v.rot);
      const wob=1+Math.sin(v.ph)*0.07;
      ctx.strokeStyle=RED; ctx.lineWidth=1.6;
      ctx.shadowColor='rgba(242,85,90,.75)'; ctx.shadowBlur=12;
      ctx.beginPath();
      for(let k=0;k<v.spikes;k++){
        const a=(k/v.spikes)*6.28;
        ctx.moveTo(Math.cos(a)*v.r*wob,Math.sin(a)*v.r*wob);
        ctx.lineTo(Math.cos(a)*v.r*1.62*wob,Math.sin(a)*v.r*1.62*wob);
      }
      ctx.stroke();
      ctx.beginPath(); ctx.arc(0,0,v.r*wob,0,6.28); ctx.stroke();
      ctx.shadowBlur=0;
      ctx.fillStyle='rgba(242,85,90,.16)'; ctx.fill();
      ctx.fillStyle='rgba(242,85,90,.9)';
      ctx.beginPath(); ctx.arc(-v.r*.3,-v.r*.2,1.5,0,6.28); ctx.fill();
      ctx.beginPath(); ctx.arc(v.r*.32,v.r*.12,1.5,0,6.28); ctx.fill();
      ctx.restore();
    }

    // slash-uri de gheara
    for(let i=slashes.length-1;i>=0;i--){
      const s=slashes[i]; s.life-=0.055;
      if(s.life<=0){ slashes.splice(i,1); continue; }
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(s.a);
      ctx.strokeStyle='rgba(255,238,205,'+s.life.toFixed(2)+')';
      ctx.shadowColor='rgba(232,163,61,.9)'; ctx.shadowBlur=16;
      ctx.lineWidth=2.4; ctx.lineCap='round';
      const reach=s.d*(1.15-s.life*0.35);
      for(let k=-1;k<=1;k++){
        ctx.beginPath();
        ctx.arc(0,0,reach+k*11,-0.36+ (1-s.life)*0.2, 0.36+(1-s.life)*0.2);
        ctx.stroke();
      }
      ctx.shadowBlur=0; ctx.restore();
    }

    // ripple-uri
    for(let i=ripples.length-1;i>=0;i--){
      const r=ripples[i]; r.r+=3.4; r.a-=0.028;
      if(r.a<=0){ ripples.splice(i,1); continue; }
      ctx.beginPath(); ctx.arc(r.x,r.y,r.r,0,6.28);
      ctx.strokeStyle=(r.c===RED?'rgba(242,85,90,':'rgba(232,163,61,')+r.a.toFixed(3)+')';
      ctx.lineWidth=1.6; ctx.stroke();
    }

    // particule
    for(let i=parts.length-1;i>=0;i--){
      const p=parts[i];
      p.x+=p.vx; p.y+=p.vy; p.vx*=.965; p.vy*=.965; p.life-=0.022;
      if(p.life<=0){ parts.splice(i,1); continue; }
      ctx.globalAlpha=Math.max(p.life,0);
      ctx.fillStyle=p.c;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.28); ctx.fill();
      ctx.globalAlpha=1;
    }

    hit=Math.max(0,hit-0.045);
    roar=Math.max(0,roar-0.03);
    shield=Math.min(100,shield+0.09);
    elS.textContent=Math.round(shield)+'%';
    elA.textContent=viruses.length;

    if(running) requestAnimationFrame(draw);
  }

  let spawner=null;
  function start(){
    if(running) return;
    running=true; resize(); requestAnimationFrame(draw);
    spawner=setInterval(()=>{ if(viruses.length<14) spawn(); },1050);
  }
  function stop(){ running=false; clearInterval(spawner); }

  new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?start():stop()),{threshold:.15}).observe(cv);
  resize();
})();

document.getElementById('yr').textContent=new Date().getFullYear();

let saved='ro';
try{ saved=localStorage.getItem('bearsec-lang')||'ro'; }catch(e){}
setLang(saved);
