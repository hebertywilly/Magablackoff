(function(){
  const COUNT_KEY = "mb_count_start";
  const DURATION = 15 * 60 * 1000; // 15 min
  const cd = document.getElementById("countdown");
  const year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  const btn = document.getElementById("btn-comprar");
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const link = urlParams.get("checkout");
    if (link && btn) btn.setAttribute("href", link);
  } catch(e){}

  function startOrRestore(){
    let start = localStorage.getItem(COUNT_KEY);
    const now = Date.now();
    if (!start || (now - Number(start)) > DURATION) {
      start = String(now);
      localStorage.setItem(COUNT_KEY, start);
    }
    return Number(start);
  }
  const start = startOrRestore();

  function tick(){
    const now = Date.now();
    const elapsed = now - start;
    const left = Math.max(0, DURATION - elapsed);
    const mm = Math.floor(left / 60000);
    const ss = Math.floor((left % 60000) / 1000);
    if (cd) cd.textContent = `${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
    if (left <= 0) return;
    requestAnimationFrame(tick);
  }
  tick();
})();