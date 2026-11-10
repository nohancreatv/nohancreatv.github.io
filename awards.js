const section=document.createElement('section');section.id='premiacoes';section.className='awards-section wrap';section.hidden=true;
section.innerHTML='<div class="awards-heading"><h2>Premiações</h2><div class="awards-controls"><button type="button" aria-label="Premiações anteriores">←</button><button type="button" aria-label="Próximas premiações">→</button></div></div><div class="awards-track" role="region" aria-label="Lista de premiações" tabindex="0"></div>';
document.querySelector('#projetos').after(section);
const track=section.querySelector('.awards-track'),buttons=section.querySelectorAll('button');
const trophy='<svg viewBox="0 0 160 140" fill="none" aria-hidden="true"><path d="M53 22h54v35c0 24-12 36-27 36S53 81 53 57V22Z" fill="#e4dfd1" stroke="currentColor" stroke-width="3"/><path d="M53 30H31v20c0 19 13 29 27 29m49-49h22v20c0 19-13 29-27 29M80 93v23m-24 7h48" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="m80 35 5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1Z" fill="currentColor"/></svg>';
function text(tag,value,cls){const e=document.createElement(tag);e.textContent=value;if(cls)e.className=cls;return e}
function controls(){const max=track.scrollWidth-track.clientWidth;buttons[0].disabled=track.scrollLeft<=2;buttons[1].disabled=track.scrollLeft>=max-2;section.querySelector('.awards-controls').hidden=max<3}
buttons.forEach((button,index)=>button.onclick=()=>track.scrollBy({left:(index?1:-1)*(track.querySelector('article')?.offsetWidth+24||280),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'}));
track.addEventListener('scroll',controls,{passive:true});new ResizeObserver(controls).observe(track);
// Site estático: as premiações já vêm no HTML (script#portfolio-data), sem chamar nenhum servidor.
function render(){
 let awards;try{awards=JSON.parse(document.getElementById('portfolio-data')?.textContent||'{}').awards}catch{}
 if(!Array.isArray(awards))return;track.replaceChildren();
 for(const a of awards){const card=document.createElement('article');card.className='award-card';const media=document.createElement('div');media.className='award-media';const fallback=()=>{media.innerHTML=trophy};if(a.imageUrl){const img=document.createElement('img');img.src=a.imageUrl;img.alt=a.title;img.loading='lazy';img.onerror=fallback;media.append(img)}else fallback();card.append(media,text('h3',a.title),text('p',[a.event,a.year].filter(Boolean).join(' · '),'award-meta'));if(a.description)card.append(text('p',a.description,'award-description'));if(a.linkUrl){const link=text('a','Conhecer premiação ↗','award-link');link.href=a.linkUrl;link.target='_blank';link.rel='noopener noreferrer';card.append(link)}track.append(card)}
 section.hidden=!awards.length;requestAnimationFrame(controls);
}
render();
