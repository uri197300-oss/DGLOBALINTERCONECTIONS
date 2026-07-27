import { Product, Order, Review, ActivityLog, NotificationAlert, UserPermissions, RegisteredUser, PromoCampaign } from '../types';
import bannerPulpaImg from '../assets/images/banner_pulpa_aloe_1785081969530.jpg';
import bannerJugoImg from '../assets/images/banner_jugo_aloe_1785081987333.jpg';

export const ADMIN_EMAIL = 'uri197300@gmail.com';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: '100% Pulpa Natural de Aloe Vera Orgánica (750g)',
    price: 155,
    originalPrice: 180,
    rating: 4.9,
    reviewsCount: 142,
    category: 'aloe_organica',
    image: bannerPulpaImg,
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 85,
    benefits: [
      'Sin Aloína (Libre de irritantes y cólicos)',
      '100% Orgánica, comestible y untable',
      'Sin azúcar añadida',
      'Rica en Vitamina A, Complejo B, C y E',
      'Restaura la mucosa gastrointestinal',
      'Certificación Kosher Pareve'
    ],
    isKosher: true,
    isAloineFree: true,
    featured: true,
    isSpecialOffer: true,
    badges: ['Más Vendido', 'Sin Aloína', 'Kosher'],
    description: 'La carnita pura de la sábila 100% natural y orgánica. Extraída cuidadosamente para conservar todas las propiedades bioactivas de la planta fresca sin azúcar ni aloína. Ideal para consumir en ayunas con frutas, licuados o aplicar en la piel.',
    specifications: {
      'Contenido Neto': '750 gramos',
      'Presentación': 'Frasco con tapa hermética',
      'Ingredientes': 'Pulpa de Aloe Vera Barbadensis Miller 100% estabilizada',
      'Sin Aloína': 'Garantizado (< 0.001%)',
      'Sabor': 'Natural',
      'Certificación': 'Kosher KA (Pareve)'
    },
    priceDropHistory: [
      { date: '2026-07-01', price: 180 },
      { date: '2026-07-15', price: 165 },
      { date: '2026-07-26', price: 155 }
    ]
  },
  {
    id: 'prod-2',
    title: 'Jugo (Pulpa) De Aloe Vera 1Lt - 100% Natural Certificado',
    price: 145,
    originalPrice: 165,
    rating: 4.8,
    reviewsCount: 98,
    category: 'jugos_bebidas',
    image: bannerJugoImg,
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 120,
    benefits: [
      'Sin Azúcar Añadida (Ideal para índice glucémico)',
      'Sin Gluten (Apto para celíacos)',
      'Sin Sodio (Mantiene la presión arterial)',
      'Nutrición directa que viene de la tierra',
      'Aporta energía limpia con Complejo B',
      'Digestión sana diaria'
    ],
    isKosher: true,
    isAloineFree: true,
    featured: true,
    isSpecialOffer: false,
    badges: ['Orgánico', '1 Litro', 'Sin Gluten'],
    description: 'El mejor aliado diario para tu bienestar gastrointestinal. Jugo de Aloe Vera extraído con máxima pureza para consumo diario. Tómalo frío antes del desayuno para revitalizar tu sistema digestivo.',
    specifications: {
      'Contenido Neto': '1 Litro (1000 ml)',
      'Envase': 'Botella ergonómica PET libre de BPA',
      'Caducidad': '12 meses a temperatura ambiente',
      'Certificaciones': '100% Natural Certificado'
    }
  },
  {
    id: 'prod-3',
    title: 'Pulpa de Sábila Aloe Vera En Sobres Para Viaje (Caja 20 Sobres de 60g)',
    price: 150,
    originalPrice: 220,
    rating: 5.0,
    reviewsCount: 210,
    category: 'sobres_viaje',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 60,
    benefits: [
      '20 sobres individuales de 60g de fácil transporte',
      'Delicioso Sabor Mora Natural',
      'Efectivo Antiácido Natural para colitis, gastritis y reflujo',
      'No requiere refrigeración',
      'Llévalo a donde quieras: oficina, viajes y vacaciones',
      'Certificación Kosher Pareve'
    ],
    isKosher: true,
    isAloineFree: true,
    featured: true,
    isSpecialOffer: true,
    badges: ['Oferta Especial', 'Para Viaje', 'Sabor Mora'],
    description: '¡Tus sobres de pulpa de Aloe Vera listos para viajar! Protección estomacal instantánea contra gastritis y acidez sin importar a dónde vayas. Cada caja contiene 20 sobres individuales con sabor mora.',
    specifications: {
      'Contenido': 'Caja con 20 sobres de 60 g c/u (1.2 kg total)',
      'Sabor': 'Mora Silvestre',
      'Refrigeración': 'No requerida',
      'Uso recomendado': '1 a 2 sobres diarios antes o después de los alimentos'
    },
    priceDropHistory: [
      { date: '2026-07-10', price: 220 },
      { date: '2026-07-20', price: 180 },
      { date: '2026-07-26', price: 150 }
    ]
  },
  {
    id: 'prod-4',
    title: 'Gel Facial y Corporal de Aloe Vera Pure Regenerador (250ml)',
    price: 180,
    originalPrice: 210,
    rating: 4.7,
    reviewsCount: 64,
    category: 'belleza_cuidado',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 40,
    benefits: [
      'Alivio inmediato post-solar e irritaciones',
      'Hidratación profunda sin dejar sensación grasosa',
      'Regenerador celular de cicatrices y acné',
      'Efecto refrescante e hipoalergénico'
    ],
    isKosher: false,
    isAloineFree: true,
    featured: false,
    isSpecialOffer: false,
    badges: ['Piel Sensible', 'Regenerador'],
    description: 'Gel dermatológico puro de Aloe Vera. Calma irritaciones, quemaduras solares, rojeces e picaduras. Formulado para absorberse en segundos.',
    specifications: {
      'Volumen': '250 ml',
      'Tipo de Piel': 'Todo tipo de piel, en especial sensibles',
      'Textura': 'Gel ligero no comedogénico'
    }
  },
  {
    id: 'prod-5',
    title: 'Crema Anti-Edad de Aloe Vera con Colágeno & Elastina (100g)',
    price: 210,
    originalPrice: 250,
    rating: 4.9,
    reviewsCount: 88,
    category: 'belleza_cuidado',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 55,
    benefits: [
      'Nutrición intensa para rostro, cuello y escote',
      'Estimula la firmeza con Colágeno y Elastina marina',
      'Reduce líneas de expresión y sequedad',
      'Sabor y aroma suave a manzanilla'
    ],
    isKosher: false,
    isAloineFree: true,
    featured: false,
    isSpecialOffer: true,
    badges: ['Anti-Edad', 'Colágeno'],
    description: 'Crema facial enriquecida con gel de aloe vera concentrado, péptidos de colágeno y vitamina E. Protege contra el estrés oxidativo diario.',
    specifications: {
      'Peso Neto': '100 gramos',
      'Uso': 'Día y Noche'
    }
  },
  {
    id: 'prod-6',
    title: 'Shampoo Natural de Aloe Vera & Sangre de Drago (500ml)',
    price: 175,
    originalPrice: 195,
    rating: 4.8,
    reviewsCount: 52,
    category: 'belleza_cuidado',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 70,
    benefits: [
      'Fortalece la raíz y detiene la caída del cabello',
      'Elimina caspa y limpia el cuero cabelludo',
      'Aporta brillo natural y volumen',
      'Libre de sal y parabenos'
    ],
    isKosher: false,
    isAloineFree: true,
    featured: false,
    isSpecialOffer: false,
    badges: ['Anti-Caída', '500ml'],
    description: 'Fórmula artesanal botánica que combina las propiedades nutritivas del aloe vera con el poder astringente de la sangre de drago.',
    specifications: {
      'Contenido': '500 ml',
      'Sin Parabenos': 'Sí'
    }
  },
  {
    id: 'prod-7',
    title: 'Audífonos Gamer Estéreo HD Pro - Mundo Sábila & Electrónicos',
    price: 349,
    originalPrice: 450,
    rating: 4.6,
    reviewsCount: 39,
    category: 'electronicos',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 30,
    benefits: [
      'Sonido Envolvente HD con cancelación activa de ruido',
      'Micrófono omnidireccional con brazo flexible',
      'Almohadillas ergonómicas de piel sintética suave',
      'Compatibilidad universal con PC, Consolas y Smartphones'
    ],
    isKosher: false,
    isAloineFree: false,
    featured: true,
    isSpecialOffer: true,
    badges: ['Electrónicos', 'Gamer HD', 'Envío Gratis'],
    description: 'Audífonos gamer con sonido envolvente estéreo de la línea de electrónicos de Mundo Sábila. Micrófono integrado para llamadas claras y atención al cliente.',
    specifications: {
      'Conexión': '3.5mm + Adaptador USB',
      'Longitud de cable': '2 metros',
      'Iluminación': 'LED ambiental'
    }
  },
  {
    id: 'prod-8',
    title: 'Báscula Digital de Precisión para Envíos y Cocina',
    price: 289,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 77,
    category: 'electronicos',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800',
    mercadoLibreUrl: 'https://listado.mercadolibre.com.mx/_CustId_685476429?item_id=MLM5555376688',
    stock: 45,
    benefits: [
      'Precisión exacta de 1 gramo hasta 10 kg',
      'Función de tara automática',
      'Pantalla LCD retroiluminada de alta visibilidad',
      'Ideal para fraccionar pulpa de sábila o pesar paquetes de Mercado Libre'
    ],
    isKosher: false,
    isAloineFree: false,
    featured: false,
    isSpecialOffer: false,
    badges: ['Precisión 1g', 'Mercado Envíos'],
    description: 'Báscula digital de alta precisión para medir porciones exactas de alimentos y pesar envíos postales con exactitud.',
    specifications: {
      'Capacidad máxima': '10 kg',
      'Precisión': '1 g / 0.1 oz',
      'Baterías': 'Incluye 2x AAA'
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-8801',
    customerName: 'Carlos Mendoza',
    customerEmail: 'carlos.mendoza@gmail.com',
    date: '2026-07-26 07:15 AM',
    total: 305,
    status: 'en_preparacion',
    items: [
      {
        productId: 'prod-1',
        title: '100% Pulpa Natural de Aloe Vera Orgánica (750g)',
        price: 155,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
      },
      {
        productId: 'prod-3',
        title: 'Pulpa de Sábila Aloe Vera En Sobres Para Viaje (Caja 20 Sobres)',
        price: 150,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
      }
    ],
    paymentMethod: 'mercado_pago',
    trackingNumber: 'MLMX-9821384029',
    shippingAddress: {
      street: 'Av. Insurgentes Sur 1425, Col. Insurgentes Mixcoac',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '03920',
      phone: '2211790522'
    },
    encryptedSignature: 'SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'ORD-2026-8799',
    customerName: 'María Fernanda Ríos',
    customerEmail: 'mafer.rios@outlook.com',
    date: '2026-07-25 04:30 PM',
    total: 290,
    status: 'enviado',
    items: [
      {
        productId: 'prod-2',
        title: 'Jugo (Pulpa) De Aloe Vera 1Lt - 100% Natural Certificado',
        price: 145,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      }
    ],
    paymentMethod: 'tarjeta',
    trackingNumber: 'MLMX-7731920391',
    shippingAddress: {
      street: 'Calle Benito Juárez 45, San Pedro Garza García',
      city: 'Monterrey',
      state: 'Nuevo León',
      zipCode: '66220',
      phone: '8182736451'
    },
    encryptedSignature: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
  },
  {
    id: 'ORD-2026-8790',
    customerName: 'Roberto Garza',
    customerEmail: 'r.garza@empresa.com',
    date: '2026-07-24 11:10 AM',
    total: 349,
    status: 'entregado',
    items: [
      {
        productId: 'prod-7',
        title: 'Audífonos Gamer Estéreo HD Pro - Mundo Sábila & Electrónicos',
        price: 349,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
      }
    ],
    paymentMethod: 'paypal',
    trackingNumber: 'MLMX-5510293847',
    shippingAddress: {
      street: 'Calle 60 #302 x 35 y 37, Centro',
      city: 'Mérida',
      state: 'Yucatán',
      zipCode: '97000',
      phone: '9998273615'
    },
    encryptedSignature: 'SHA256:6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Dra. Patricia Alarcón',
    userEmail: 'patricia.a@salud.org',
    rating: 5,
    title: 'Excelente digestión sin ningún tipo de cólico',
    comment: 'Llevo tomándola en ayunas disuelta con manzana verde por 3 semanas. La diferencia es notable, mi colitis mejoró casi al 100%. Me encanta que realmente esté certificada sin aloína.',
    date: '2026-07-20',
    verifiedBuyer: true,
    helpfulCount: 24,
    ratingBreakdown: {
      eficiencia: 5,
      calidad: 5,
      empaque: 5
    }
  },
  {
    id: 'rev-2',
    productId: 'prod-3',
    userName: 'Ing. Fernando Ortiz',
    userEmail: 'fortiz@viajes.com',
    rating: 5,
    title: 'Los sobres de viaje son una maravilla',
    comment: 'Viajo mucho por carretera y suelo sufrir reflujo por comer fuera. Traer esta caja con sobres individuales sabor mora en la mochila me ha salvado la vida. Súper práctico.',
    date: '2026-07-22',
    verifiedBuyer: true,
    helpfulCount: 18,
    ratingBreakdown: {
      eficiencia: 5,
      calidad: 5,
      empaque: 5
    }
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    userName: 'Lorena Sánchez',
    userEmail: 'lore.sanchez@gmail.com',
    rating: 5,
    title: 'Sabor fresco y natural',
    comment: 'Llegó rapidísimo por Mercado Envíos en empaque térmico con sello Kosher. Excelente producto para toda la familia.',
    date: '2026-07-18',
    verifiedBuyer: true,
    helpfulCount: 12,
    ratingBreakdown: {
      eficiencia: 5,
      calidad: 5,
      empaque: 4
    }
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-07-26 08:35:12',
    userEmail: 'uri197300@gmail.com',
    action: 'INICIO_SESION_ADMIN',
    ipAddress: '189.203.45.12 (Autenticado SSL 256-bit)',
    details: 'Acceso concedido con permisos globales de Administrador Principal para uri197300@gmail.com',
    category: 'security'
  },
  {
    id: 'log-2',
    timestamp: '2026-07-26 08:30:00',
    userEmail: 'uri197300@gmail.com',
    action: 'OFERTA_ACTUALIZADA',
    ipAddress: '189.203.45.12',
    details: 'Ajuste de precio en Sobres de Viaje (Caja 20 sobres) de $220 a $150 MXN (Descuento 31%)',
    category: 'inventory'
  },
  {
    id: 'log-3',
    timestamp: '2026-07-26 07:16:04',
    userEmail: 'sistema@mundosabila.com',
    action: 'PEDIDO_RECIBIDO',
    ipAddress: '10.0.4.88',
    details: 'Pedido #ORD-2026-8801 generado mediante Mercado Pago seguro. Total: $305.00 MXN',
    category: 'order'
  },
  {
    id: 'log-4',
    timestamp: '2026-07-25 16:32:00',
    userEmail: 'uri197300@gmail.com',
    action: 'ESTADO_PEDIDO_ACTUALIZADO',
    ipAddress: '189.203.45.12',
    details: 'Pedido #ORD-2026-8799 actualizado a estado "ENVIADO" con guía Mercado Envíos MLMX-7731920391',
    category: 'order'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationAlert[] = [
  {
    id: 'notif-1',
    type: 'price_drop',
    title: '¡Bajada de Precio Crítica!',
    message: 'La Caja de 20 Sobres de Pulpa de Aloe para Viaje bajó de $220 a solo $150 MXN. ¡Aprovecha el 31% de descuento!',
    timestamp: 'Hace 10 min',
    read: false,
    productId: 'prod-3',
    discountPercentage: 31
  },
  {
    id: 'notif-2',
    type: 'exclusive_promo',
    title: 'Promoción Mercado Pago',
    message: 'Obtén Envío Gratis a toda la República en tus compras con Mercado Pago usando el cupón MUNDOSABILA2026.',
    timestamp: 'Hace 1 hora',
    read: false
  },
  {
    id: 'notif-3',
    type: 'system_alert',
    title: 'Sello de Compra Protegida',
    message: 'Todas las transacciones en esta plataforma cuentan con cifrado SSL de extremo a extremo y garantía de devolución Mercado Libre.',
    timestamp: 'Hace 3 horas',
    read: true
  }
];

export const DEFAULT_ADMIN_USER: UserPermissions = {
  email: ADMIN_EMAIL,
  name: 'URIEL DONAJI LOPEZ RAZO',
  role: 'super_admin',
  isUriAdmin: true,
  permissions: {
    manageInventory: true,
    processOrders: true,
    viewAnalytics: true,
    viewLogs: true,
    manageUsers: true
  }
};

export const INITIAL_REGISTERED_USERS: RegisteredUser[] = [
  {
    id: 'user-1',
    name: 'URIEL DONAJI LOPEZ RAZO',
    email: ADMIN_EMAIL,
    phone: '2211790522',
    role: 'admin',
    receivePromotions: true,
    registeredAt: '2026-01-10 10:00:00',
    totalOrdersCount: 0
  }
];

export const INITIAL_CAMPAIGNS: PromoCampaign[] = [
  {
    id: 'camp-1',
    title: 'Promoción Especial Pulpa 750g Kosher',
    subject: '🌿 ¡Descubre los beneficios de la Pulpa de Sábila 100% Orgánica!',
    message: 'Estimado cliente, aprovecha un 10% de descuento adicional en tu compra de Pulpa Orgánica 750g con envío a toda la República. Código de Cupón: SABILA10',
    couponCode: 'SABILA10',
    discountPercentage: 10,
    sentAt: '2026-07-20 10:30',
    recipientsCount: 4
  }
];

