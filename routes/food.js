const express = require('express');
const router = express.Router();

//Food Model import
const Food = require('../db/models/Food.model');
//List of Routes
router.get('/', (req, res) => {
    //return all Food
    Food.find().then((food) => {
        res.send(food);
    })
});

router.post('/', (req, res) => {
    //Create new Food, with Vendor ID, category in HTTP Body
    const name = req.body.name;
    const vendorId = req.body.vendorId;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const newFood = new Food({
        name: name,
        vendorId: vendorId,
        categoryId: categoryId,
        price: price
    });
    newFood.save()
    .then(() => {
        //Return full Food detail
        res.send(newFood);
    })
    .catch(err => console.log(err));
});

router.patch('/:id', (req, res) => {
    // Update Food by ID 
    Food.findByIdAndUpdate({_id: req.params.id},
        { $set:  req.body, "date": new Date()}
        ,(err, resDoc) => {
            if (err) throw err;
            if (resDoc) res.send(resDoc);
            else {
                res.status(400).json({ msg: 'Not found' });
            }
        });
});

router.delete('/:id', (req, res) => {
    //Delete list by id
    Food.findOneAndRemove({_id:req.params.id},(err, resDoc) => {
        if (err) throw err;
        if (resDoc) res.send(resDoc);
        else {
            res.status(400).json({ msg: 'Not found' });
        }
    })
});

/*********************************/
module.exports = router;