const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User,validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = require('express').Router();

router.post('/',async(req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // we have used findOne instead of findById because 
    // we are searching by a property not by id
    let user = await User.findOne({email:req.body.email});
    if (user) return res.status(400).send('User already registered.');

    // user = new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password:req.body.password
    // });

    // using lodash to pick only name, email and password from req.body
    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    
    await user.save();

    // res.send({
    //     name:user.name,
    //     email:user.email
    // });

    const token = jwt.sign({_id:user._id}, config.get('jwtPrivateKey'));
    // using lodash to pick only name and email from user object
    res.header('x-auth-token',token).send(_.pick(user,['id','name','email']));
});

module.exports = router;