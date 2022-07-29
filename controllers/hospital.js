const {response} = require('express');

const Hospital = require('../models/hospital');


const getHospitals = async(req,res = response) =>{

    const hospitals = await Hospital.find()
                                        .populate('user', 'name')

    res.json({

        ok:true,
        msg:hospitals

    })
}

const newHospital = async(req,res = response) =>{

    const uid = req.uid;
    const hospital = new Hospital ({
        user: uid,
        ...req.body
    });
    

    try {

        const hospitalDB = await hospital.save();

        res.json({

            ok:true,
            msg:hospitalDB
    
        })
        
    } catch (error) {
        res.status(500).json({
            msg: "server error"
        })
    }

    
}

const updateHospital = (req,res = response) =>{

    res.json({

        ok:true,
        msg:'updateHospital'

    })
}

const deleteHospital = (req,res = response) =>{

    res.json({

        ok:true,
        msg:'delete'

    })
}


module.exports = {

    getHospitals,
    newHospital,
    updateHospital,
    deleteHospital

}