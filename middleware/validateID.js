const validateID = (req, res, next)=>{

    
    const id = req.params.id
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            ok:false,
            msg:'id is not valid'
        });
    }
    next();

    
}

module.exports ={
    validateID

}