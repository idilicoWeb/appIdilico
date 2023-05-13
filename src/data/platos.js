const platos=[
    {
      _id:"Camembert",
      nombre:"Camembert",
      descripcion:"Dados de camembert acompañados de mermelada de fresa y mango habanero.",
      precio:7,
      alergenos:[0]
    },
    {
      _id:"Patatas_pecado",
      nombre:"Patatas pecado",
      descripcion:"Patatas gratinadas al horno con salsa ranchera, mix de quesos y nuestro pulled pork",
      precio:10.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Nachos_idilico",
      nombre:"Nachos Idílico",
      descripcion:"Totopos fritos de maíz, pico de gallo, crema agria, guacamole, cheddar y chili con carne",
      precio:10.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Jalapeños_bites",
      nombre:"Jalapeños bites",
      descripcion:"Bocados de jalapeños rellenos de cheddar",
      precio:7,
      alergenos:[0,1,2]
    },
    {
      _id:"Alitas_habanera",
      nombre:"Alitas habaneras",
      descripcion:"Alitas bañadas en salsa mango habanero",
      precio:10.90,
      alergenos:[0,1,2]
    },
    {
      _id:"Aros_de_cebolla",
      nombre:"Aros de cebolla",
      descripcion:"Nuestros deliciosos aros de cebolla a la cerveza acompañados de salsa BBQ",
      precio:7,
      alergenos:[0,1,2]
    },
    {
      _id:"Eiffel",
      nombre:"Eiffel",
      descripcion:"Mix de lechugas, tomates cherrys, queso de cabra, bacon crispy, nueces y pollo aderezada con nuesta vinagreta de miel y mostaza djons",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Tomatina",
      nombre:"Tomatina",
      descripcion:"Mix de tomates, lascas de queso parmesano, helado de tomate y ventresca aderezada con vinagre de Módena",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Templo",
      nombre:"Templo",
      descripcion:"Mix de lechuga, pollo asado, manzana y frutos secos aderezada con salsa thai",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Vikinga",
      nombre:"Vikinga",
      descripcion:"Mix de lechuga, salmón, aguacate, tomate cherry, tomate seco y queso ibérico, aderezada con vinagreta de mostaza y miel",
      precio:10.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Bacon_crispy",
      nombre:"Bacon crispy",
      descripcion:"Bacon crispy, huevo a la plancha y aguacate, sobre una capa de nuestro delicioso gofre casero",
      precio:7.5,
      alergenos:[0,1,2]
    },
    {
      _id:"Jamon_queso",
      nombre:"Jamón y queso",
      descripcion:"Sándwich de gofre relleno de jamón con queso fundido y huevo a la plancha",
      precio:7,
      alergenos:[0,1,2]
    },
    {
      _id:"Sencillo_delicioso",
      nombre:"Sencillo pero delicioso",
      descripcion:"Migas de queso de cabra, bacon crispy y rucula, con un ligero toque de crema balsámica",
      precio:7,
      alergenos:[0,1,2]
    },
    {
      _id:"Idilico_club",
      nombre:"Idílico Club",
      descripcion:"Tres pisos de pan de patata con pechuga de pollo asado, una cama de jamón cocido, queso gouda y monterrey, cebolla roja, lechuga y tomate, aderezado con nuestra mayonesa de pimiento del piquillo",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Güero",
      nombre:"Güero",
      descripcion:"Tres pisos de pan de patata con pulled pork, queso emmental y cheddar fundido, jamón cocido, mostaza, mayonesa, cebolla y pepinillos",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Nordico",
      nombre:"Nórdico",
      descripcion:"Tres pisos de pan rustico con salmón ahumado noruego, aguacate, tomate, huevo cocido, lechuga, mayonesa y salsa mostaza y miel",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Egg_ribs",
      nombre:"Egg ribs drop",
      descripcion:"Dos lingotes de pan brioche con huevo revuelto, ribs desmenuzada al estilo neoyorkino, tomate, lechuga y salsa cheddar",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Iberica",
      nombre:"Ibérica",
      descripcion:"180g de nuestra ternera Premium, lechuga de Batavía y tomate, sobre una base de queso ibérico y jamón serrano, coronada con huevo a la plancha y mayonesa de pimiento del piquillo",
      precio:11.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Cabrita",
      nombre:"Cabrita",
      descripcion:"180g de nuestra ternera Premium encima de una capa de queso de cabra, canónigos y cebolla caramelizada, nueces y nuestra mayonesa de bacon ahumado",
      precio:11.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Porknera",
      nombre:"Porknera",
      descripcion:"180g de nuestra ternera Premium y pulled pork al estilo sureño, acompañada de queso monterrey, pepinillos y jalapeños, bañada en salsa cheddar",
      precio:11.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Baconera",
      nombre:"Baconera",
      descripcion:"180g de nuestra ternera Premium, sobre una capa de bacon crujiente, queso cheddar, tomate y lechuga, coronoda con huevo a la plancha y mayonesa de bacon",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Crispy",
      nombre:"Crispy",
      descripcion:"Delicioso pollo crispy, acompañado con queso cheddar, lechuga y tomate con salsa BBQ",
      precio:8.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Veggy",
      nombre:"Veggy",
      descripcion:"Burguer de kale y quinoa, queso, tomate, lechuga y cebolla, con salsa a elegir",
      precio:8.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Dakota",
      nombre:"Dakota",
      descripcion:"100g de carne smasheada, queso monterrey gratinado, cebolla crujiente, bacon crujiente y nuestra mayonesa de bacon",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Neoyorkina",
      nombre:"Neoyorkina",
      descripcion:"100g de carne smasheada, dos capas de queso cheddar, tiras de cebolla, bacon crujiente y salsa cheddar",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Luisiana",
      nombre:"Luisiana",
      descripcion:"100g de carne smasheada, costilla ahumada desmenuzada, queso cheddar y salsa BBQ",
      precio:9.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Costillar",
      nombre:"Costillar",
      descripcion:"600g de nuestro jugoso costillar de cerdo a la parrilla bañado en deliciosa salsa bourbon, acompañado de patatas dipper",
      precio:19.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Costillar_BBQ",
      nombre:"Costillar BBQ",
      descripcion:"500g de nuestro delicioso costillar bañado en salsa barbacoa acompañado de aros de cebolla",
      precio:17.9,
      alergenos:[0,1,2]
    },
    {
      _id:"Brocheta",
      nombre:"Brocheta",
      descripcion:"Deliciosa brocheta de pollo especiado acompañada de ensalada de col y patatas",
      precio:15,
      alergenos:[0,1,2]
    },
    {
      _id:"Tarta_queso",
      nombre:"Tarta de queso",
      descripcion:"Con mermelada de arándanos y helado de vainilla",
      precio:5.5,
      alergenos:[]
    },
    {
      _id:"Brownie_chocolate",
      nombre:"Brownie de chocolate",
      descripcion:"Con helado de vainilla y sirope de Kinder",
      precio:5.5,
      alergenos:[]
    },
    {
      _id:"Coca_cola",
      nombre:"Coca cola",
      descripcion:"Original, Zero y Zero Zero",
      precio:2,
      alergenos:[]
    },
    {
      _id:"Fanta",
      nombre:"Fanta",
      descripcion:"Naranja y limón",
      precio:2,
      alergenos:[]
    },
    {
      _id:"Nestea",
      nombre:"Nestea",
      descripcion:"Original y marcuyá",
      precio:2.4,
      alergenos:[]
    },
    {
      _id:"Aquarius",
      nombre:"Aquarius",
      descripcion:"Naranja y limón",
      precio:2.4,
      alergenos:[]
    },
    {
      _id:"Agua",
      nombre:"Agua",
      descripcion:null,
      precio:1.5,
      alergenos:[1]
    },
    {
      _id:"Agua_gas",
      nombre:"Agua con gas",
      descripcion:null,
      precio:2,
      alergenos:[]
    },
    {
      _id:"Zumos",
      nombre:"Zumos",
      descripcion:"Piña, naranja y melocotón",
      precio:2,
      alergenos:[]
    },
    {
      _id:"Copa_cerveza",
      nombre:"Copa de cerveza Victoria",
      descripcion:null,
      precio:2,
      alergenos:[]
    },
    {
      _id:"Pinta_cerveza",
      nombre:"Pinta de cerveza Victoria",
      descripcion:null,
      precio:3,
      alergenos:[]
    },
    {
      _id:"Botella_cerveza",
      nombre:"Botellín de cervezas especiales",
      precio:3,
      alergenos:[]
    },
    {
      _id:"Lagunero",
      nombre:"Lagunero joven",
      descripcion:"Ribera",
      precio:3,
      alergenos:[]
    },
    {
      _id:"Marques_victoria",
      nombre:"Marqués de Victoria",
      descripcion:"Verdejo",
      precio:3,
      alergenos:[]
    },
    {
      _id:"Tu_ante",
      nombre:"Tú ante joven",
      descripcion:"Rioja",
      precio:3,
      alergenos:[]
    },
    {
      _id:"Emparrado",
      nombre:"Emparrado",
      descripcion:"Verdejo",
      precio:3,
      alergenos:[]
    },
    {
      _id:"49000000",
      nombre:"Cuarenta y nueve millones",
      descripcion:"Frisante",
      precio:3,
      alergenos:[]
    },
    {
      _id:"Botella_tinto",
      nombre:"Tinto crianza",
      descripcion:"Botella",
      precio:10,
      alergenos:[]
    },
    {
      _id:"Fresa_platano",
      nombre:"Fresa y plátano",
      descripcion:null,
      precio:4.2,
      alergenos:[]
    },
    {
      _id:"Pina_mango_mara",
      nombre:"Piña, mango y maracuyá",
      descripcion:null,
      precio:3.8,
      alergenos:[]
    },
    {
      _id:"Mango_fresa_agua",
      nombre:"Mango, fresa y aguacate",
      descripcion:null,
      precio:3.8,
      alergenos:[]
    },
    {
      _id:"Batido_pistacho",
      nombre:"Batido de pistacho",
      descripcion:null,
      precio:4.2,
      alergenos:[]
    },
    {
      _id:"Batido_kinder",
      nombre:"Batido de Kinder",
      descripcion:null,
      precio:4.2,
      alergenos:[]
    },
    {
      _id:"Batido_nutella",
      nombre:"Batido de Nutella",
      descripcion:null,
      precio:4.2,
      alergenos:[]
    },
    {
      _id:"Batido_fresa",
      nombre:"Batido de fresa",
      descripcion:null,
      precio:4.2,
      alergenos:[]
    },
    {
      _id:"Cafe",
      nombre:"Café",
      descripcion:null,
      precio:1.5,
      alergenos:[]
    },
    {
      _id:"Cappuccino",
      nombre:"Capuccino",
      descripcion:null,
      precio:2,
      alergenos:[]
    },
    {
      _id:"Cafe_helado",
      nombre:"Café helado",
      descripcion:null,
      precio:2.5,
      alergenos:[]
    },
    {
      _id:"Te_gusto",
      nombre:"Lo preparamos a tu gusto",
      descripcion:"Infusionado con agua, infusionado con agua y terminado con leche e infusionado solo en leche",
      precio:2,
      alergenos:[]
    },
    
]

export default platos;