const { SONGS } = require('../config/bd');

const { productSchema } = require('./schemas');

// obtener todas las canciones
function leerProductos() {
  return new Promise((resolve, reject) => {
    const items = SONGS.find({});
    if (!items) {
      reject();
    }
    resolve(items);
  });
}
// obtener las canciones del ususario
function leerProductosAutor(username){
    return new Promise((resolve, reject)=>{
        const items = SONGS.find({
            author: username
          });
            if(!items){
                reject()
            }
            resolve(items)
    })
};

function validarSchemaProducto(objeto) {
  return new Promise((resolve, reject) => {
    const value = productSchema.validateAsync(objeto);
    if (!value) {
      reject();
    }
    resolve(value);
  });
}

module.exports = { leerProductos, validarSchemaProducto, leerProductosAutor };
