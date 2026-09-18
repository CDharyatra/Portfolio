// Terminal portfolio — terminal TUI + Henry motion
// Data source: resume (Jan 2026) + existing portfolio projects
const DATA = {
  name: "Dharyatra Chauhan",
  role: "AI/ML Engineer & Software Developer",
  email: "chauhandharyatra@gmail.com",
  phone: "+91 9672077982",
  location: "Jaipur, Rajasthan, India",
  site: "https://dharyatra.in",
  github: "https://github.com/CDharyatra",
  linkedin: "https://linkedin.com/in/dharyatra-chauhan",
  resume: "Dharyatra_Chauhan_Resume.pdf",
  summary: "Machine Learning Engineer with 2.6 years building applied NLP, GenAI, RAG and Python backends — enterprise analytics, text-to-SQL, document intelligence, conversational AI. FastAPI · LangGraph · LangChain · pgvector · PostgreSQL · Docker · AWS Bedrock.",
  skills: {
    "Programming": ["Python", "SQL", "C++"],
    "GenAI & NLP": ["RAG", "LangGraph", "LangChain", "Prompt engineering", "Text-to-SQL", "Semantic search", "Vector embeddings", "Structured LLM outputs", "Conversational AI", "AWS Bedrock", "Ollama"],
    "ML & Data": ["Scikit-learn", "XGBoost", "Pandas", "NumPy", "Feature extraction", "Data preprocessing", "Model evaluation", "Confidence scoring"],
    "Backend & APIs": ["FastAPI", "Flask", "REST APIs", "WebSockets", "JWT auth", "RBAC", "Webhooks"],
    "Databases & Search": ["PostgreSQL", "Pgvector", "FAISS", "Redis/Valkey", "DynamoDB", "OpenSearch"],
    "Cloud & Infra": ["S3", "Lambda", "API Gateway", "SQS", "Docker", "Docker Compose", "Linux", "CI/CD", "Pytest", "Prometheus", "CloudWatch", "Streamlit", "Plotly", "Typer"]
  },
  experience: [
    {
      role: "Machine Learning Engineer", co: "CloudThat Technologies — Bangalore",
      date: "Jan 2026 – Present",
      desc: "Enterprise NLP analytics platform (FastAPI, LangGraph, Postgres, pgvector, Redis, Plotly) for oil-and-gas enterprise — TB-scale, ~2k queries/day. Authenticated REST APIs, RAG text-to-SQL with schema metadata + few-shot + KPI formulas, JWT + persona RBAC, conversation memory, Plotly viz. Also GenAI LMS chatbot (Bedrock, Lambda, S3, SQS, API Gateway, OpenSearch, DynamoDB) — serverless ingestion, Titan embeddings, course-aware RAG."
    },
    {
      role: "Machine Learning Engineer", co: "NexGen AI Solutions — Remote",
      date: "May 2025 – Jan 2026",
      desc: "Typer CLI scaffolding for MCP servers in Conda ecosystem — setup time -30%. Plugin architecture for NL assistance + MCP management. Intent-to-command for 15+ Conda ops, subprocess error handling — resolution time -20%."
    },
    {
      role: "Machine Learning Engineer", co: "VSURE Consultancy Services — Mumbai",
      date: "Mar 2024 – Nov 2024",
      desc: "ML data-extraction pipeline for bank statements — manual entry -50%, accuracy +30%. Integrated into financial analysis pipeline — speed +30%, accuracy +25%."
    },
    {
      role: "Software Development Intern", co: "Benciti Technologies — Bangalore",
      date: "May 2022 – Jul 2022",
      desc: "Core features for NUDGE C++ mathematics platform — debugging, docs, performance + reliability."
    }
  ],
  projects: [
    { n:"001", title:"AI Resume Evaluator & JD Matcher", desc:"Parses PDF/DOCX/TXT, compares to JDs, alignment + missing skills + suggestions. LangChain structured outputs + Pydantic, keyword + LLM hybrid, FAISS RAG over company JDs, Streamlit UI, Plotly, Docker Compose, Redis, Prometheus, tests.", tags:["Python","LangChain","FAISS","Ollama","Streamlit","Docker"], link:"https://github.com/CDharyatra/Resume-Evaluation-AI-Project-Analysis" },
    { n:"002", title:"AI Market Intelligence Dashboard", desc:"Normalizes Google Play + iOS datasets (15,839 apps), cross-platform matching, category analytics, confidence-scored AI insights, D2C funnels, SEO + ad concepts, CLI + Streamlit, PDF executive reports.", tags:["Python","Pandas","Scikit-learn","Gemini API","Streamlit","Plotly"], link:"https://github.com/CDharyatra/AI_Market_Intel" },
    { n:"003", title:"Voice AI Lead Qualification Agent", desc:"FastAPI + Vapi outbound calls, Airtable leads, Pydantic webhooks, GPT-4 extraction (budget, location, timeline, scope), retries, scheduling, n8n docs.", tags:["Python","FastAPI","GPT-4","Vapi","Airtable","n8n"], link:"https://github.com/CDharyatra/Interior-Design-Voice-AI-Agent" },
    { n:"004", title:"LinkedIn Auto Apply Tool", desc:"Automated applications with keyword/location filters, headless mode, retries, structured logs, cover-letter templates.", tags:["JavaScript","Node.js","Puppeteer/Selenium","Automation"], link:"https://github.com/CDharyatra/Linkedin-AutoApply-Tool" },
    { n:"005", title:"Codebase Analyzer", desc:"CLI for complexity, dead code, dependency graphs, style — CI-ready plugin rules, HTML/JSON reports.", tags:["Python","AST","CLI","CI/CD"], link:"https://github.com/CDharyatra/Code-Analyser" },
    { n:"006", title:"Algorithmic Assessment Suite", desc:"Structured Python algo + DS exercises, clean solutions, tests, trade-off notes.", tags:["Python","Algorithms","Testing"], link:"https://github.com/CDharyatra/Masonry-Assessment" },
    { n:"007", title:"SnapShop Visual Shopping", desc:"Vision-to-commerce prototype — upload/capture, matching products, responsive accessible UI.", tags:["HTML/CSS","JavaScript","Camera API"], link:"https://github.com/CDharyatra/SnapShop" },
    { n:"008", title:"Web Scraping Utilities", desc:"Pagination, extraction, CSV/JSON export — Requests/BS4 + Selenium, retries, robots, proxies.", tags:["Python","Requests","BeautifulSoup","Selenium"], link:"https://github.com/CDharyatra/web-scraping" },
    { n:"009", title:"Personal Portfolio Site", desc:"This site — terminal TUI, / palette, Henry-style motion, canvas-free lightweight.", tags:["HTML/CSS","JavaScript","Terminal UI"], link:"https://github.com/CDharyatra/Portfolio" }
  ],
  education: "B.Tech Computer Science — BML Munjal University, Gurugram (Sep 2024)",
  certsNote: "No separate certificates listed on resume — strengths proven via production RAG/GenAI systems, AWS serverless + Bedrock work, and open-source projects above."
};

