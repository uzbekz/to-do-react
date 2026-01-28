import jwt from 'jsonwebtoken'

const SECRET = "my_super_secret_key";
export function authenticate(req,res,next){
  const authHeader = req.headers.authorization

  if(!authHeader){
    res.status(401).json({message : "token ain't there"})
  }

  const token = authHeader.split(" ")[1]

  try{
    const payload = jwt.verify(token,SECRET)
    req.user = payload
    next()
  }catch(err){
    return res.status(401).json({message : 'token is invalid'})
  }
}
