import express from "express";

export let productos = [
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

interface Response {
    status?: number;
}

export class Productos {
    elementos: { id: number; nombre: string; precio: any; thumbnail: string; }[];
    constructor() {
        this.elementos = productos;
    }

    res: express.Response

    //funcion para leer mis productos
    async leer() {
    
        try {
            return this.elementos
        } catch (error) {
                console.log('No hay productos en el listado');
            }
    }


    //funcion para agregar productos
    async guardar(title: any, price: any | number, thumbnail: any) {

        try {
            price = parseFloat(price);
            if (typeof title !== 'string') throw new Error('Titulo tiene que ser string');
            if (isNaN(price)) throw new Error('Price tiene que ser un nro');
            if (typeof thumbnail !== 'string') throw new Error('Thumbnail tiene que ser string de url'); 

            let elemento = {
                id: this.elementos.length + 1,
                nombre: title,
                precio: price,
                thumbnail: thumbnail,
                
            }

            this.elementos.push(elemento);
            return elemento;
  
        } catch (error) {
                  console.log('ERROR: No se pudo agregar un producto. ' + error.message);
            }
      
    }

  
    async leerUno(id: number) {
        
        try {
            const producto = this.elementos.find((aProduct) => aProduct.id == id);
            return producto;
        } catch (error) {
                console.log('Producto no encontrado');
            }

    }

    async actualizar(id: number,title: any, price: any, thumbnail: any) {
        
        try {
            if (typeof title !== 'string') throw new Error('Titulo tiene que ser string');
            if (typeof price !== 'number') throw new Error('Price tiene que ser un nro');
            if (typeof thumbnail !== 'string') throw new Error('Thumbnail tiene que ser string de url'); 

            const index = this.elementos.map((aProduct) => aProduct.id).indexOf(id);
            if (index == -1) {
                
                return res.status(404).json({
                  msg: 'Product not found',
                });
            }
            
            this.elementos[index].nombre = title;
            this.elementos[index].precio = price;
            this.elementos[index].thumbnail = thumbnail;

            return this.elementos[index];
        } catch (error) {
                console.log('Producto no encontrado');
            }

    }

    async borrarUno(id: number) {
        
        try {
            const idBuscado = Number(id);
            const productoEliminado= this.elementos.find((aProduct) => aProduct.id == idBuscado);
            this.elementos = this.elementos.filter((aProduct) => aProduct.id !== idBuscado);
            
            return productoEliminado;
            } catch (error) {
                console.log(`Producto no encontrado`);
            }
        
    }
}

