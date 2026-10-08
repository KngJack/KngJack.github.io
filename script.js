/* ================================================================
   深浅色切换（全站共用）
   ----------------------------------------------------------------
   · 各页面顶部那段内联脚本负责"进页面时用哪个主题"（防止刷新闪白）；
     本文件负责"点击按钮后怎么切换、怎么记住"。
   · 记住的选择存在 localStorage 的 'theme' 里。
     想恢复"深色优先"的默认状态：浏览器控制台执行
       localStorage.removeItem('theme')
     刷新即可。
   ================================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;   // 页面上没有按钮（比如你删掉了）就直接退出，不报错

  // 更新主题属性与按钮提示（图标的显隐由 CSS 根据 data-theme 自动切换）
  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var label = theme === 'dark' ? '切换到浅色模式' : '切换到深色模式';
    btn.setAttribute('aria-label', label);
    btn.title = label;
  }

  // 首次加载：让按钮提示与页面顶部脚本设定的主题对齐
  apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // 浏览器的隐私模式可能禁用 localStorage：
      // 此时切换仍然有效，只是刷新后不会记住
    }
  });
})();