const COMMANDS = [
  { cmd:"/help", aliases:["help","h","?"], desc:"list all commands" },
  { cmd:"/about", aliases:["about","whoami","home"], desc:"who is Dharyatra" },
  { cmd:"/experience", aliases:["experience","work","exp"], desc:"001 — work history" },
  { cmd:"/projects", aliases:["projects","work-list","ls-projects"], desc:"002 — selected work" },
  { cmd:"/tech-stack", aliases:["tech-stack","techstack","stack","skills"], desc:"tools + capabilities" },
  { cmd:"/resume", aliases:["resume","cv"], desc:"download resume PDF" },
  { cmd:"/certifications", aliases:["certifications","certs","education"], desc:"education + certifications" },
  { cmd:"/contact", aliases:["contact","email","hire"], desc:"get in touch" },
  { cmd:"/clear", aliases:["clear","cls"], desc:"clear terminal" },
  { cmd:"/github", aliases:["github","gh"], desc:"open GitHub" },
  { cmd:"/linkedin", aliases:["linkedin"], desc:"open LinkedIn" },
];

const output = document.getElementById("output");
const input = document.getElementById("cmd-input");
const palette = document.getElementById("palette");
const chipsBox = document.getElementById("chips");
const term = document.getElementById("terminal");

let history = [];
let hIndex = -1;
let palIndex = 0;
let currentFilter = [];

