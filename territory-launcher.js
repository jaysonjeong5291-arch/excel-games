/* 천하쟁패 v0.1 테스트 진입. 기존 엑셀 게임/포인트를 수정하지 않습니다. */
(()=>{
  'use strict';
  if (document.getElementById('cheonha-launcher')) return;
  const styles=document.createElement('style');
  styles.textContent=`
    #cheonha-launcher{background:#2c624b;color:#fff7e0;border:1px solid #70a07e;border-radius:3px;padding:9px 13px;font:800 12px 'Malgun Gothic',sans-serif;white-space:nowrap;cursor:pointer;box-shadow:0 1px 3px #294b3422}
    #cheonha-launcher:hover{background:#1e4c37}
    #cheonha-launcher.cheonha-fallback{position:fixed;bottom:42px;right:14px;z-index:2000}
    #cheonha-overlay{position:fixed;inset:0;z-index:2147483001;background:#102125}
    #cheonha-overlay iframe{border:0;width:100%;height:100%;display:block}
    #cheonha-overlay-close{position:absolute;z-index:2;top:9px;right:10px;color:#fff9ea;background:#733d37;border:1px solid #d69a86;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;padding:8px 12px}
    @media(max-width:780px){#lobby-view .lobby-actions #cheonha-launcher{grid-column:1/-1;grid-row:3;width:100%;padding:10px}}
  `;
  document.head.append(styles);
  const btn=document.createElement('button');
  btn.id='cheonha-launcher';btn.type='button';btn.textContent='🏯 영토전 (TEST)';
  btn.setAttribute('aria-label','천하쟁패 영토전 테스트 시작');
  const lobbyActions=document.querySelector('#lobby-view .lobby-actions');
  const createRoom=document.getElementById('create-room-btn');
  if (lobbyActions){
    if(createRoom)lobbyActions.insertBefore(btn,createRoom);else lobbyActions.append(btn);
  }else{
    btn.classList.add('cheonha-fallback');document.body.append(btn);
  }
  let previousOverflow='';
  const onEscape=e=>{if(e.key==='Escape')close()};
  function close(){
    const overlay=document.getElementById('cheonha-overlay');
    if(!overlay)return;
    overlay.remove();document.body.style.overflow=previousOverflow;
    document.removeEventListener('keydown',onEscape);
    btn.focus({preventScroll:true});
  }
  btn.addEventListener('click',()=>{
    if(document.getElementById('cheonha-overlay'))return;
    const overlay=document.createElement('div');overlay.id='cheonha-overlay';
    overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','천하쟁패 테스트 게임');
    const iframe=document.createElement('iframe');iframe.src='./territory-demo.html';
    iframe.title='천하쟁패 테스트 게임';
    const exit=document.createElement('button');exit.id='cheonha-overlay-close';
    exit.type='button';exit.textContent='✕ Sheet1로 돌아가기';exit.addEventListener('click',close);
    overlay.append(iframe,exit);document.body.append(overlay);
    previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    document.addEventListener('keydown',onEscape);exit.focus({preventScroll:true});
  });
  window.addEventListener('message',e=>{
    const frame=document.querySelector('#cheonha-overlay iframe');
    if(e.source===frame?.contentWindow && e.origin===location.origin && e.data?.type==='CHEONHA_CLOSE')close();
  });
})();
