import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "pages-dist");
const software = JSON.parse(await readFile(join(root, "data/software.json"), "utf8"));
const css = await readFile(join(root, "app/globals.css"), "utf8");
const categories = ["全部", "效率工具", "开发工具", "设计创作", "实用工具", "隐私安全", "影音娱乐"];
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

const cards = software.map((item) => `<article class="software-card" data-category="${esc(item.category)}" data-search="${esc(`${item.name} ${item.desc} ${item.tags.join(" ")}`.toLowerCase())}">
  <div class="card-top"><div class="app-icon ${esc(item.tone)}">${esc(item.mark)}</div>${item.featured ? '<span class="featured">编辑精选</span>' : ""}</div>
  <span class="category-label">${esc(item.category)}</span><h3>${esc(item.name)}</h3><p>${esc(item.desc)}</p>
  <div class="card-footer"><div>${item.tags.map((tag) => `<span class="tag">#${esc(tag)}</span>`).join("")}</div><a href="${esc(item.url)}" target="_blank" rel="noreferrer" aria-label="访问 ${esc(item.name)}">↗</a></div>
</article>`).join("\n");

const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>好软集｜值得长期使用的软件收藏</title><meta name="description" content="人工精选真正好用、设计用心、值得长期使用的软件。">
<meta property="og:title" content="好软集"><meta property="og:description" content="把真正好用的软件，留在这里。"><meta property="og:image" content="https://chyahy.github.io/software-picks/og.png"><meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image"><link rel="icon" href="favicon.svg"><link rel="stylesheet" href="styles.css"></head><body><main>
<header class="site-header"><a class="brand" href="#top" aria-label="好软集首页"><span class="brand-mark">好</span><span>好软集</span></a><nav class="nav" id="nav" aria-label="主导航"><a href="#collection">发现软件</a><a href="#about">关于本站</a><a class="submit-link" href="https://github.com/chyahy/software-picks/issues/new" target="_blank" rel="noreferrer">推荐软件 <span>↗</span></a></nav><button class="menu-button" id="menu" aria-expanded="false" aria-label="打开菜单">菜单</button></header>
<section class="hero" id="top"><div class="eyebrow"><span>✦</span> 独立精选 · 持续更新</div><h1>把真正好用的<br>软件，<em>留在这里。</em></h1><p>拒绝堆砌与软广，只收藏那些设计用心、解决问题，<br class="desktop-break">并且值得长期使用的软件。</p><div class="search-wrap"><span class="search-icon">⌕</span><input id="search" placeholder="搜索软件、用途或平台…" aria-label="搜索软件"><kbd>⌘ K</kbd></div><div class="hero-notes"><span><i>✓</i> 人工筛选</span><span><i>✓</i> 拒绝付费收录</span><span><i>✓</i> 真实体验</span></div></section>
<section class="collection" id="collection"><div class="section-heading"><div><span class="section-number">01</span><h2>软件收藏</h2></div><p>共收录 <strong>${software.length}</strong> 款好软件</p></div><div class="filters" aria-label="软件分类">${categories.map((c, i) => `<button${i === 0 ? ' class="active"' : ""} data-filter="${c}">${c}</button>`).join("")}</div><div class="software-grid" id="grid">${cards}</div><div class="empty" id="empty" hidden><span>⌕</span><h3>没有找到匹配的软件</h3><p>换个关键词，或者试试其他分类。</p></div></section>
<section class="manifesto" id="about"><span class="section-number">02</span><div><h2>少一点选择，<br>多一点确定。</h2></div><div><p>工具不该让人焦虑。这里的每一款软件，都经过功能、体验、隐私和长期价值的综合判断。</p><p>希望这份不追求数量的收藏，能帮你更快找到称手工具，把时间留给真正重要的事。</p></div></section>
<footer><a class="brand footer-brand" href="#top"><span class="brand-mark">好</span><span>好软集</span></a><p>发现好软件，也分享好品味。</p><span>© 2026 好软集 · Built with curiosity.</span></footer></main>
<script>const search=document.querySelector('#search'),cards=[...document.querySelectorAll('.software-card')],filters=[...document.querySelectorAll('[data-filter]')],empty=document.querySelector('#empty');let category='全部';function update(){const q=search.value.trim().toLowerCase();let count=0;cards.forEach(card=>{const show=(category==='全部'||card.dataset.category===category)&&card.dataset.search.includes(q);card.hidden=!show;if(show)count++});empty.hidden=count>0}search.addEventListener('input',update);filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b===button));update()}));document.querySelector('#menu').addEventListener('click',event=>{const nav=document.querySelector('#nav');nav.classList.toggle('open');event.currentTarget.textContent=nav.classList.contains('open')?'关闭':'菜单';event.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'))});</script></body></html>`;

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await writeFile(join(out, "index.html"), html, "utf8");
await writeFile(join(out, "styles.css"), `${css}\n[hidden]{display:none!important}\n`, "utf8");
await writeFile(join(out, ".nojekyll"), "", "utf8");
await cp(join(root, "public/og.png"), join(out, "og.png"));
await cp(join(root, "public/favicon.svg"), join(out, "favicon.svg"));
await cp(join(root, "public/magic-24"), join(out, "magic-24"), { recursive: true });
await cp(join(root, "public/prime-factor"), join(out, "prime-factor"), { recursive: true });
await cp(join(root, "public/cube-coloring"), join(out, "cube-coloring"), { recursive: true });
await cp(join(root, "public/rational-numbers"), join(out, "rational-numbers"), { recursive: true });
await cp(join(root, "public/geometry-lab"), join(out, "geometry-lab"), { recursive: true });
await cp(join(root, "public/dangdang"), join(out, "dangdang"), { recursive: true });
console.log(`Built GitHub Pages site with ${software.length} software entries.`);