// ---------- reveal on scroll (Henry-style) ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: 0.08 });
function observeReveals() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
}

function esc(s){ return s.replace(/</g,"&lt;"); }
function addHTML(html, reveal=true){
  const div = document.createElement("div");
  div.innerHTML = html;
  while (div.firstChild) output.appendChild(div.firstChild);
  if (reveal) observeReveals();
  term.scrollIntoView({ behavior:"smooth", block:"end" });
  window.scrollTo({ top: document.body.scrollHeight, behavior:"smooth" });
}
function echo(cmd){
  const div = document.createElement("div");
  div.className = "echo";
  div.innerHTML = `<span class="p">C:\\portfolio&gt;</span><span>${esc(cmd)}</span>`;
  output.appendChild(div);
}

// ---------- renderers (Henry numbering + [/ > INPUT :]) ----------
function marqueeHTML(){
  const items = ["Available Full Time or Freelance","RAG · LangGraph · FastAPI","Bangalore / Remote","dharyatra.in"];
  const seq = items.map(t=>`<span><i>●</i>${t}</span>`).join("");
  return `<div class="marquee reveal"><div class="marquee-inner">${seq}${seq}</div></div>`;
}
function rHelp(){
  const rows = COMMANDS.map(c=>`<div>  <b style="color:#fff">${c.cmd}</b>  <span style="color:#777">— ${c.desc}</span></div>`).join("");
  return `<div class="h-section reveal" id="section-help"><div class="h-num">000 —— help</div>
    <div class="h-title">commands <span class="arrow">↩</span></div>
    <div class="h-sub">type / to filter · Enter to run</div>
    ${rows}
    <div class="line dim" style="margin-top:8px">try: <b>/about</b> <b>/projects</b> <b>/experience</b> <b>/contact</b></div></div>`;
}
function rAbout(){
  return `<div class="h-section reveal" id="section-about"><div class="h-num">000 —— home</div>
    <div class="h-title">dharyatra chauhan <span class="arrow">↩</span></div>
    <div class="h-sub">${DATA.role}</div>
    <p style="color:#c9c9c9;font-size:19px;margin:8px 0">${DATA.summary}</p>
    <dl class="kv">
      <dt>email</dt><dd class="links"><a href="mailto:${DATA.email}">${DATA.email}</a></dd>
      <dt>mobile</dt><dd><a href="tel:+919672077982">${DATA.phone}</a></dd>
      <dt>github</dt><dd class="links"><a href="${DATA.github}" target="_blank" rel="noopener">github.com/CDharyatra</a></dd>
      <dt>more</dt><dd class="links">try <a href="#" data-run="/contact">/contact</a> · <a href="#" data-run="/resume">/resume</a></dd>
    </dl>
  </div>`;
}
function rExperience(){
  const items = DATA.experience.map((e,i)=>`<div class="tl-item reveal">
    <div class="tl-role">00${i+1} — ${e.role}</div><div class="tl-co">${e.co}</div>
    <div class="tl-date">${e.date}</div><div class="tl-desc">${e.desc}</div></div>`).join("");
  return `<div class="h-section reveal" id="section-experience"><div class="h-num">001 —— experience</div>
    <div class="h-title">work <span class="arrow">↩</span></div>
    <div class="h-sub">2.6 years · applied NLP / GenAI / backends</div>
    <div class="tl">${items}</div></div>`;
}
function projectCard(p){
  const tags = p.tags.map(t=>`<span class="tag">${t}</span>`).join("");
  return `<div class="proj reveal" data-tags="${p.tags.join(" ").toLowerCase()}">
    <div class="proj-head"><b>${p.title}</b><span class="n">/${p.n}</span></div>
    <p>${p.desc}</p><div class="tags">${tags}</div>
    <div class="proj-foot links"><a href="${p.link}" target="_blank" rel="noopener">↗ Code</a></div></div>`;
}
function rProjects(){
  const cards = DATA.projects.map(projectCard).join("");
  return `<div class="h-section reveal" id="section-projects"><div class="h-num">002 —— work</div>
    <div class="h-title">selected work <span class="arrow">↩</span></div>
    <div class="h-sub">Filter · Featured / RAG / Voice / Automation · List / grid /</div>
    <div class="toolbar">
      <span>view:</span><button data-view="list" class="on">list</button><button data-view="grid">grid</button>
      <span style="margin-left:8px">filter:</span><button data-filter="all" class="on">all</button>
      <button data-filter="rag">rag</button><button data-filter="python">python</button><button data-filter="voice">voice</button>
    </div>
    <div class="projects-grid" id="projGrid">${cards}</div></div>`;
}
function rStack(){
  const cats = Object.entries(DATA.skills).map(([k,v],i)=>{
    const chips = v.map(s=>`<span class="tag">${s}</span>`).join("");
    return `<div class="reveal" style="margin-bottom:12px"><div class="h-num">s//0${i+1} —— ${k.toLowerCase()}</div>
      <div style="font-weight:400;margin:4px 0 6px">${k}</div><div class="tags">${chips}</div></div>`;
  }).join("");
  return `<div class="h-section reveal" id="section-stack"><div class="h-num">003 —— profile</div>
    <div class="h-title">services + capabilities <span class="arrow">↩</span></div>
    <div class="h-sub">production-oriented AI systems</div>${cats}</div>`;
}
function rResume(){
  return `<div class="h-section reveal" id="section-resume"><div class="h-num">004 —— resume</div>
    <div class="h-title">resume <span class="arrow">↩</span></div>
    <div class="h-sub">complete professional profile</div>
    <p style="font-size:19px;color:#c9c9c9">B.Tech CS · 2.6 yrs · RAG / LangGraph / FastAPI / AWS</p>
    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
      <a class="btn" href="${DATA.resume}" download>⬇ Download PDF</a>
      <a class="btn ghost" href="${DATA.resume}" target="_blank" rel="noopener">👁 View Online</a>
    </div></div>`;
}
function rCerts(){
  return `<div class="h-section reveal" id="section-certs"><div class="h-num">005 —— certifications</div>
    <div class="h-title">certifications <span class="arrow">↩</span></div>
    <div class="h-sub">education + credentials</div>
    <dl class="kv"><dt>degree</dt><dd>${DATA.education}</dd><dt>note</dt><dd>${DATA.certsNote}</dd></dl>
    <div class="line dim" style="margin-top:8px">tip: add certs here — tell me names and I'll render them as 006/007 cards.</div></div>`;
}
function rContact(){
  return `<div class="h-section reveal" id="section-contact"><div class="h-num">006 —— contact</div>
    <div class="h-title">get in touch <span class="arrow">↩</span></div>
    <div class="h-sub">new project? freelance? full-time?</div>
    <dl class="kv">
      <dt>email</dt><dd class="links"><a href="mailto:${DATA.email}?subject=Freelance%20Inquiry">${DATA.email}</a></dd>
      <dt>phone</dt><dd><a href="tel:+919672077982">${DATA.phone}</a></dd>
      <dt>location</dt><dd>${DATA.location} · worldwide</dd>
    </dl>
    <form class="contact-form" id="cform">
      <input name="name" placeholder="Your Name" required>
      <input name="email" type="email" placeholder="Your Email" required>
      <input name="subject" placeholder="Subject" required>
      <textarea name="message" rows="4" placeholder="Your Message" required></textarea>
      <button class="btn" type="submit">Send Message</button>
    </form></div>`;
}

