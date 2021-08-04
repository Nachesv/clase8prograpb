import express from 'express';

let productos = [
    {
      id: 1,
      nombre: 'Escuadra',
      precio: 200,
    },
    {
      id: 2,
      nombre: 'Transportador',
      precio: 50,
    },
  ];

const app = express();
const puerto = 8080;
const server = app.listen(puerto, () =>
  console.log('Server up en puertoo', puerto)
);

app.get('/app/productos/listar', (req, res) => {
    /**Opcionalmente podemos agregar queryes para hacer busquedas distintas y no traer todo*/
    const filtroPrecio = req.query.price;
    let data;
  
    console.log(filtroPrecio);
  
    if (filtroPrecio)
      data = productos.filter(
        (aProduct) => aProduct.precio >= Number(filtroPrecio)
      );
    else data = productos;
  
    res.json({
      data,
    });
  });

  app.get('/app/productos/:id', (req, res) => {
    /**Opcionalmente podemos agregar queryes para hacer busquedas distintas y no traer todo*/
    const filtroId = req.query.id;
    let data;
  
    console.log(filtroPrecio);
  
    if (filtroPrecio)
      data = productos.filter(
        (aProduct) => aProduct.id = Number(filtroPrecio)
      );
    else data = productos;
  
    res.json({
      data,
    });
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/api/productos/guardar/', (req, res) => {
  const body = req.body;
  console.log(body);

  /** Valido que la info que me mandaron este OK, sino respondo con 400 */
  if (
    !body.nombre ||
    !body.precio ||
    typeof body.nombre != 'string' ||
    typeof body.precio != 'number'
  ) {
    return res.status(400).json({
      msg: 'Necesito en el body el nombre (string) y el precio (number)',
    });
  }

  const nuevoProducto = {
    id: productos.length + 1,
    nombre: body.nombre,
    precio: body.precio,
  };

  productos.push(nuevoProducto);

  /**Estado 201: Objeto creado correctamente */
  res.status(201).json({
    data: nuevoProducto,
  });
});