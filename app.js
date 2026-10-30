const toggle=document.getElementById('nav-toggle');
const nav=document.getElementById('main-nav');
function setMenu(open,focus=false){toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);if(focus)toggle.focus()}
toggle.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')setMenu(false,true)});
document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!toggle.contains(e.target))setMenu(false)});
matchMedia('(min-width:768px)').addEventListener('change',e=>{if(e.matches)setMenu(false)});

const imageDialog=document.getElementById('gallery-dialog');
const picture=document.getElementById('gallery-image');
const caption=document.getElementById('gallery-caption');
const galleryItems=[...document.querySelectorAll('#christmas-gallery [data-gallery-src]')];
let activeItems=galleryItems,activeIndex=0,opener=null;
function displayImage(index){activeIndex=(index+activeItems.length)%activeItems.length;const item=activeItems[activeIndex];picture.hidden=false;picture.alt=item.dataset.galleryAlt||'OrcheStars';picture.src=item.dataset.gallerySrc;caption.textContent=picture.alt+(activeItems.length>1?` / ${activeIndex+1} of ${activeItems.length}`:'');document.getElementById('gallery-prev').disabled=activeItems.length<2;document.getElementById('gallery-next').disabled=activeItems.length<2}
function lockScroll(){document.body.style.overflow='hidden'}
function unlockScroll(){if(!document.querySelector('dialog[open]'))document.body.style.overflow=''}
document.querySelectorAll('[data-gallery-src]').forEach(item=>item.addEventListener('click',e=>{e.preventDefault();if(document.querySelector('.archive-viewport')?.dataset.dragged==='true')return;opener=item;activeItems=item.closest('#christmas-gallery')?galleryItems:[item];displayImage(activeItems.indexOf(item));imageDialog.showModal();lockScroll();document.getElementById('gallery-close').focus()}));
document.getElementById('gallery-close').addEventListener('click',()=>imageDialog.close());
document.getElementById('gallery-prev').addEventListener('click',()=>displayImage(activeIndex-1));
document.getElementById('gallery-next').addEventListener('click',()=>displayImage(activeIndex+1));
imageDialog.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)&&activeItems.length>1){e.preventDefault();displayImage(activeIndex+(e.key==='ArrowLeft'?-1:1))}});
imageDialog.addEventListener('close',()=>{unlockScroll();opener?.focus({preventScroll:true})});
picture.addEventListener('error',()=>{picture.hidden=true;caption.textContent='Không tải được ảnh. Vui lòng chuyển ảnh hoặc đóng và thử lại.'});

document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.getElementById(button.dataset.open);dialog.showModal();lockScroll();const frame=dialog.querySelector('iframe[data-src]');if(frame&&!frame.src)frame.src=frame.dataset.src}));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());dialog.addEventListener('close',unlockScroll);dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}})});

const viewport=document.querySelector('.archive-viewport');
const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches;
function moveArchive(direction){viewport.scrollBy({left:direction*(viewport.clientWidth*.75),behavior:reduced()?'instant':'smooth'})}
document.getElementById('archive-prev').addEventListener('click',()=>moveArchive(-1));
document.getElementById('archive-next').addEventListener('click',()=>moveArchive(1));
viewport.addEventListener('keydown',e=>{if(e.target===viewport&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();moveArchive(e.key==='ArrowLeft'?-1:1)}});
let dragging=false,startX=0,startScroll=0;
viewport.addEventListener('pointerdown',e=>{if(e.pointerType==='touch'||e.button!==0)return;dragging=true;startX=e.clientX;startScroll=viewport.scrollLeft;viewport.dataset.dragged='false'});
viewport.addEventListener('pointermove',e=>{if(!dragging)return;const delta=e.clientX-startX;if(Math.abs(delta)>6){viewport.dataset.dragged='true';viewport.classList.add('dragging');viewport.scrollLeft=startScroll-delta;e.preventDefault()}});
window.addEventListener('pointerup',()=>{dragging=false;viewport.classList.remove('dragging');setTimeout(()=>viewport.dataset.dragged='false',50)});
viewport.addEventListener('dragstart',e=>e.preventDefault());

