const products = [
  {
    id: "aparador-uspallata",
    nombre: "Aparador Uspallata",
    descripcion:
      "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Silueta minimalista que realza el veteado natural.",
    medidas: "180 × 45 × 75 cm",
    materiales: "Nogal macizo FSC®, herrajes de latón",
    acabado: "Aceite natural ecológico",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Aparador-Uspallata_dfhflc.webp",
    precio: 250000,
  },
  {
    id: "biblioteca-recoleta",
    nombre: "Biblioteca Recoleta",
    descripcion:
      "Sistema modular de estantes con estructura de acero Sage Green y repisas en roble claro. Versátil y elegante.",
    medidas: "100 × 35 × 200 cm",
    materiales: "Estructura de acero, estantes de roble",
    acabado: "Laca mate ecológica",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Biblioteca-Recoleta_x35rem.webp",
    precio: 180000,
  },
  {
    id: "butaca-mendoza",
    nombre: "Butaca Mendoza",
    descripcion:
      "Butaca tapizada en bouclé Dusty Rose con base de guatambú. Diseño curvo para máximo confort.",
    medidas: "80 × 75 × 85 cm",
    materiales: "Guatambú macizo, tela bouclé",
    acabado: "Cera vegetal, tapizado premium",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719073/Butaca-Mendoza_clvyfp.webp",
    precio: 145000,
  },
  {
    id: "sillon-copacabana",
    nombre: "Sillón Copacabana",
    descripcion:
      "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en los 60.",
    medidas: "90 × 85 × 95 cm",
    materiales: "Cuero curtido vegetal, acero pintado",
    acabado: "Cuero anilina premium",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Sillon-Copacabana_djutki.webp",
    precio: 320000,
  },
  {
    id: "mesa-centro-araucaria",
    nombre: "Mesa de Centro Araucaria",
    descripcion:
      "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en nogal. Combina la frialdad del mármol con la calidez de la madera.",
    medidas: "90 × 90 × 45 cm",
    materiales: "Sobre de mármol Patagonia, patas de nogal",
    acabado: "Mármol pulido, aceite natural en madera",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Mesa-de-Centro-Araucaria_lkcbhv.webp",
    precio: 210000,
  },
  {
    id: "mesa-noche-aconcagua",
    nombre: "Mesa de Noche Aconcagua",
    descripcion:
      "Mesa de noche con cajón oculto y repisa inferior en roble FSC®. Diseño limpio y funcional.",
    medidas: "45 × 35 × 60 cm",
    materiales: "Roble macizo FSC®, herrajes soft-close",
    acabado: "Barniz mate de poliuretano",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719073/Mesa-de-Noche-Aconcagua_bvspom.webp",
    precio: 95000,
  },
  {
    id: "cama-neuquen",
    nombre: "Cama Neuquén",
    descripcion:
      "Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza.",
    medidas: "160 × 200 × 90 cm",
    materiales: "Roble macizo FSC®, tapizado lino",
    acabado: "Aceite natural, tapizado premium",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719073/Cama-Neuquen_slqhm7.webp",
    precio: 340000,
  },
  {
    id: "sofa-patagonia",
    nombre: "Sofá Patagonia",
    descripcion:
      "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera.",
    medidas: "220 × 90 × 80 cm",
    materiales: "Madera de eucalipto FSC®, lino 100% natural",
    acabado: "Tapizado premium",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Sofa-Patagonia_chufhd.webp",
    precio: 280000,
  },
  {
    id: "mesa-comedor-pampa",
    nombre: "Mesa Comedor Pampa",
    descripcion:
      "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave.",
    medidas: "160-240 × 90 × 75 cm",
    materiales: "Roble macizo FSC®, mecanismo alemán",
    acabado: "Aceite-cera natural",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Mesa-Comedor-Pampa_wexgb4.webp",
    precio: 310000,
  },
  {
    id: "sillas-cordoba",
    nombre: "Sillas Córdoba",
    descripcion:
      "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular Sage Green.",
    medidas: "45 × 52 × 80 cm (cada una)",
    materiales: "Contrachapado nogal, tubo de acero",
    acabado: "Laca mate, pintura epoxi",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Sillas-Cordoba_wzpkxb.webp",
    precio: 120000,
  },
  {
    id: "escritorio-costa",
    nombre: "Escritorio Costa",
    descripcion:
      "Escritorio compacto con cajón organizado y tapa pasacables en bambú laminado.",
    medidas: "120 × 60 × 75 cm",
    materiales: "Bambú laminado, herrajes ocultos",
    acabado: "Laca mate resistente",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719074/Escritorio-Costa_mcgk8u.webp",
    precio: 150000,
  },
  {
    id: "silla-trabajo-belgrano",
    nombre: "Silla de Trabajo Belgrano",
    descripcion:
      "Silla ergonómica regulable con respaldo de malla y asiento en tejido reciclado.",
    medidas: "60 × 60 × 90-100 cm",
    materiales: "Malla técnica, tejido reciclado",
    acabado: "Base cromada, tapizado premium",
    imagen:
      "https://res.cloudinary.com/doh6efk57/image/upload/v1759719073/Silla-de-Trabajo-Belgrano_onrlfa.webp",
    precio: 110000,
  },
];

module.exports = products;
