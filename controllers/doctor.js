const {response} = require('express');
const doctor = require('../models/doctor');
const Doctor = require('../models/doctor')


const getDoctors = async(req,res = response) =>{

    try {
        const doctors = await Doctor.find()
                                    .populate('user', 'name')
                                    .populate('hospital', 'name')
        res.json({
            ok:true,
            doctors
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'server error'
        })        
    }   
}

const newDoctor = async(req,res = response) =>{

    const uid = req.uid;
    const doctor = new Doctor ({
        user: uid,
        ...req.body
    });
    

    try {

        const doctorDB = await doctor.save();

        res.json({

            ok:true,
            msg:doctorDB
    
        })
        
    } catch (error) {
        res.status(500).json({
            msg: "server error"
        })
    }

}

const updateDoctor = async(req,res = response) =>{

    const id = req.params.id;
    const uid = req.uid
    try {
        const doctor = await Doctor.findById(id);   

        if(!doctor){
            return res.status(404).json({
                ok:false,
                msg:'doctor not found'
            }); 
        }
        const changesDoctor = {
            ...req.body,
            user:uid

        }
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, changesDoctor, {new:true});
        res.json({

            ok:true,
            msg:updatedDoctor
    
        })       
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'server error'
        })
    }   
}

const deleteDoctor = async(req,res = response) =>{

    const id = req.params.id;

    try {

        const doctorToDelete = await Doctor.findById(id);

        if(!doctorToDelete){
            return res.status(404).json({
                ok:false,
                msg:'doctor not found'
            });
        }
        
        await Doctor.findByIdAndDelete(id);
        res.json({

            ok:true,
            msg:`Doctor ${doctorToDelete} is deleted`
    
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'server error'
        })
    }

    
}


module.exports = {

    getDoctors,
    newDoctor,
    updateDoctor,
    deleteDoctor

}