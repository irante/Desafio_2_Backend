const fs = require ('fs/promises')
const path = require ('path')

class ProductManager {
    constructor(path) {
      
      this.filepath = path 
    }
  
    async addProduct(producto) {
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
      
        const newId = productos[productos.length - 1]?.id || 0
      
        productos.push({
            ...producto,            //usamos spread para poder agregar una nueva propiedad "id" al objeto recibido por parametro
            id:newId + 1
        })
        await fs.writeFile(this.filepath, JSON.stringify(productos,null,2))
    }


    async getProducts(){
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
        return productos
    }

    async getProductById(id){
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
        
        const RtadoBusqueda = productos.find((el) => el.id === id);
    
        let respuesta = RtadoBusqueda??"NOT FOUND"
   
        return respuesta;
        
    }
    async deleteProduct(id){
        const data = await fs.readFile(this.filepath, 'utf-8')          ////
        const productos = JSON.parse(data)
        const indiceObjeto = productos.findIndex(objeto => objeto.id === id);
        productos.splice(indiceObjeto, 1);
        await fs.writeFile(this.filepath, JSON.stringify(productos,null,2))
       
    
    
        
    }

    async updateProduct(id, updatedFields) {
        const data = await fs.readFile(this.filepath, 'utf-8')
        const productos = JSON.parse(data)
        const productoIndex = productos.findIndex((objeto) => objeto.id === id);
    
        if (productoIndex !== -1) {
          const productoActualizado = {
            ...productos[productoIndex],
            ...updatedFields,
            id: productos[productoIndex].id // Mantenemos el mismo ID
          };
    
          productos[productoIndex] = productoActualizado;
          await fs.writeFile(this.filepath, JSON.stringify(productos, null, 2));
        }
      }
    }


  
  const producto1 = new ProductManager(path.join(__dirname,'productos.json'));
  
 

  async function main(){
  await producto1.addProduct({
    title: "mouse",
    descripcion: "mouse Logitech",
    price: 7600,
    thumbnail: "./mouse.jpg",
    code: "abc123",
    stock: 15,
  });

  await producto1.addProduct({
    title: "teclado",
    descripcion: "teclado Microsoft",
    price: 17600,
    thumbnail: "./teclado.jpg",
    code: "abrs27",
    stock: 7,
  });

  await producto1.addProduct({
    title: "parlantes",
    descripcion: "parlantes Genius",
    price: 15300,
    thumbnail: "./parlante.jpg",
    code: "as7229",
    stock: 2,
  });


  await producto1.updateProduct(1, {
    price: 18900,
    stock: 10
  });



 //await producto1.deleteProduct(1)

  console.log(await producto1.getProducts());
  
  //console.log(await producto1.getProductById(4));


}



main()



