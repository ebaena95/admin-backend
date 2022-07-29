const {response} = require('express');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hostipal = require('../models/hospital');

const searchAll = async(req,res = response) =>{

    const search_str = req.params.str;
    const regex = new RegExp(search_str, 'i');
    const [users, doctors, hospitals] = await Promise.all([
        User.find({name:regex}),
        Doctor.find({name:regex}),
        Hostipal.find({name:regex}),
    ]);

    res.status(200).json({
        ok:true,
        users,
        doctors,
        hospitals
    }); 
}

const searchAllofCollection = async(req,res = response) =>{

    const search_str = req.params.str;
    const search_table = req.params.table;
    const regex = new RegExp(search_str, 'i');
    let data = [];

    switch (search_table) {
        case 'doctors':
            data = await Doctor.find({name:regex})
                                        .populate('user', 'name img')
                                        .populate('hospital', 'name img') 
            break;
        case 'hospitals':
            data = await Hostipal.find({name:regex}).populate('user', 'name img');    
            break;
        case 'users':
            data = await User.find({name:regex});     
            break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg:'table must match with doctors/hospitals/users'
            })
    }   
    res.json({
        ok:true,
        data
    })
}

module.exports = {
    searchAll,
    searchAllofCollection
}