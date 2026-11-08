'use strict';

const icons = {
  lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><path d="M12 14v3"/>',
  users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  cloud:'<path d="M20 16.2A4.8 4.8 0 0 0 18 7a6.2 6.2 0 0 0-11.7 1.4A4.3 4.3 0 0 0 6 17h12a4.8 4.8 0 0 0 2-0.8Z"/>',
  shield:'<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m8 12 3 3 5-6"/>',
  check:'<path d="m5 12 4 4L20 5"/>',
  folder:'<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 9h18"/>',
  move:'<path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4 4-4-4 4-4"/>',
  book:'<path d="M12 7C8 3 3 4 3 4v15s5-1 9 2c4-3 9-2 9-2V4s-5-1-9 3Z"/><path d="M12 7v14"/>',
  restore:'<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7"/><path d="M12 7v5l3 2"/>',
  server:'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6"/>',
  layers:'<path d="m12 3 10 6-10 6L2 9l10-6Zm-10 12 10 6 10-6M2 12l10 6 10-6"/>',
  repeat:'<path d="m17 2 4 4-4 4M3 11V8a2 2 0 0 1 2-2h16M7 22l-4-4 4-4m14-1v3a2 2 0 0 1-2 2H3"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  building:'<rect x="4" y="3" width="16" height="19" rx="2"/><path d="M9 22v-5h6v5M8 7h1M15 7h1M8 11h1M15 11h1"/>',
  usb:'<path d="M12 3v18M8 7l4-4 4 4M12 15l-5-4V8m5 10 5-4v-3"/><circle cx="12" cy="21" r="1"/><rect x="15.5" y="8" width="3" height="3"/><circle cx="7" cy="6.5" r="1.5"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>'
};
function svg(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">'+(icons[name] || icons.info)+'</svg>'; }
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML=svg(el.dataset.icon); });

const DATA = {
  co: {scope:'Quimel', primary:DEMO_NAS_KIT, secondary:DEMO_NAS_KIT, usbPair:2*EQUIPMENT_CATALOG.usb.unit, power:36*650, networkMin:DEMO_NETWORK_TOTAL, networkMax:DEMO_NETWORK_TOTAL},
  sv: {scope:'Sautec', primary:1900000, secondary:1700000, usbPair:460000, power:25200, networkMin:500000, networkMax:650000}
};
const RATE = 40000;
const TAX = 1.19; // IVA 19 %
// Valores finales a cobrar al cliente (neto sin IVA; el total mostrado lleva IVA del 19 %).
const FINAL_PRICES = {
  m365: {net:1800000, total:2142000},
  single: {net:1904000, total:2265760},
  physical: {net:2100000, total:2499000},
  phased: {net:2220000, total:2641800},
  cloud: {net:1740000, total:2070600},
  upgradePhysical: {net:300000, total:357000},
  upgradeCloud: {net:600000, total:714000}
};
const CLOUD = {server:62000, storage:15000};
const HOURS = {
  upgradePhysical: [
    ['Cuenta B2 de la empresa y credenciales limitadas',0.5],
    ['Copia cifrada, historial, protección y alertas',1.5],
    ['Prueba de recuperación desde la nube',1],
    ['Actualización del manual y entrega',1]
  ],
  upgradeCloud: [
    ['Preparar dos NAS: discos, seguridad, UPS y alertas',3],
    ['Conectar los NAS en las dos ubicaciones',1],
    ['Configurar copias de archivos, base de datos y configuración',2],
    ['Pruebas de recuperación desde los NAS',2],
    ['Actualización del manual y entrega',1]
  ],
  cloud: [
    ['Cuentas de nube',1],
    ['Servicio de archivos para administradores',4],
    ['Acceso privado con Cloudflare',3],
    ['Copia protegida en otra región',2],
    ['Pruebas de recuperación',1],
    ['Migración de información sensible',5],
    ['Configuración de computadores, capacitación y documentación',4]
  ],
  physical: [
    ['NAS principal: instalación y seguridad',5],
    ['Segundo NAS y copia automática',6],
    ['Acceso privado con Cloudflare',3],
    ['Prueba de recuperación',1],
    ['Migración de información sensible',5],
    ['Configuración de computadores, capacitación y documentación',4]
  ],
  phaseTwo: [
    ['Instalar el segundo NAS, configurar la copia automática y probarla',6],
    ['Revisar el NAS principal y actualizar la entrega',1]
  ],
  m365: [
    ['Inventariar usuarios, direcciones, archivos y permisos',3],
    ['Configurar Microsoft 365, dominio, cuentas y verificación en dos pasos',4],
    ['Migrar Google Drive a OneDrive y las carpetas de equipo a SharePoint',5],
    ['Probar la migración de correo con un buzón piloto',3],
    ['Migrar correo e historial de los buzones acordados y configurar alias o listas',6],
    ['Cambiar el enrutamiento, configurar la autenticación del correo y verificar envíos',3],
    ['Capacitar a los usuarios y entregar manuales',3],
    ['Capacitar a administradores en permisos, uso compartido y entrega',3]
  ],
  security: [
    ['Configurar controles para memorias USB',6],
    ['Configurar permisos en los computadores',6],
    ['Separar y proteger las redes Wi-Fi',4],
    ['Documentar y capacitar a los administradores',1]
  ]
};
HOURS.single = [
  ...HOURS.physical.slice(0,1),
  ...HOURS.physical.slice(2),
  ['Configurar la copia y rotación de dos discos USB',0.5]
];

