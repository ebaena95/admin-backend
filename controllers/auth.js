const {response} = require('express');
const User = require('../models/user');
const crypt = require('bcryptjs');
const {googleVerify} = require('../helpers/google-verify')

const {generarJWT} = require('../helpers/jwt')
const login = async(req, res=response)=>{

    const {email, password } = req.body;
    try {

        const user = await User.findOne({email});
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

const googleSignIn = async(req, res=response)=>{

    try {
        const {email,name,picture} = await googleVerify(req.body.token);
        const userDB = await User.findOne({email});
        let user;

        if(!userDB){
            user = new User({
                name,
                email,
                password:'@@@',
                img:picture,
                google: true
            });
        }else{
            user = userDB;
            user.google = true;
        }
        // guardar usuari
        await user.save();

        const token = await generarJWT(user.id);

        res.status(200).json({
            ok:true,
            msg: email, name, picture, token
        });   
        
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: 'token not valid'
        });    
    }

    
    res.status(200).json({
        ok:true,
        msg: req.body.token
    });   

}

const renewToken = async (req, res=response)=>{

    const uid = req.uid;

    const token =  await generarJWT(uid);
    res.json({
        ok:true,
        token
    })

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}