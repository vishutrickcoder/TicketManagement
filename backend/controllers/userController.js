const express = require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel')

const register = async(req , res) => {
    let {name , username , email , isAdmin , password} = req.body

    let user =await userModel.findOne({email})
    if(user) return res.status(500).send("Usesr is Already Registered ...")

    bcrypt.genSalt(10 , (err , salt) => {
        bcrypt.hash(password ,salt , async (err , hashPassword) => {
            let user =await userModel.create({
                name ,
                username, 
                email, 
                isAdmin : isAdmin, 
                password : hashPassword
            })

            let token = jwt.sign({email :email , userId :user._id} , process.env.JWT_SECRET)
            res.status(201).json({ message: 'User registered successfully' ,token});
        })
    })


}


const login = async (req , res) => {
    let {email, password} = req.body

    let user =await userModel.findOne({email})
    if(!user) return res.status(500).send("SomeThing Went Wrong ...")

   bcrypt.compare(password , user.password , function(err ,result){
    if(result){
        let token = jwt.sign({email :email , userId :user._id} , process.env.JWT_SECRET)
        // res.cookie("token" ,token)
        res.status(200).json({ message: 'User LoggedIn successfully' ,token});
    } 
   })

}

const getUserProfile = async (req, res) => {
    try {
      const user = await userModel.findById(req.user.userId); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {register , login ,getUserProfile}