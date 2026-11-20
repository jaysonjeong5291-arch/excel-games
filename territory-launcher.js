/* 천하쟁패 테스트 진입 버튼. 기존 Sheet1 구조를 수정하지 않고 사용 가능합니다. */
(()=>{
  if (document.getElementById('cheonha-launcher')) return;
  const style=document.createElement('style');
  style.textContent=`#cheonha-launcher{position:fixed;right:22px;bottom:22px;z-index:2147483000;background:#285d49;color:#fff5d7;border:1px solid #98bb8a;border-radius:9px;padding:13px 17px;box-shadow:0 5px 20px #0005;font:800 14px 'Malgun Gothic',sans-serif;cursor:pointer}#cheonha-overlay{position:fixed;inset:0;z-index:2147483001;background:#102125}#cheonha-overlay iframe{border:0;width:100%;height:100%}#cheonha-overlay-close{position:absolute;z-index:2;top:12px;right:12px;color:#fff;background:#6f3e38;border:1px solid #dda69a;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;padding:8px 12px}`;
  document.head.appendChild(style);
  const btn=document.createElement('button');btn.id='cheonha-launcher';btn.type='button';btn.textContent='🏯 천하쟁패 (TEST)';
  function close(){document.getElementById('cheonha-overlay')?.remove();btn.style.display='block';document.removeEventListener('keydown',onEscape)}
  function onEscape(e){if(e.key==='Escape')close()}
  btn.onclick=()=>{if(document.getElementById('cheonha-overlay'))return;const overlay=document.createElement('div');overlay.id='cheonha-overlay';const iframe=document.createElement('iframe');iframe.src='./territory-demo.html';iframe.title='천하쟁패 테스트 게임';const exit=document.createElement('button');exit.id='cheonha-overlay-close';exit.type='button';exit.textContent='✕ Sheet1로 돌아가기';exit.onclick=close;overlay.append(iframe,exit);document.body.appendChild(overlay);btn.style.display='none';document.addEventListener('keydown',onEscape)};
  window.addEventListener('message',e=>{if(e.source===document.querySelector('#cheonha-overlay iframe')?.contentWindow&&e.data?.type==='CHEONHA_CLOSE')close()});
  document.body.appendChild(btn);
})();
