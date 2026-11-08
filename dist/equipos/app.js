'use strict';
const money = value => '$' + new Intl.NumberFormat('es-CO',{maximumFractionDigits:0}).format(value);
const icons = {
  nas:'<rect x="5" y="4" width="22" height="25" rx="4"/><rect x="9" y="9" width="5" height="13" rx="1"/><rect x="18" y="9" width="5" height="13" rx="1"/><path d="M11 26h2m7 0h2"/>',
  disk:'<rect x="6" y="3" width="20" height="26" rx="3"/><circle cx="16" cy="13" r="6"/><circle cx="16" cy="13" r="1.5"/><path d="m16 13 7 7M10 25h12"/>',
  ups:'<rect x="6" y="3" width="20" height="26" rx="3"/><path d="M11 10h10M11 14h10M13 22h6M16 19v6"/><circle cx="16" cy="6" r=".6"/>',
  router:'<rect x="3" y="7" width="26" height="18" rx="4"/><path d="M8 20h3m3 0h3m3 0h3M8 12h7"/>',
  wifi:'<path d="M3 10q13-13 26 0M8 16q8-8 16 0M13 22q3-3 6 0"/><circle cx="16" cy="27" r="1"/>',
  poe:'<rect x="9" y="3" width="14" height="26" rx="3"/><path d="m17 9-4 8h6l-4 7M14 3v-2m4 2v-2"/>'
};
const escapeHtml=text=>String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function itemMarkup(item){return `<article class="equipment"><div class="item-main"><div class="item-icon" aria-hidden="true"><svg viewBox="0 0 32 32">${icons[item.icon]}</svg></div><div class="item-title"><h4>${escapeHtml(item.name)}</h4><p class="function">${escapeHtml(item.function)}</p><p class="spec">${escapeHtml(item.spec)}</p></div><div class="item-total"><strong>${money(item.qty*item.unit)}</strong><span>${item.qty} ${item.qty===1?'unidad':'unidades'} × ${money(item.unit)}</span></div></div><div class="item-meta"><div class="seller-row"><div class="seller"><b>${escapeHtml(item.market)}</b>${escapeHtml(item.seller)}</div><a class="shop-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Ver enlace de ejemplo para ${escapeHtml(item.name)} en ${escapeHtml(item.market)}">Enlace de ejemplo <span aria-hidden="true">↗</span></a></div><p class="purchase-note">${escapeHtml(item.shipping)}</p><p class="purchase-note"><strong>Garantía anunciada.</strong> ${escapeHtml(item.warranty)}</p></div></article>`;}
const tabs=[document.getElementById('tab-storage'),document.getElementById('tab-network')];
let capacity=4;
let activeView='storage';
function setCapacity(value){
 capacity=value;
 const items=[
  {...EQUIPMENT_CATALOG.nas,qty:2},
  {...EQUIPMENT_CATALOG.disks[value],qty:4},
  {...EQUIPMENT_CATALOG.ups,qty:2}
 ];
 const subtotal=items.reduce((total,item)=>total+item.qty*item.unit,0);
 const reserve=Math.round(items.reduce((total,item)=>total+(item.importPending?item.qty*item.unit:0),0)*.30);
 document.getElementById('storage-items').innerHTML=items.map(itemMarkup).join('');
 document.getElementById('storage-subtotal').textContent=money(subtotal);
 document.getElementById('storage-reserve').textContent=money(reserve);
 document.getElementById('storage-total').textContent=money(subtotal+reserve);
 document.getElementById('budget-capacity').textContent=value+' TB';
 const single=subtotal/2;
 const singleReserve=Math.round(items.reduce((total,item)=>total+(item.importPending?item.qty*item.unit/2:0),0)*.30);
 document.getElementById('single-nas-total').textContent=money(single+singleReserve)+' COP';
 document.getElementById('single-nas-basis').textContent=money(single)+' en equipos y '+money(singleReserve)+' de reserva sugerida.';
 document.querySelectorAll('[data-capacity]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.capacity)===value)));
 document.querySelectorAll('.capacity-label').forEach(label=>label.textContent=value+' TB nominales');
 document.getElementById('capacity-explanation').textContent=`Cuatro discos de ${value} TB: dos en cada NAS. Cada par en espejo aporta ${value} TB nominales. El segundo NAS guarda la copia; no son ${value*2} TB de archivos distintos.`;
 document.getElementById('reserve-explanation').textContent=value===4?'30 % del precio publicado de los dos NAS importados. Los discos de 4 TB y las UPS tienen referencias locales.':'30 % del precio publicado de los dos NAS y cuatro discos importados. La reserva se muestra aparte del precio de entrega.';
}
function setView(view,updateUrl=true){
 activeView=view;
 document.getElementById('view-storage').hidden=view!=='storage';
 document.getElementById('view-network').hidden=view!=='network';
 tabs.forEach((tab,index)=>{const active=(view==='storage'?0:1)===index;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 if(updateUrl)history.replaceState(null,'',view==='storage'?`#almacenamiento-${capacity}tb`:'#red');
}
function readHash(){const hash=location.hash;setCapacity(hash==='#almacenamiento-8tb'?8:capacity);if(hash==='#almacenamiento-4tb')setCapacity(4);setView(hash==='#red'?'network':'storage',false);}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>setView(index===0?'storage':'network'));
 tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const target=event.key==='Home'?0:event.key==='End'?1:1-index;tabs[target].focus();setView(target===0?'storage':'network');});
});
document.querySelectorAll('[data-capacity]').forEach(button=>button.addEventListener('click',()=>{setCapacity(Number(button.dataset.capacity));setView('storage');}));
document.getElementById('network-items').innerHTML=EQUIPMENT_CATALOG.network.map(item=>itemMarkup({...item,qty:1})).join('');
document.getElementById('network-breakdown').innerHTML=EQUIPMENT_CATALOG.network.map(item=>'<div><dt>'+escapeHtml(item.name)+'</dt><dd>'+money(item.unit)+'</dd></div>').join('');
document.getElementById('network-total').textContent=money(DEMO_NETWORK_TOTAL);
document.getElementById('usb-items').innerHTML=itemMarkup({...EQUIPMENT_CATALOG.usb,qty:2});
document.getElementById('print-button').addEventListener('click',()=>window.print());
window.addEventListener('hashchange',readHash);
readHash();

const entry = new URLSearchParams(location.search);
const returnTarget = entry.get('desde');
const returnLabels = new Map([
 ['fisico-1-nas','Volver al presupuesto de copias'],
 ['fisico-2-nas','Volver al presupuesto de copias'],
 ['fisico-por-fases','Volver al presupuesto de copias'],
 ['nube-a-hibrido','Volver al presupuesto de copias'],
 ['trabajo-seguridad','Volver al presupuesto de seguridad']
]);
if (returnLabels.has(returnTarget)) {
 const back = document.getElementById('purchase-back');
 const companyQuery = entry.get('empresa') === 'both' ? '?empresa=both' : '';
 back.href = '../' + companyQuery + '#' + returnTarget;
 back.textContent = '← ' + returnLabels.get(returnTarget);
}
