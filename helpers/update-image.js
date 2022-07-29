
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hostipal = require('../models/hospital');

const fs = require('fs');

const deleteImg = (path)=>{

    if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }

}

const updateImage = async (type,id, fileName) =>{
    
    switch (type) {
        case 'doctors':
            const doctor = await Doctor.findById(id);
            if(!doctor){
                console.log('id is not of a doctor');
                return false;
            }
            deleteImg(doctor.img);
            doctor.img = fileName;
            await doctor.save();
            return true;
        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if(!hospital){
                console.log('id is not of a hospital');
                return false;
            }
            deleteImg(hospital.img);
            hospital.img = fileName;
            await hospital.save();
            return true;
        case 'users':
            const user = await User.findById(id);
            if(!user){
                console.log('id is not of a user');
                return false;
            }
            deleteImg(user.img);
            user.img = fileName;
            await user.save();
            return true; 
        default:
            break;
    }

}

module.exports ={
    updateImage
}