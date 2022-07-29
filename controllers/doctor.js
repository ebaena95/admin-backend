const {response} = require('express');
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

const updateDoctor = (req,res = response) =>{

    res.json({

        ok:true,
        msg:'updateDoctor'

    })
}

const deleteDoctor = (req,res = response) =>{

    res.json({

        ok:true,
        msg:'delete'

    })
}


module.exports = {

    getDoctors,
    newDoctor,
    updateDoctor,
    deleteDoctor

}