// ---------- command dispatch ----------
// Each section renders once — repeats jump to the existing one.
const SECTION_FOR = {
  "/help": "section-help",
  "/about": "section-about",
  "/experience": "section-experience",
  "/projects": "section-projects",
  "/tech-stack": "section-stack",
  "/resume": "section-resume",
  "/certifications": "section-certs",
  "/contact": "section-contact",
};
function jumpIfOpen(cmd, raw){
  const id = SECTION_FOR[cmd];
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  echo(raw);
  const note = document.createElement("div");
  note.className = "line dim";
  note.innerHTML = `already open — jumped to <b>${cmd}</b> ↓`;
  output.appendChild(note);
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("flash");
  void el.offsetWidth; // restart animation
  el.classList.add("flash");
  return true;
}
function resolve(raw){
  let s = raw.trim().toLowerCase();
  if (s.startsWith("/")) s = s.slice(1);
  s = s.replace(/^open\s+|^show\s+|^go\s+/, "").trim();
  for (const c of COMMANDS){
    if (("/"+s) === c.cmd || c.aliases.includes(s)) return c.cmd;
  }
  return null;
}
function run(raw){
  const cmd = resolve(raw);
  if (!raw.trim()){ echo(raw || "(empty)"); addHTML(`<div class="line dim">type <b>/help</b> for commands</div>`); return; }
  if (!cmd){ echo(raw); addHTML(`<div class="line"><span class="error">command not found:</span> ${esc(raw)} — try <b>/help</b></div>`); return; }
  if (jumpIfOpen(cmd, raw)) return;
  echo(raw);
  switch(cmd){
    case "/help": addHTML(rHelp()); break;
    case "/about": addHTML(rAbout()); break;
    case "/experience": addHTML(rExperience()); break;
    case "/projects": addHTML(rProjects()); break;
    case "/tech-stack": addHTML(rStack()); break;
    case "/resume": addHTML(rResume()); break;
    case "/certifications": addHTML(rCerts()); break;
    case "/contact": addHTML(rContact()); wireContact(); break;
    case "/clear": output.innerHTML=""; term.scrollIntoView({ behavior:"smooth", block:"center" }); break;
    case "/github": addHTML(`<div class="line">opening <b>github.com/CDharyatra</b>…</div>`); window.open(DATA.github,"_blank"); break;
    case "/linkedin": addHTML(`<div class="line">opening <b>linkedin</b>…</div>`); window.open(DATA.linkedin,"_blank"); break;
  }
}
function wireContact(){
  const f = document.getElementById("cform");
  if (!f) return;
  f.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData(f);
    const subject = encodeURIComponent(fd.get("subject")||"Portfolio Inquiry");
    const body = encodeURIComponent(`Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`);
    window.location.href = `mailto:${DATA.email}?subject=${subject}&body=${body}`;
    addHTML(`<div class="line"><span class="success">[ ok ]</span> opening your email client…</div>`);
    f.reset();
  });
}

