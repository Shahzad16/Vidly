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
    
    await user.save();

    // res.send({
    //     name:user.name,
    //     email:user.email
    // });

    // using lodash to pick only name and email from user object
    res.send(_.pick(user,['id','name','email']));
});

module.exports = router;