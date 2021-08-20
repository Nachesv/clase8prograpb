

import {Server} from 'socket.io';
import { Productos } from '../models/claseProducto.js';

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
  
        socket.on('new-message', function (data) {
          const formatdata = formatMessages(data);
          messages.push(formatdata);
          socket.emit('message-update', [formatdata]);//envia mensaje a todos (corregir)
        });
        
        socket.on('inicio-messages', (author) => {
          console.log('ME LLEGO DATA inicio de messages');
          console.log(messages);
          if (messages.length > 0 ) {
            let filterMessage = messages;       
            if (author !== 'admin') {
              filterMessage = messages.filter(m => m.author === author);       
            }
            socket.emit('message-update', filterMessage);
          }
          
        });

      //New User Joined room
      socket.on('JoinRoom', (msg) => {
        addUser(socket.client.id, msg.username, msg.room);
        const user = getCurrentUser(socket.client.id);
  
        socket.join(user.room);
  
        //Send a message to the newUser
        data.username = 'CHATBOT-BOTI';
        data.text = 'Welcome to the chat!';
        socket.emit('message', formatMessages(data));
  
        data.text = `${user.username} has joined the chat!`;
  
        //BroadCast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessages(data));
  
        //Send Room info
        const roomInfo = {
          room: user.room,
          users: getRoomUsers(user.room),
        };
        io.to(user.room).emit('roomUsers', roomInfo);
      });
  
      //Let everyone knows that a user left the chat
      socket.on('disconnect', () => {
        const user = getCurrentUser(socket.client.id);
        if (user) {
          removeUser(socket.client.id);
          data.username = 'CHATBOT-BOTI';
          data.text = `${user.username} has left the chat`;
          io.to(user.room).emit('message', formatMessages(data));
  
          //Send Room info
          const roomInfo = {
            room: user.room,
            users: getRoomUsers(user.room),
          };
          io.to(user.room).emit('roomUsers', roomInfo);
        }
      });
  
      //Listen for chat messages
      socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.client.id);
        data.username = user.username;
        data.text = msg;
        io.to(user.room).emit('message', formatMessages(data));
      });
    });

  return io;
};