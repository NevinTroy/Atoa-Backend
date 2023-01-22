// Description: This file contains the logic for signing up a new user
//passwords are hashed using bcrypt for 10 salt rounds and then stored in the database
//jwt access tokens and refresh tokens are generated for the user and sent back to the client

const handleSignUp=(req,res,db,bcrypt,jwt)=>{
    const {name, email, mobile, password}=req.body;
    
    const emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobileRegex=/^[0-9]{10}$/;
    
    if(!name || !email || !mobile || !password || !emailRegex.test(email) || !mobileRegex.test(mobile)){
        return res.status(400).json('Incorrect form submission');
    }

    const hash=bcrypt.hashSync(password, 10);
    db('USERS')
    .insert({
      name: name,
      email: email,
      mobile: mobile,
      password: hash
    })
    .then(data=>{
      db
      .select('*')
      .from('USERS')
      .where('id','=',data[0])
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
    .catch(err=>{res.json("Error signing up "+err)});
}

module.exports={
    handleSignUp
}