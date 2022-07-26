const mongoose = require('mongoose');



const dbConnection = async () =>{

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('connect ');
        
    } catch (error) {
        
        console.log(error);
        throw new error('Database not work')
    }
    
}


module.exports={
    dbConnection
}