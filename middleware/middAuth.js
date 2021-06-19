const jwt = require('jsonwebtoken')

module.exports.authorizationUser = async (req,res,next)=>{
    let token = req.headers.authorization
    if (token != undefined){
        try {
            let tokenchk = token.split(' ')[1]
            let verificado = jwt.verify(tokenchk, process.env.SECRET_KEY)
            if (verificado){
                next();                
            } else  {
                throw new Error ('Token no valido')  
            }
        } catch (error) {
            res.status(400).json({error: 'No tienes permisos, necesitas un Token'})
        }
    }else {
        res.status(400).json({error: 'Este sistema es privado y seguro, necesita un Token para ingresar'})
    }
}