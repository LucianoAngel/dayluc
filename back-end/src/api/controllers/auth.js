
const {ITEMS} = require('../config/bd')

async function auth(req, res, next){
    try{
        if(req.session) {
            const {username, password} = req.session.usuario;
            const user = await ITEMS.findOne({
                username: username,
                password: password
            });
            if (!user){
                 res.status(400).send("error")
            }else{
               next();
            }
        }else{
            res.status(400).send('error')
        }
    }catch{
        res.sendStatus(404);
    }
  }

  module.exports= auth;