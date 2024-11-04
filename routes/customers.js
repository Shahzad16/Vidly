// object destructuring to avoid using customer.Customer and customer.validateCustomer
// The {Customer, validate} part is the destructuring syntax. It extracts the Customer 
// and validate properties directly from the imported object and assigns them to local variables with the same names.
const {Customer,validate}=require('../models/customer'); // customer module returns Customer & validate
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/', async (req, res) => {
  const customers = await Customers.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer= new Customer({
      name:req.body.name,
      phone:req.body.phone,
      isGold:req.body.isGold
    });
    customer=await customer.save();
    res.send(customer);
});

router.put('/:id',async(req,res)=>{
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    isGold:req.body.isGold,
    phone:req.body.phone,
  },{new:true});

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.delete('/:id',async(req,res)=>{
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if(!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

router.get('/:id',async(req,res)=>{
  const customer = await Customer.findById(req.params.id);

  if(!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router;