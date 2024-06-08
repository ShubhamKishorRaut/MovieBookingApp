function errorHandler(statusCode,err,req,res,next){
    if(res.headersSend){
        return next(err)
    }

    console.log('ERROR MIDDLEWARE CALLED')
    res.send(statusCode || 500).json({
        ok:false,
        message:err.message
    })
}

module.exports = errorHandler;