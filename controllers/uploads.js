
const path = require('path');
const {response} = require('express');
const { v4: uuidv4 } = require('uuid');
const {updateImage} = require('../helpers/update-image');
const fs = require('fs');

const fileupload = (req, res = response)=>{

    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['doctors', 'hospitals', 'users'];

    if(!validTypes.includes(type)){

        res.status(400).json({
            ok:false,
            msg: 'the type selected must be hospitals/doctors/users'
        }); 

    }
    // validar que existeix un arxiu
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No files were uploaded.'});
    }

    //procesar la imatge

    const file = req.files.img;

    const cutFileName = file.name.split('.');
    const fileExtension = cutFileName[cutFileName.length -1];

    //validar extensió

    validExtension = ['png', 'jpg', 'jpeg', 'gif'];

    if(!validExtension.includes(fileExtension)){
        return res.status(400).json({
            ok:false,
            msg:'this extension is not allowed'});
        
    }

    //generar el nom de l'arxiu

    const fileName = `${uuidv4()}.${fileExtension}`;

    // path per guardar la imatge

    const path = `./uploads/${type}/${fileName}`;

    //moure la imatge

    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({ok:false, msg:'error when img move'});
        } 
        res.status(200).json({
            ok:true,
            msg: fileName,
        }); 
    
      });

    updateImage(type,id,path,fileName);

   
}

const getImage = (req, res = response)=>{


    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);

    //retornar imatge si no existeix

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}
module.exports = {
    fileupload,
    getImage

}