// ---------- / palette ----------
function matches(q){
  q = q.replace(/^\//,"").toLowerCase();
  return COMMANDS.filter(c => c.cmd.includes(q) || c.desc.toLowerCase().includes(q) || c.aliases.some(a=>a.includes(q)));
}
function renderPalette(){
  const val = input.value;
  if (!val.startsWith("/")){
    // also trigger on empty? show hint only when "/" typed — keep hidden otherwise
    palette.classList.add("hidden"); currentFilter=[]; return;
  }
  currentFilter = matches(val.slice(1));
  if (!currentFilter.length){ palette.classList.add("hidden"); return; }
  palIndex = Math.max(0, Math.min(palIndex, currentFilter.length-1));
  palette.innerHTML = currentFilter.map((c,i)=>`<div class="pal-item ${i===palIndex?"selected":""}" data-i="${i}" role="option"><span class="cmd">${c.cmd}</span><span class="desc">${c.desc}</span></div>`).join("");
  palette.classList.remove("hidden");
  palette.querySelectorAll(".pal-item").forEach(el=>{
    el.addEventListener("click", ()=>{
      input.value = currentFilter[+el.dataset.i].cmd;
      palette.classList.add("hidden");
      submit();
    });
  });
}
function syncMirror(){
  const m = document.getElementById("mirror-text");
  if (m) m.textContent = input.value;
}
function submit(){
  const v = input.value.trim();
  palette.classList.add("hidden");
  if (v){ history.push(v); hIndex = history.length; }
  run(v);
  input.value = "";
  syncMirror();
  palIndex = 0;
  input.focus();
}

// ---------- events ----------
input.addEventListener("input", ()=>{ palIndex=0; syncMirror(); renderPalette(); });
input.addEventListener("keydown", (e)=>{
  const open = !palette.classList.contains("hidden");
  if (e.key === "Enter"){
    if (open && currentFilter[palIndex]){ input.value = currentFilter[palIndex].cmd; }
    submit();
  } else if (e.key === "ArrowDown"){
    if (open){ e.preventDefault(); palIndex = (palIndex+1)%currentFilter.length; renderPalette(); }
    else if (history.length){ hIndex = Math.min(history.length-1, hIndex+1); input.value = history[hIndex]||""; syncMirror(); }
  } else if (e.key === "ArrowUp"){
    if (open){ e.preventDefault(); palIndex = (palIndex-1+currentFilter.length)%currentFilter.length; renderPalette(); }
    else if (history.length){ hIndex = Math.max(0, hIndex-1); input.value = history[hIndex]||""; syncMirror(); }
  } else if (e.key === "Tab"){
    e.preventDefault();
    if (open && currentFilter[palIndex]){ input.value = currentFilter[palIndex].cmd; palette.classList.add("hidden"); syncMirror(); }
    else {
      const m = matches(input.value.replace(/^\//,"").toLowerCase());
      if (m.length===1) { input.value = m[0].cmd; syncMirror(); }
    }
  } else if (e.key === "Escape"){ palette.classList.add("hidden"); }
  else if (e.key === "l" && e.ctrlKey){ e.preventDefault(); output.innerHTML=""; term.scrollIntoView({ behavior:"smooth", block:"center" }); }
});
document.addEventListener("click", (e)=>{
  // in-content shortcuts like /contact links inside sections
  const go = e.target.closest("[data-run]");
  if (go){ e.preventDefault(); input.value = go.dataset.run; submit(); return; }
  // project toolbar delegation
  const btn = e.target.closest(".toolbar button");
  if (btn){
    const bar = btn.parentElement;
    if (btn.dataset.view){
      bar.querySelectorAll("[data-view]").forEach(b=>b.classList.remove("on"));
      btn.classList.add("on");
      document.querySelectorAll(".projects-grid").forEach(g=>g.classList.toggle("grid", btn.dataset.view==="grid"));
    }
    if (btn.dataset.filter){
      bar.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("on"));
      btn.classList.add("on");
      const f = btn.dataset.filter;
      document.querySelectorAll("#projGrid .proj").forEach(card=>{
        const tags = card.dataset.tags;
        const show = f==="all" || tags.includes(f) || (f==="rag" && (tags.includes("langchain")||tags.includes("faiss")));
        card.style.display = show ? "" : "none";
      });
    }
    return;
  }
  if (!e.target.closest(".terminal")) return;
  if (!e.target.closest("a") && !e.target.closest("button") && !e.target.closest("input") && !e.target.closest("textarea")) input.focus();
});

// ---------- AI matrix rain (binary + ML glyphs, throttled rAF) ----------
(function matrix(){
  const cv = document.getElementById("matrix");
  if (!cv || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = cv.getContext("2d");
  const GLYPHS = "01アイ01λθ01<>[]{}01+#01";
  const isMobile = innerWidth < 700;
  const FS = isMobile ? 15 : 17;
  let cols, drops, w, h;
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  function size(){
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    cv.style.width = w + "px"; cv.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / FS);
    drops = Array.from({ length: cols }, () => Math.random() * -40);
  }
  size();
  addEventListener("resize", size, { passive: true });
  ctx.font = FS + "px 'VT323', monospace";
  let last = 0, hidden = false;
  document.addEventListener("visibilitychange", () => { hidden = document.hidden; });
  function frame(t){
    requestAnimationFrame(frame);
    if (hidden || t - last < 66) return; // ~15fps: smooth but cheap
    last = t;
    ctx.fillStyle = "rgba(0,0,0,0.14)";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < cols; i++){
      const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
      const head = Math.random() < 0.06;
      ctx.fillStyle = head ? "rgba(255,106,43,0.85)" : "rgba(232,232,232,0.34)";
      ctx.fillText(ch, i * FS, drops[i] * FS);
      if (drops[i] * FS > h && Math.random() > 0.976) drops[i] = 0;
      drops[i]++;
    }
  }
  requestAnimationFrame(frame);
})();

// ---------- logo decode (hacker unscramble) ----------
function decodeLogo(){
  const el = document.querySelector(".pixel-logo span");
  if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = "dharyatra";
  const pool = "01<>[]{}#$%&@01";
  let f = 0;
  const total = 26;
  const tick = setInterval(() => {
    f++;
    const lock = Math.floor((f / total) * target.length);
    let s = "";
    for (let i = 0; i < target.length; i++){
      s += i < lock ? target[i] : pool[(Math.random() * pool.length) | 0];
    }
    el.textContent = s;
    if (f >= total){ clearInterval(tick); el.textContent = target; }
  }, 34);
}

// quick chips — all commands visible below, same as / palette
["/about","/projects","/experience","/tech-stack","/resume","/certifications","/contact"].forEach(c=>{
  const b = document.createElement("button");
  b.className = "chip"; b.innerHTML = `<b>/</b>${c.slice(1)}`;
  b.addEventListener("click", ()=>{ input.value=c; syncMirror(); submit(); });
  chipsBox.appendChild(b);
});

// ---------- boot — hacker overlay, then quiet home ----------
function boot(){
  const overlay = document.getElementById("boot");
  const fill = document.getElementById("boot-fill");
  const pct = document.getElementById("boot-pct");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lines = [
    `<div class="line dim">initialize:// portfolio</div>`,
    `<div class="line">try <b>/about</b> · <b>/projects</b> · <b>/contact</b> — or type <b>/</b> to browse all</div>`,
  ];
  function startTerm(){
    term.classList.add("enter");
    document.querySelector(".stage").classList.add("enter");
    decodeLogo();
    let i = 0;
    (function next(){
      if (i < lines.length){ addHTML(lines[i], false); i++; setTimeout(next, 220); }
      else input.focus();
    })();
  }
  if (!overlay || reduced){ observeReveals(); startTerm(); if (overlay) overlay.remove(); return; }
  let p = 0;
  const t = setInterval(() => {
    p = Math.min(100, p + 4 + Math.random() * 9);
    fill.style.width = p + "%";
    pct.textContent = Math.floor(p) + "%";
    if (p >= 100){
      clearInterval(t);
      setTimeout(() => {
        overlay.classList.add("done");
        observeReveals();
        startTerm();
        setTimeout(() => overlay.remove(), 500);
      }, 250);
    }
  }, 70);
}
observeReveals();
boot();
