// Natural image heights with dense CSS-grid placement. Resizing never changes DOM order.
export function observeMasonry(grid){
 let scheduled=false;
 const layout=()=>{scheduled=false;if(!grid.isConnected){observer.disconnect();return}const css=getComputedStyle(grid),row=parseFloat(css.gridAutoRows)||1,gap=parseFloat(css.rowGap)||0,columns=parseInt(css.getPropertyValue('--masonry-columns'))||2;grid.querySelectorAll(':scope > .masonry-item').forEach(item=>{const image=item.querySelector('.natural-image');const wide=item.dataset.layout==='wide'||(item.dataset.layout==='auto'&&image?.naturalWidth/image?.naturalHeight>1.65);item.style.gridColumn=columns>1&&wide?'span 2':'span 1';const inner=item.querySelector('.masonry-inner'),padding=parseFloat(getComputedStyle(item).paddingBottom)||0;if(inner)item.style.gridRowEnd='span '+Math.ceil((inner.offsetHeight+padding+gap)/(row+gap))})};
 const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(layout)}};
 const observer=new ResizeObserver(schedule);observer.observe(grid);grid.querySelectorAll('.masonry-inner').forEach(n=>observer.observe(n));grid.querySelectorAll('img').forEach(img=>{img.addEventListener('load',schedule);img.addEventListener('error',schedule)});document.fonts?.ready.then(schedule);schedule();return ()=>observer.disconnect();
}