const PLANS = {
  single: {title:'Solo 1 NAS', description:'Un NAS en la oficina y dos discos USB en rotación manual.', groups:[['', 'single']], gear:['primary','usbPair'], energy:0.5, maintenance:2.5},
  physical: {title:'2 NAS juntos', description:'Los archivos se usan desde el NAS de la oficina y se copian automáticamente al segundo NAS, en otra ubicación.', groups:[['','physical']], gear:['primary','secondary'], energy:1, maintenance:2.5},
  phased: {title:'Instalación por fases', description:'Primero se instala el NAS principal con copia rotativa en USB. Más adelante se añade el segundo NAS en otra ubicación.', groups:[['Fase 1 · NAS principal','single'],['Fase 2 · Añadir el segundo NAS','phaseTwo']], gear:['primary','usbPair','secondary'], energy:1, maintenance:2.5},
  cloud: {title:'Nube', description:'Los administradores trabajan en Nextcloud. Una copia cifrada se guarda en otra región.', groups:[['','cloud']], gear:[], cloudMain:true, cloudCopy:true, maintenance:2},
  upgradePhysical: {title:'Ampliación desde físico', description:'El NAS sigue siendo el sistema principal y se agrega una copia cifrada en la nube.', groups:[['','upgradePhysical']], gear:[], cloudCopy:true, maintenance:3},
  upgradeCloud: {title:'Ampliación desde nube', description:'Nextcloud sigue siendo el sistema principal. Se instalan dos NAS en ubicaciones distintas para guardar copias.', groups:[['','upgradeCloud']], gear:['primary','secondary'], energy:1, cloudMain:true, cloudCopy:true, maintenance:3.5}
};
const EQUIPMENT = {
  primary:'NAS principal, dos discos internos SATA y UPS',
  secondary:'Segundo NAS, dos discos internos SATA y UPS',
  usbPair:'Dos discos externos USB para rotación de copias'
};
let company = new URLSearchParams(location.search).get('empresa') === 'both' ? 'both' : 'co';
let model = '';
let physicalPlan = 'physical';
let hybridPlan = 'upgradePhysical';

const money = new Intl.NumberFormat('es-CO', {style:'currency',currency:'COP',maximumFractionDigits:0});
const decimal = new Intl.NumberFormat('es-CO', {maximumFractionDigits:2});
const cop = value => money.format(Math.round(value)).replace(/\s/g,'') + ' COP';
const hours = value => decimal.format(value) + ' h';
const hourTotal = key => HOURS[key].reduce((sum, row) => sum + row[1], 0);
const laborPrice = value => Math.round(value * RATE * TAX);
const byId = id => document.getElementById(id);
const selectedCompanies = () => company === 'both' ? [DATA.co, DATA.sv] : [DATA[company]];
const sumEquipment = key => selectedCompanies().reduce((sum, item) => sum + item[key], 0);
const quoteLine = (label, value, note = '') =>
  '<div class="quote-line"><span>' + label + (note ? '<small>' + note + '</small>' : '') +
  '</span><strong>' + value + '</strong></div>';
const taskRows = (key, count) => HOURS[key].map(([task, time]) => quoteLine(task,hours(time*count))).join('');

