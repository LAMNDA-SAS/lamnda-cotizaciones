'use strict';

// Datos ficticios para poder probar la cotización sin información de clientes.
const EQUIPMENT_CATALOG = {
  nas: {
    name:'NAS de 2 bahías', unit:1100000, icon:'nas', importPending:true,
    function:'Equipo principal o de respaldo en otra ubicación.',
    spec:'Sin discos · 2 bahías SATA',
    market:'Tienda de ejemplo', seller:'Proveedor ficticio A',
    url:'https://example.com/',
    shipping:'Envío e importación según el vendedor.',
    warranty:'Condiciones de ejemplo.'
  },
  disks: {
    4: {
      name:'Disco interno SATA para NAS · 4 TB', unit:260000, icon:'disk',
      function:'Dos discos por NAS, configurados en espejo.',
      spec:'4 TB por disco · CMR · SATA de 3,5 pulgadas',
      market:'Tienda de ejemplo', seller:'Proveedor ficticio B',
      url:'https://example.com/',
      shipping:'Entrega según dirección.',
      warranty:'Condiciones de ejemplo.'
    },
    8: {
      name:'Disco interno SATA para NAS · 8 TB', unit:390000, icon:'disk', importPending:true,
      function:'Alternativa para mayor capacidad o historial.',
      spec:'8 TB por disco · CMR · SATA de 3,5 pulgadas',
      market:'Tienda de ejemplo', seller:'Proveedor ficticio B',
      url:'https://example.com/',
      shipping:'Envío e importación según el vendedor.',
      warranty:'Condiciones de ejemplo.'
    }
  },
  ups: {
    name:'UPS con comunicación USB', unit:160000, icon:'ups',
    function:'Permite apagar el NAS de forma ordenada durante un corte.',
    spec:'Comunicación USB de datos',
    market:'Tienda de ejemplo', seller:'Proveedor ficticio A',
    url:'https://example.com/',
    shipping:'Entrega según dirección.',
    warranty:'Condiciones de ejemplo.'
  },
  usb: {
    name:'Disco externo USB · 4 TB', unit:210000, icon:'disk',
    function:'Copia rotativa que se guarda desconectada y separada del NAS.',
    spec:'4 TB por disco · USB',
    market:'Tienda de ejemplo', seller:'Proveedor ficticio B',
    url:'https://example.com/',
    shipping:'Entrega según dirección.',
    warranty:'Condiciones de ejemplo.'
  },
  network: [
    {
      name:'Router con firewall', unit:285000, icon:'router',
      function:'Separa las redes de trabajo e invitados.',
      spec:'Ethernet Gigabit',
      market:'Tienda de ejemplo', seller:'Proveedor ficticio C',
      url:'https://example.com/',
      shipping:'Entrega según dirección.',
      warranty:'Condiciones de ejemplo.'
    },
    {
      name:'Punto de acceso Wi-Fi', unit:210000, icon:'wifi',
      function:'Proporciona Wi-Fi para oficina e invitados.',
      spec:'Doble banda · alimentación PoE',
      market:'Tienda de ejemplo', seller:'Proveedor ficticio C',
      url:'https://example.com/',
      shipping:'Entrega según dirección.',
      warranty:'Condiciones de ejemplo.'
    },
    {
      name:'Inyector PoE', unit:35000, icon:'poe',
      function:'Alimenta el punto de acceso por el cable de red.',
      spec:'Ethernet Gigabit',
      market:'Tienda de ejemplo', seller:'Proveedor ficticio C',
      url:'https://example.com/',
      shipping:'Entrega según dirección.',
      warranty:'Condiciones de ejemplo.'
    }
  ]
};

const DEMO_NAS_KIT = EQUIPMENT_CATALOG.nas.unit + 2 * EQUIPMENT_CATALOG.disks[4].unit + EQUIPMENT_CATALOG.ups.unit;
const DEMO_NETWORK_TOTAL = EQUIPMENT_CATALOG.network.reduce((total, item) => total + item.unit, 0);
