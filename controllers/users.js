const User = require('../models/user');
const crypt = require('bcryptjs');
const {response} = require('express');
const {generarJWT} = require('../helpers/jwt')


const getUsers = async (req,res) =>{

    const page = Number(req.query.page) || 0;
    const uid = req.uid;

    const [users, total ] = await Promise.all([
        User.find().skip(page).limit(5),
        User.countDocuments()
    ]);

    res.json({
        ok:true,
        users,
        uid,
        total
    });
}
const newUser = async(req,res = response) =>{
    
    const {email, password } = req.body;

    try {

        const mailExist =  await User.findOne({email});

        if(mailExist){
            return res.status(400).json({
                ok:false,
                msg:'This email already exists'
            });
        }
        const user = new User(req.body);
        // encriptar contrasenya
        const token = await generarJWT(user.uid);
        const salt  = crypt.genSaltSync();
        user.password = crypt.hashSync(password, salt);
        await user.save();   
        res.json({
            ok:true,
            user,
            token
        })       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'server error'
        })
        
    }
}

const updateUser = async (req, res = response) =>{
// TODO: validar el token per comporobar si tot es valid
    const uid = req.params.id;
    try {
        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok:false,
                msg:'id does not exist'
            });
        }        
        const {password, google, email, ...fileds} = req.body;
        if(userDB.email !== email)
        {
            const existEmail = await User.findOne({email });
            if(existEmail){
                return res.status(404).json({
                    ok:false,
                    msg:'This mail already exist'
                });
            }
        }
        fileds.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fileds, {new:true});
        res.json({
            ok:true,
            user: updatedUser
        })
    } catch (error) {
 
        res.status(500).json({
            ok:false,
            msg:'server error'
        })
    }


}

const deleteUser = async(req, res = response) =>{
    const uid = req.params.id;

    try {

        const userToDelete = await User.findById(uid);

        if(!userToDelete){
            return res.status(404).json({
                ok:false,
                msg:"user don't found"
            });
        }

        await User.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:"user deleted"
        })
        
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg:'server error'
        })
        
    }
    
   
}


module.exports = {
    getUsers,
    newUser,
    updateUser,
    deleteUser
}