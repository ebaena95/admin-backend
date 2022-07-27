const {response} = require('express');


const getHospitals = (req,res = response) =>{

    res.json({

        ok:true,
        msg:'getHospitals'

    })
}

const newHospital = (req,res = response) =>{

    res.json({

        ok:true,
        msg:'newHospital'

    })
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