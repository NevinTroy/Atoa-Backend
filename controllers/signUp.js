const handleSignUp=(req,res,db,bcrypt,jwt)=>{
    const {name, email, mobile, password}=req.body;
    const hash=bcrypt.hashSync(password, 10);
    db('users')
    .insert({
      name: name,
      email: email,
      mobile: mobile,
      password: hash
    })
    .then(data=>{
      db.select('*').from('users').where('id','=',data[0])
      .then(data=>{
        const user=data[0];
        let accessToken=jwt.sign(user,"access",{expiresIn:'5m'});
        let refreshToken=jwt.sign(user,"refresh",{expiresIn:'5m'});
        res.json({
          id: data[0].id,
          accessToken: accessToken,
          refreshToken: refreshToken
        })
      })
    })
    .catch(err=>{
      res.send(err);
    })
}

module.exports={
    handleSignUp
}