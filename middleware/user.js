const { User } = require("../db/db");
const userModel = User;
const userMiddleware = (req, res, next) => {
    const username = req.headers.username
    const password = req.headers.password

    userModel.findOne({
        username, password
    }).then((value)=>{
        if(value){
            next()
        }else{
            res.status(401).json({
                message: "User dosn't exsists"
            })
        }
    })
};

module.exports = userMiddleware;
