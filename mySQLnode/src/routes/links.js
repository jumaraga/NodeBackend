const express = require('express')
const router = express.Router();
/* cada ves que queramos hacer una operación con la base de datos debe importar el modulo de datos */
const pool =require('../databases')

/* routes */
router.get('/add',(req,res)=>{
   res.render('links/add')
})

router.post('/add', async(req,res)=>{
   console.log(req.body);
   const {title, url, description}= req.body;
   const newLink ={
      title,
      url,
      description
   };

   await pool.query('INSERT INTO links set ?',[newLink]);
   res.redirect('/links');

});

router.get('/',async(req,res)=>{
   const links = await pool.query('select * from links');
   console.log(links);
   res.render('links/list',{links});
})
router.get('/delete/:id',async(req,res)=>{
   const {id}= req.params;
   await pool.query('DELETE FROM links where id =?',[id]);
   res.send('DELETED');

});

module.exports = router;