function renderBackup() {
  const key = model === 'physical' ? physicalPlan : model === 'hybrid' ? hybridPlan : model;
  const plan = PLANS[key];
  byId('physical-choices').hidden = model !== 'physical';
  byId('hybrid-choices').hidden = model !== 'hybrid';
  byId('backup-budget').hidden = !plan;
  byId('plan-administradores').hidden = !plan;
  byId('model-prompt').hidden = !!plan;
  document.querySelectorAll('[data-model]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.model === model)));
  document.querySelectorAll('[data-plan]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.plan === key)));
  if (!plan) return;

  const count = selectedCompanies().length;
  const totalHours = plan.groups.reduce((sum, [, group]) => sum + hourTotal(group)*count, 0);
  byId('backup-title').textContent = plan.title;
  byId('backup-description').textContent = plan.description;
  byId('backup-hours').textContent = hours(totalHours) + ' estimadas';
  byId('backup-tasks').innerHTML = plan.groups.map(([label, group]) => {
    const header = label ? quoteLine(label,hours(hourTotal(group)*count),'Mano de obra · '+cop(laborPrice(hourTotal(group)*count))) : '';
    return '<div class="labor-group">' + header + taskRows(group,count) + '</div>';
  }).join('') + (key === 'phased' ? '<p class="phase-note">Por empresa, 1,5 h adicionales en este ejemplo: 0,5 h para la copia inicial en USB y 1 h para revisar el montaje al añadir el segundo NAS.</p>' : '');
  byId('backup-labor-label').innerHTML = (model === 'hybrid' ? 'Pago único de la ampliación' : 'Pago único de mano de obra') + '<small>IVA del 19 % incluido</small>';
  byId('backup-labor-price').textContent = cop(FINAL_PRICES[key].total);

  const hardwareLabel = plan.gear.length ? 'Equipos · compra aparte' : 'Equipos nuevos';
  const equipmentRows = plan.gear.map(item => {
    const stage = key === 'phased' ? (item === 'secondary' ? 'Fase 2 · ' : 'Fase 1 · ') : '';
    return quoteLine(stage + EQUIPMENT[item],'—');
  }).join('');
  const equipmentNote = plan.gear.length
    ? 'Importes de los equipos por confirmar; el detalle figura en la ficha de compra.'
    : key === 'upgradePhysical' ? 'Se reutilizan los NAS instalados.' : 'El servicio principal funciona en la nube.';
  let equipmentLink = '';
  if (plan.gear.length && company !== 'sv') {
    const returnId = document.querySelector('[data-plan="' + key + '"]').id;
    const companyQuery = company === 'both' ? '&amp;empresa=both' : '';
    equipmentLink = ' + precio de entrega según el vendedor y la dirección.' +
      ' <a href="equipos/?desde=' + returnId + companyQuery + '#almacenamiento-4tb">Ver kit de dos NAS de Quimel →</a>';
  }
  const phaseTotals = key === 'phased'
    ? quoteLine('Fase 1 · Instalación y equipos',cop(FINAL_PRICES.single.total)) +
      quoteLine('Fase 2 · Ampliación y equipos',cop(FINAL_PRICES.phased.total-FINAL_PRICES.single.total)) : '';
  byId('backup-equipment').innerHTML = '<div class="quote-box standalone-line">' +
    quoteLine(hardwareLabel,'—') + equipmentRows +
    '<p class="equipment-note">'+equipmentNote+equipmentLink+'</p></div>' +
    (plan.gear.length ? '' : '<div class="quote-box standalone-line">'+
    quoteLine(key === 'phased' ? 'Inversión total de las dos fases' : model === 'hybrid' ? 'Inversión estimada para ampliar' : 'Inversión inicial estimada',cop(FINAL_PRICES[key].total),'Mano de obra y equipos, según la opción elegida')+'</div>');

  const energy = plan.energy ? sumEquipment('power')*plan.energy : 0;
  const operating = energy + (plan.cloudMain ? (CLOUD.server+CLOUD.storage)*count : 0) + (plan.cloudCopy ? CLOUD.storage*count : 0);
  const maintenance = laborPrice(plan.maintenance*count);
  const energyRows = key === 'phased'
    ? quoteLine('Fase 1 · Energía estimada',cop(energy/2)+'/mes','18 kWh por empresa') +
      quoteLine('Fase 2 · Energía estimada',cop(energy)+'/mes','36 kWh por empresa')
    : energy ? quoteLine('Energía estimada',cop(energy)+'/mes',decimal.format(36*plan.energy)+' kWh por empresa') : '';
  const cloudRows = (plan.cloudMain ? quoteLine('Servidor Nextcloud',cop(CLOUD.server*count)+'/mes','Servicio de archivos y accesos') +
    quoteLine('Archivos de trabajo',cop(CLOUD.storage*count)+'/mes','1 TB por empresa') : '') +
    (plan.cloudCopy ? quoteLine('Copia en la nube',cop(CLOUD.storage*count)+'/mes','1 TB por empresa · tarifa ficticia') : '');
  const monthlyTitle = key === 'upgradePhysical' ? 'Gastos al añadir la nube' : 'Gastos mensuales estimados';
  byId('monthly-title').textContent = monthlyTitle;
  byId('backup-monthly').innerHTML = energyRows+cloudRows+
    quoteLine('Mantenimiento opcional',cop(maintenance)+'/mes',decimal.format(plan.maintenance)+' h por empresa')+
    (key === 'upgradePhysical'
      ? quoteLine('Costo adicional de nube',cop(operating)+'/mes','La energía de los NAS existentes se mantiene. El plan opcional híbrido sustituye al anterior.')
      : key === 'phased'
        ? quoteLine('Fase 1 · Total con mantenimiento',cop(energy/2+maintenance)+'/mes')+
          quoteLine('Fase 2 · Total con mantenimiento',cop(energy+maintenance)+'/mes')
        : quoteLine('Total con mantenimiento',cop(operating+maintenance)+'/mes'));
  const notes = [];
  if (plan.cloudCopy) notes.push('Los cargos mensuales de nube son datos ficticios para la demostración.');
  if (energy) notes.push('Energía calculada con una tarifa ficticia y un consumo de ejemplo de 25 W por NAS con UPS.');
  byId('consumo-nube').textContent = notes.join(' ');
  const prerequisite = byId('backup-prerequisite');
  prerequisite.hidden = model !== 'hybrid';
  prerequisite.textContent = key === 'upgradePhysical'
    ? 'El pago cubre añadir la copia en nube a los NAS existentes. Si tiene un NAS y quiere incorporar el segundo, puede consultar la fase 2 del montaje físico.'
    : 'El pago cubre añadir los NAS a un servicio Nextcloud ya instalado. El mantenimiento híbrido opcional sustituye al anterior.';
}

function render() {
  const count = selectedCompanies().length;
  const scope = company === 'both' ? 'Quimel + Sautec · dos empresas' : DATA[company].scope;
  document.querySelectorAll('.scope-label').forEach(el => {el.textContent=scope;});
  document.querySelectorAll('[data-company]').forEach(button => {
    const active=button.dataset.company===company;
    button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  const prices = {
    'm365-install':cop(FINAL_PRICES.m365.total),
    'm365-net':cop(FINAL_PRICES.m365.net)
  };
  document.querySelectorAll('[data-price]').forEach(el => {el.textContent=prices[el.dataset.price];});
  document.querySelectorAll('[data-hours]').forEach(el => {
    const key=el.dataset.hours;
    el.innerHTML=taskRows(key,key === 'm365' ? 1 : count);
  });
  document.querySelectorAll('[data-total-hours]').forEach(el => {
    const key=el.dataset.totalHours;
    el.textContent=hours(hourTotal(key)*(key === 'm365' ? 1 : count))+' estimadas';
  });
  renderBackup();
  byId('price-announcement').textContent='Valores actualizados para '+scope+'.';
}

document.querySelectorAll('[data-company]').forEach(button => button.addEventListener('click',() => {
  company=button.dataset.company;
  render();
}));
document.querySelectorAll('[data-model]').forEach(button => button.addEventListener('click',() => {
  model=button.dataset.model;
  byId('backup-labor').open=false;
  renderBackup();
}));
document.querySelectorAll('[data-plan]').forEach(button => button.addEventListener('click',() => {
  if (model === 'physical') physicalPlan=button.dataset.plan;
  if (model === 'hybrid') hybridPlan=button.dataset.plan;
  byId('backup-labor').open=false;
  renderBackup();
}));
byId('print-button').addEventListener('click',() => window.print());
let printDetails=[];
window.addEventListener('beforeprint',()=>{printDetails=[...document.querySelectorAll('details')].filter(el=>!el.open && !el.closest('[hidden]'));printDetails.forEach(el=>{el.open=true;});});
window.addEventListener('afterprint',()=>{printDetails.forEach(el=>{el.open=false;});printDetails=[];});
render();

const QUOTATIONS = {
 '365':{id:'trabajo-365',title:'Microsoft 365 · Quimel',kicker:'TRABAJO 1 · COTIZACIÓN DE EJEMPLO'},
 copias:{id:'trabajo-copias',title:'Información sensible y copias de administradores',kicker:'TRABAJO 2 · FÍSICO, NUBE O HÍBRIDO'},
 seguridad:{id:'trabajo-seguridad',title:'Seguridad de equipos y Wi-Fi',kicker:'TRABAJO 3 · COTIZACIÓN DE EJEMPLO'}
};
function showQuotation(key){
 const chosen=key?QUOTATIONS[key]:null;
 document.querySelectorAll('[data-quote]').forEach(section=>{section.hidden=section.dataset.quote!==key;});
 document.getElementById('inicio').hidden=!!chosen;
 document.getElementById('project-scope').hidden=!chosen||key==='365';
  document.getElementById('footer-scope').textContent=key==='365'?'Quimel':'Quimel / Sautec';
 document.getElementById('selected-quote-bar').hidden=!chosen;
 document.getElementById('quote-closing').hidden=!chosen;
 document.querySelectorAll('.nav-row nav a').forEach(link=>{
  if(chosen&&link.getAttribute('href')==='#'+chosen.id)link.setAttribute('aria-current','page');
  else link.removeAttribute('aria-current');
 });
 if(chosen){
  document.getElementById('selected-closing-title').textContent=chosen.title;
  document.getElementById('price-announcement').textContent='Mostrando únicamente la cotización de '+chosen.title+'.';
 }else document.getElementById('price-announcement').textContent='Seleccione una de las tres cotizaciones.';
}
function quotationForTarget(target){return target?.closest('[data-quote]')?.dataset.quote||null;}
function quoteFromHash(){
 let hash;try{hash=decodeURIComponent(location.hash.slice(1));}catch{hash='';}
 if(hash==='contenido')return;
 const legacy = {'desglose-nube':'consumo-nube','nota-precio-tb':'consumo-nube','nota-energia':'mensualidad'};
 const target=document.getElementById(legacy[hash] || hash);
 if (target?.dataset.plan) {
  if (target.closest('#physical-choices')) {
   model='physical';
   physicalPlan=target.dataset.plan;
  } else {
   model='hybrid';
   hybridPlan=target.dataset.plan;
  }
 } else if (['consumo-nube','desglose-nube','nota-precio-tb'].includes(hash)) {
  model='cloud';
 } else if (!model && ['inversion','mensualidad','desglose-instalacion','nota-energia','ampliacion'].includes(hash)) {
  model=hash === 'ampliacion' ? 'hybrid' : 'physical';
 }
 showQuotation(quotationForTarget(target));
 renderBackup();
 if (target?.matches('details')) target.open=true;
}
document.addEventListener('click',event=>{
 const link=event.target.closest('a[href^="#"]');if(!link)return;
 const hash=link.getAttribute('href').slice(1);
 const target=document.getElementById(hash);
 if(!target)return;
 if(hash==='inicio'){
  event.preventDefault();
  showQuotation(null);
  if(location.hash!=='#inicio')history.pushState(null,'','#inicio');
  const title=byId('inicio').querySelector('h1');
  title.focus({preventScroll:true});
  byId('inicio').scrollIntoView({block:'start'});
  return;
 }
 const key=quotationForTarget(target);
 if(!key)return;
 showQuotation(key);
 if(Object.values(QUOTATIONS).some(quote=>quote.id===hash)){
  event.preventDefault();
  if(location.hash!=='#'+hash)history.pushState(null,'','#'+hash);
  target.querySelector('h1').focus({preventScroll:true});
  byId('selected-quote-bar').scrollIntoView({block:'start'});
 }
});
window.addEventListener('hashchange',quoteFromHash);
window.addEventListener('popstate',quoteFromHash);
quoteFromHash();
