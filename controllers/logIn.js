const handleLogIn=(req,res,db,bcrypt,jwt)=>{
    const {mobile, password}=req.body;
    db.select('*').from('users').where('mobile','=',mobile)
    .then(data=>{
        const user=data[0];  
        const isValid=bcrypt.compareSync(password, data[0].password);
        if(isValid){
            let accessToken=jwt.sign(user,"access",{expiresIn:'5m'});
            let refreshToken=jwt.sign(user,"refresh",{expiresIn:'5m'});
            res.json({
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        else{
            res.status(400).json('Invalid credentials');
        }
    })
    .catch(err=>{res.json("Error logging in")});
}

module.exports={
    handleLogIn
}