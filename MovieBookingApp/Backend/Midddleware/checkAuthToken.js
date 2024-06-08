const jwt = require('jsonwebtoken')

function checkAuthToken(req,res,next){
    const authToken = req.cookies.authToken;
    const refreshToken= req.cookies.refreshToken;

    //check authtoken
    //check refresh
    //authtoken is not exp -> user logged in

    //authtoken is exp but refresh token is not -> regenerate authtoken and refreshtoken
    //authtoken is exp and refresh token is exp -> user not logges in

    if(!authToken || !refreshToken){
        return res.status(401).json({message:'Authentication failed:No authToken or refreshtoken provided',ok:false})
    }
    
    jwt.verify(authToken,process.env.JWT_SECRET_KEY,(err,decoded) =>{
        if(err){
            //authtoken expired
            //1.expired
            
            //check refresh token
            jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(refreshErr,refreshDecoded) =>{
                if(refreshErr){
                    //Both token are invalid send an error message and prompt for login
                    return res.status(401).json({message:'Authentication failed:Both tokens are invalid',ok:false})
                }
                else{
                    const newAuthToken = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'10m'})
                    const newRefreshtoken = jwt.sign({userId:user._id},process.env.JWT_REFRESH_SECRET_KEY,{expiresIn:'30m'})
                    
                    res.cookie('authtoken',newAuthToken,{httpOnly:true})
                    res.cookie('refreshToken',newRefreshtoken,{httpOnly:true});
                    
                    req.userId = refreshDecoded.userId;
                    req.ok=true;
                    next()
                }
            })
        }
        else{
            req.userId = decoded.userId;
            next()
        }
    })
}

module.exports = checkAuthToken;