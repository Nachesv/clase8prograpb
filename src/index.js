import express from 'express';
import routerApi from './routes/api.js';



const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puertoo', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});


const layoutDirPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');

const partialDirPath = path.resolve(__dirname, '../views/partials');
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    extname: 'hbs',
    defaultLayout: defaultLayerPth,
    partialsDir: partialDirPath,
  })
);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerApi);

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

const dinamicData = {
  nombre: 'Franco',
  apellido: 'Soldano',
  mostrarLista: false,
  listaSuper: ['mate', 'cafe', 'harina', 'palmitos'],
  listaObjetos: [
    {
      name: 'yerba',
      style: 'toplaner',
    },
    {
      name: 'mermelada',
      style: 'midlaner',
    },
    {
      name: 'cacao',
      style: 'toplaner',
    },
    {
      name: 'picadillo',
      style: 'midlaner',
    },
  ],
};

app.get('/', (req, res) => {
  res.render('main', dinamicData);
});




/**************************************** */
// app.get('/app/productos/listar', (req, res) => {
//     /**Opcionalmente podemos agregar queryes para hacer busquedas distintas y no traer todo*/
//     const filtroPrecio = req.query.price;
//     let data;
  
//     console.log(filtroPrecio);
  
//     if (filtroPrecio)
//       data = productos.filter(
//         (aProduct) => aProduct.precio >= Number(filtroPrecio)
//       );
//     else data = productos;
  
//     res.json({
//       data,
//     });
//   });

//   app.get('/app/productos/:id', (req, res) => {
//     /**Opcionalmente podemos agregar queryes para hacer busquedas distintas y no traer todo*/
//     const filtroId = req.query.id;
//     let data;
  
//     console.log(filtroPrecio);
  
//     if (filtroPrecio)
//       data = productos.filter(
//         (aProduct) => aProduct.id = Number(filtroPrecio)
//       );
//     else data = productos;
  
//     res.json({
//       data,
//     });
//   });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.post('/api/productos/guardar/', (req, res) => {
//   const body = req.body;
//   console.log(body);

//   /** Valido que la info que me mandaron este OK, sino respondo con 400 */
//   if (
//     !body.nombre ||
//     !body.precio ||
//     typeof body.nombre != 'string' ||
//     typeof body.precio != 'number'
//   ) {
//     return res.status(400).json({
//       msg: 'Necesito en el body el nombre (string) y el precio (number)',
//     });
//   }

//   const nuevoProducto = {
//     id: productos.length + 1,
//     nombre: body.nombre,
//     precio: body.precio,
//   };

//   productos.push(nuevoProducto);

//   /**Estado 201: Objeto creado correctamente */
//   res.status(201).json({
//     data: nuevoProducto,
//   });
// });