const ticket=document.getElementById('tear-ticket');
ticket.addEventListener('click',()=>{ticket.classList.add('torn');setTimeout(()=>{window.scrollTo({top:0,behavior:reduced()?'instant':'smooth'});document.querySelector('.brand').focus({preventScroll:true});setTimeout(()=>ticket.classList.remove('torn'),800)},reduced()?0:400)});

// The reference archive is a continuous horizontal ticker, paused for interaction.
const track=viewport.querySelector('.archive-track');
galleryItems.forEach(item=>{const copy=item.cloneNode(true);copy.removeAttribute('href');copy.removeAttribute('data-gallery-src');copy.removeAttribute('data-gallery-alt');copy.removeAttribute('aria-label');copy.setAttribute('aria-hidden','true');copy.inert=false;copy.href=item.href;copy.tabIndex=-1;copy.addEventListener('click',event=>{event.preventDefault();item.click()});copy.querySelector('img').alt='';copy.classList.add('archive-copy');track.append(copy)});
let galleryVisible=false,galleryHover=false,galleryFocused=false,userPaused=false,pauseUntil=0,lastTick=0,autoPosition=null;
new IntersectionObserver(entries=>{galleryVisible=entries[0].isIntersecting},{threshold:0}).observe(viewport);
viewport.addEventListener('pointerenter',()=>galleryHover=true);
viewport.addEventListener('pointerleave',()=>galleryHover=false);
viewport.addEventListener('focusin',()=>galleryFocused=true);
viewport.addEventListener('focusout',e=>{if(!viewport.contains(e.relatedTarget))galleryFocused=false});
const pauseTemporarily=()=>pauseUntil=performance.now()+8000;
['wheel','pointerdown','keydown'].forEach(type=>viewport.addEventListener(type,pauseTemporarily,{passive:true}));
['archive-prev','archive-next'].forEach(id=>document.getElementById(id).addEventListener('click',pauseTemporarily));
const pauseButton=document.getElementById('archive-pause');
pauseButton.addEventListener('click',()=>{userPaused=!userPaused;pauseButton.setAttribute('aria-pressed',String(userPaused));pauseButton.setAttribute('aria-label',userPaused?'Tiếp tục gallery tự chạy':'Tạm dừng gallery tự chạy');pauseButton.textContent=userPaused?'▷':'Ⅱ'});
function tickArchive(now){const delta=Math.min(now-lastTick,64);lastTick=now;if(innerWidth>=768&&galleryVisible&&!galleryHover&&!galleryFocused&&!userPaused&&!dragging&&!reduced()&&now>pauseUntil&&!document.querySelector('dialog[open]')){const repeatWidth=track.querySelector('.archive-copy').offsetLeft-galleryItems[0].offsetLeft;if(autoPosition===null||Math.abs(autoPosition-viewport.scrollLeft)>2)autoPosition=viewport.scrollLeft;autoPosition+=delta*.025;if(autoPosition>=repeatWidth)autoPosition-=repeatWidth;viewport.scrollTo({left:autoPosition,behavior:'instant'})}else{autoPosition=null}requestAnimationFrame(tickArchive)}
requestAnimationFrame(tickArchive);

const nightList=document.querySelector('.night-list');
const nightShells=[...nightList.querySelectorAll('.night-shell')];
let stackQueued=false;
function updateNightStack(){stackQueued=false;const listTop=nightList.getBoundingClientRect().top+scrollY;const gap=parseFloat(getComputedStyle(nightList).rowGap);const section=document.querySelector('.nights');const intro=section.querySelector('.section-head').getBoundingClientRect().height+parseFloat(getComputedStyle(section).rowGap)+parseFloat(getComputedStyle(section).paddingTop);nightShells.forEach((shell,index)=>{const naturalTop=listTop+index*(shell.offsetHeight+gap);const scale=reduced()?1:Math.max(.82,1-Math.max(0,scrollY-(naturalTop-intro))/16000);shell.firstElementChild.style.transform=`scale(${scale})`})}
function requestStack(){if(!stackQueued){stackQueued=true;requestAnimationFrame(updateNightStack)}}
window.addEventListener('scroll',requestStack,{passive:true});window.addEventListener('resize',requestStack);matchMedia('(prefers-reduced-motion:reduce)').addEventListener('change',requestStack);updateNightStack();
