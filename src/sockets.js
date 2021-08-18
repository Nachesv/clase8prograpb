

import {Server} from 'socket.io';
import { Productos } from './models/claseProducto.js';

export const init = (app) => {
  const io = new Server(app);
  const productController = new Productos();

  io.on('connection', (socket) => {
      console.log('conectado');
      socket.on('producto-nuevo', async(product) => {
          const {title,price,thumbnail} = product;
          console.log('producto nuevo', product);
          let resultado = await productController.guardar(title,(price),thumbnail);
          console.log('guardé producto nuevo', resultado);
          if (resultado) {
            console.log('toy emitiendo', resultado);
              socket.emit('producto-update', [product]);
            }
        });
        socket.on('inicio-productos', async() => {
            console.log('inicio lista de productos productos');
            const productos = await productController.leer();
            console.log(productos);
            if (productos.length > 0) {
              socket.emit('producto-update', productos);
             }
         });
      });

  return io;
};