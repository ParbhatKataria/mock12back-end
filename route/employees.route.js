const express = require('express');
const { UserModel } = require('../model/user.model');
const employees = express.Router();


employees.get('/', async(req,res )=>{
    let {page, department, sort, order, firstname} = req.query;
    let obj = {};
    // if(page)obj.page = page;
    if(department)obj.department = department;
    if(firstname)obj.firstname = {$regex:firstname};
    let sortobj = {}
    if(sort && order){
        sortobj.salary = order=='asc'?1:-1;
    }
    try {
        let data = await UserModel.find(obj).sort(sortobj).skip((page-1)*5).limit(5);
        res.status(200).send(data);

    } catch (error) {
        res.status(400).send({'msg':'not able to get the data'});
    }
})
employees.post('/',async (req,res)=>{
    let body = req.body;
    try {
        let item = UserModel(body);
        await item.save();
        res.status(200).send({'msg':'item is created'})
    } catch (error) {
        res.status(400).send({'msg':'error in posting the item'})
    }
})

employees.patch('/:_id', async(req, res)=>{
    let body = req.body;
    let _id = req.params;
    try {
        let item = await UserModel.findByIdAndUpdate(_id, body, {new:true});
        console.log(body, _id);
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send({'msg':'data is not updated'})
    }
})

employees.delete('/:_id', async(req,res)=>{
    let _id = req.params;
    try {
        let item = await UserModel.findByIdAndDelete(_id, null, {new:true});
        res.status(200).send(item);
    } catch (error) {
        res.status(400).send({'msg':"data is not deleted"});
    }
})



module.exports = {employees}