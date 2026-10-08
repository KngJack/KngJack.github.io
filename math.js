/* ================================================================
   公式渲染器（KaTeX）—— 论文 / 随笔的文章页共用这一个文件
   ----------------------------------------------------------------
   用法：文章页的 <head> 里加一行
       <script src="../../math.js" defer></script>
   页面里就能直接用 LaTeX 数学语法：
       行内      $T_c$          或  \(T_c\)
       独立成行  $$ ... $$      或  \[ ... \]
       多行对齐  \begin{align} ... \end{align}
       编号环境  \begin{equation} ... \end{equation}
   ----------------------------------------------------------------
   · 公式文件从下面的 CDN 在线加载（首次约 1.2 秒，之后走浏览器缓存）；
   · 没联网时会自动尝试备用地址，全都失败也不影响页面：
     公式位置就显示 $…$ 原文，正文、图片照常；
   · 想换 CDN 或换版本，只改下面的 VERSION / BASES 即可；
   · 想把公式放到本地（离线也能用），把 KaTeX 的
     katex.min.js、katex.min.css、fonts/ 放进 assets/katex/，
     然后把 BASES 改成 ['../../assets/katex/']（注意文章页的层级是 ../../）。
   ================================================================ */
(function () {
  'use strict';

  var VERSION = '0.16.9';
  var BASES = [
    'https://cdn.jsdelivr.net/npm/katex@' + VERSION + '/dist/',
    'https://unpkg.com/katex@' + VERSION + '/dist/',
    'https://fastly.jsdelivr.net/npm/katex@' + VERSION + '/dist/'
  ];

  /* 认这些写法（顺序有讲究：长分隔符要写在短的前面） */
  var DELIMS = [
    { left: '$$', right: '$$', display: true },
    { left: '\\[', right: '\\]', display: true },
    { left: '\\(', right: '\\)', display: false },
    { left: '$', right: '$', display: false },
    { left: '\\begin{equation}', right: '\\end{equation}', display: true },
    { left: '\\begin{align}',    right: '\\end{align}',    display: true },
    { left: '\\begin{gather}',   right: '\\end{gather}',   display: true }
  ];

  function addCss(base) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = base + 'katex.min.css';
    document.head.appendChild(link);
  }

  function loadScript(src, ok, fail) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = ok;
    s.onerror = fail;
    document.head.appendChild(s);
  }

  function render() {
    if (typeof window.renderMathInElement !== 'function') {
      console.warn('[公式] auto-render 未就绪');
      return;
    }
    try {
      window.renderMathInElement(document.body, {
        delimiters: DELIMS,
        throwOnError: false   // 公式写错时只在原位报错，不会让整页崩掉
      });
      console.log('[公式] 渲染完成');
    } catch (e) {
      console.warn('[公式] 渲染出错：' + e);
    }
  }

  /* 逐个尝试 CDN 地址，一个不行就换下一个 */
  function tryBase(i) {
    if (i >= BASES.length) {
      console.warn('[公式] KaTeX 加载失败（可能没联网）—— 公式将以 $…$ 原文显示');
      return;
    }
    var base = BASES[i];
    loadScript(base + 'katex.min.js',
      function () {
        addCss(base);
        loadScript(base + 'contrib/auto-render.min.js', render, function () {
          console.warn('[公式] auto-render 加载失败：' + base);
          tryBase(i + 1);
        });
      },
      function () {
        console.warn('[公式] 这个地址不可用，换下一个：' + base);
        tryBase(i + 1);
      }
    );
  }

  tryBase(0);
})();
