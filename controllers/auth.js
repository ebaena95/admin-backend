const {response} = require('express');
const User = require('../models/user');
const crypt = require('bcryptjs');

const {generarJWT} = require('../helpers/jwt')
const login = async(req, res=response)=>{

    const {email, password } = req.body;
    try {

        const user = await User.findOne({email});
        console.log(user);
        if(!user){
            return res.status(404).json({
                ok:false,
                msg: 'user not found'
            }); 
        }

        const validPass = crypt.compareSync(password, user.password);
        console.log(validPass);
        if(!validPass){
            return res.status(404).json({
                ok:false,
                msg: 'email not valid'
            }); 
        }
        const token =  await generarJWT(user.id);
        res.status(200).json({
            ok:true,
            msg: token
        });    
    }catch (error) {

        res.status(500).json({
            ok:false,
            msg: 'Server error'
        });     
    }
}

module.exports = {
    login
}