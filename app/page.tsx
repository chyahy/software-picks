"use client";

import { useMemo, useState } from "react";
import software from "../data/software.json";

const categories = ["全部", "效率工具", "开发工具", "设计创作", "实用工具", "隐私安全", "影音娱乐"];

export default function Home() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const results = useMemo(() => software.filter((item) => {
    const inCategory = category === "全部" || item.category === category;
    const text = `${item.name} ${item.desc} ${item.tags.join(" ")}`.toLowerCase();
    return inCategory && text.includes(query.trim().toLowerCase());
  }), [category, query]);

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="好软集首页"><span className="brand-mark">好</span><span>好软集</span></a>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="主导航"><a href="#collection">发现软件</a><a href="#about">关于本站</a><a className="submit-link" href="https://github.com/chyahy/software-picks/issues/new" target="_blank" rel="noreferrer">推荐软件 <span>↗</span></a></nav>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="打开菜单">{menuOpen ? "关闭" : "菜单"}</button>
    </header>
    <section className="hero" id="top">
      <div className="eyebrow"><span>✦</span> 独立精选 · 持续更新</div>
      <h1>把真正好用的<br />软件，<em>留在这里。</em></h1>
      <p>拒绝堆砌与软广，只收藏那些设计用心、解决问题，<br className="desktop-break" />并且值得长期使用的软件。</p>
      <div className="search-wrap"><span className="search-icon">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索软件、用途或平台…" aria-label="搜索软件" /><kbd>⌘ K</kbd></div>
      <div className="hero-notes"><span><i>✓</i> 人工筛选</span><span><i>✓</i> 拒绝付费收录</span><span><i>✓</i> 真实体验</span></div>
    </section>
    <section className="collection" id="collection">
      <div className="section-heading"><div><span className="section-number">01</span><h2>软件收藏</h2></div><p>共收录 <strong>{software.length}</strong> 款好软件</p></div>
      <div className="filters" aria-label="软件分类">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
      {results.length > 0 ? <div className="software-grid">{results.map((item) => <article className="software-card" key={item.name}>
        <div className="card-top"><div className={`app-icon ${item.tone}`}>{item.mark}</div>{item.featured && <span className="featured">编辑精选</span>}</div>
        <span className="category-label">{item.category}</span><h3>{item.name}</h3><p>{item.desc}</p>
        <div className="card-footer"><div>{item.tags.map((tag) => <span className="tag" key={tag}>#{tag}</span>)}</div><a href={item.url} target="_blank" rel="noreferrer" aria-label={`访问 ${item.name}`}>↗</a></div>
      </article>)}</div> : <div className="empty"><span>⌕</span><h3>没有找到匹配的软件</h3><p>换个关键词，或者试试其他分类。</p></div>}
    </section>
    <section className="manifesto" id="about"><span className="section-number">02</span><div><h2>少一点选择，<br />多一点确定。</h2></div><div><p>工具不该让人焦虑。这里的每一款软件，都经过功能、体验、隐私和长期价值的综合判断。</p><p>希望这份不追求数量的收藏，能帮你更快找到称手工具，把时间留给真正重要的事。</p></div></section>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark">好</span><span>好软集</span></a><p>发现好软件，也分享好品味。</p><span>© 2026 好软集 · Built with curiosity.</span></footer>
  </main>;
}
