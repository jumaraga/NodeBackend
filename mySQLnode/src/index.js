const express = require('express')
const app =express();
const morgan = require('morgan');
const exphbs =require('express-handlebars');
const path = require('path');
const { dirname } = require('path');
/* settings */
   app.set('views', path.join(__dirname,'views'))
   app.engine('.hbs', exphbs({
      defaultLayout: 'main',
      layoutsDir:path.join(app.get('views'), 'layouts'),
      partialsDir:path.join(app.get('views'),'partials'),
      //ya que la extension de nuestro archivo main no es la estandar debemos anuncir explicitamente cual sera la extension con la que estaremos trabajando
      extname:'.hbs',
      //declararemos que nuestro archivo en donde se encontrará las funcione que handlebar usará esta ene el siguien lugar
      helpers:require('./lib/handlebars')
   }))
   app.set('view engine', '.hbs');
/* middleware  */
   app.use(morgan('dev'));
   //necesitamos poder aceptar los datos que nos envien los usuarios desde un formulario para eso usaremos la funcion URLENCODE que nos proporciona express
   app.use(express.urlencoded({extended:false}))
   app.use(express.json())
/* Global variables */
   app.use((req, res, next)=>{
      next()
   })
/* definiendo las rutas routes */
   app.get('/user',(req,res)=>{
      res.send('estamos al aire')
   })
   app.use(require('./routes/index'));
   app.use(require('./routes/authentication'))
   app.use('/links',require('./routes/links'))
   /* Public */
   app.use(express.static(path.join(__dirname,'public')))
/* corriendo el servidor */
   app.listen(8080,
      console.log('iniciando servidor')   
   )