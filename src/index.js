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

