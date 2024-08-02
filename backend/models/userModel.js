const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username : String ,
    name : String,
    password : String,
    email : String ,
    ticket : [
        {type : mongoose.Schema.Types.ObjectId , ref: "post"}
    ],
    isAdmin: { type: Boolean, default: false },
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel
