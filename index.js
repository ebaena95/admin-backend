const express = require('express');

require('dotenv').config();
const cors = require('cors');

const  {dbConnection} =  require('./database/config')
const app = express();

app.use(cors());
dbConnection();

app.get('/', (req, res)=>{

    res.json({
        ok:true,
        msg:'hola'
    })

});

app.listen(process.env.PORT,()=>{
    console.log('back escoltant a port ' + process.env.PORT);
})