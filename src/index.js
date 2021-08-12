import express from 'express';
import path from 'path';
import routerProductos from './router/api.js';
import handlebars from 'express-handlebars';


/** INICIALIZACION API con EXPRESS */
const app = express();
const puerto = 8080;
const __dirname = path.resolve();
const publicFolderPath = path.resolve(__dirname, '../Clase8/public');
app.use(express.static(publicFolderPath));

const layoutFolderPath = path.resolve(__dirname, '../Clase8/views/layout');
const partialFolderPath = path.resolve(__dirname, '../Clase8/views/partials');
const defaultLayerPth = path.resolve(__dirname, '../Clase8/views/main.hbs');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
  })
);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);

// Endpoint GET de la pagina principal de la API
app.get('/api/', (req, res) => {
	res.render('main', { layout: 'index' });
});


const server = app.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);

server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});