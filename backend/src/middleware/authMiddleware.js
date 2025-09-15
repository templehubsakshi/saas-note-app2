import jwt from 'jsonwebtoken';

export const authMiddleware =(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"No token provided"})
        }
        //Token  verify karo
        const decoded=jwt.verify(token,process.env.JWT_SECRET|| "secretkey");
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid token"})
    }
}