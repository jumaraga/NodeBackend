const mysql = require('mysql');
const {database} = require('./keys');
/* ya que para el modulo pool solo podemos hacer uso de los callbacks necesitaremos usar el modulo promisify para poder hacer uso de las promesas*/
const {promisify} = require('util')


/* pool nos permitira asemejarnos más a un entorno de producción  */
//nos ayuda ejecutar distintos hilos de  para que si nuestra aplicación tenga algun tipo de fallo
const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
   if(err){
      if (err.code === 'PROTOCOL_CONNECTION_LOST'){
         console.error('DATABASE CONNECTION WAS CLOSE');
      }
       if(err.code ==='ER_CON_COUNT_ERROR'){
         console.error('DATABASE TOO MANY CONNECTIONS')
      }
       if(err.code === 'ECONNREFUSED'){
         console.error('DATABASE CONNECTION WAS REFUSED')
      }
   }

   if(connection) connection.release();
   console.log('DB is Connected');
   return;
})
/* con esto indicamos que cada ves que queramos hacer una peticion a la base de datos podemos hacerkas mediante promesas */
pool.query = promisify(pool.query);

module.exports = pool