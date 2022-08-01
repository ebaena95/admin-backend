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

const updateHospital = async(req,res = response) =>{

    const id = req.params.id;
    const name = req.body.name;
    const uid = req.uid;
    console.log(name);

    try {

        const hospitalDB = Hospital.findById(id);

        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'hospital not found'
            });
        }

        const changesHospital ={
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, changesHospital, {new:true});

        res.json({

            ok:true,
            msg: updatedHospital
    
        })        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'server error'
        })
        
    } 
}

const deleteHospital = async(req,res = response) =>{

    const id = req.params.id;
    try { 
        const hospitalToDelete = await Hospital.findById(id);
        if(!hospitalToDelete){
            return res.status(404).json({
                ok:false,
                msg:'hospital not found'
            });
    
        }
       
        await Hospital.findByIdAndDelete(id);
        res.json({

            ok:true,
            msg: `Hospital ${hospitalToDelete} is deleted`
    
        })
        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'server error'
        });
        
    }

}


module.exports = {

    getHospitals,
    newHospital,
    updateHospital,
    deleteHospital

}