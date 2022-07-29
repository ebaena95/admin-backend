const express = require('express');

require('dotenv').config();
const cors = require('cors');



const  {dbConnection} =  require('./database/config')
const app = express();

app.use(cors());

//carpeta publica

app.use(express.static('public'));
app.use(express.json());
dbConnection();
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospital', require('./routes/hospitals'));
app.use('/api/doctor', require('./routes/doctors'));
app.use('/api/all', require('./routes/search'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT,()=>{
    console.log('back escoltant a port ' + process.env.PORT);
})