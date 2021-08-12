import express from 'express';



let productos = [
    {
      id: 1,
      nombre: 'Escuadra',
      precio: 200,
      thumbnail: ''
    },
    {
      id: 2,
      nombre: 'Transportador',
      precio: 50,
      thumbnail: ''
    },
  ];

const router = express.Router();

router.get('/listar', (req, res) => {
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

  router.get('/:id', (req, res) => {
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


router.post('/guardar', (req, res) => {
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
    thumbnail: body.thumbnail
  };

  productos.push(nuevoProducto);

  /**Estado 201: Objeto creado correctamente */
  res.status(201).json({
    data: nuevoProducto,
  });
});

router.put('/actualizar/:id', (req,res) => {

    const body = req.body;
    const productoActualizar = productos.filter(producto => producto.id = req.query.id)

    productoActualizar = {
      id: body.id,
      nombre: body.nombre,
      precio: body.precio,
      thumbnail: body.thumbnail
    }

    productos = productos.filter(producto => producto.id != req.query.id)
    productos.push(productoActualizar)


    res.json({
        nuevoProducto
    })
})

router.delete('/api/productos/borrar/:id', (req,res) => {

  const body = req.body;
  

  const productoBorrado = productos.filter(producto => producto.id = req.query.id)
  productos = productos.filter(producto => producto.id != req.query.id)


  res.json({
    productoBorrado
  })
})

router.get('/productos/vista',[], async (req, res) => {
  res.render('listaDinamica', {
  layout: 'index',
  products: await productos.leer(),
  count: (await productos.leer()).length > 0 ? true : false
      
})
});

export default router;