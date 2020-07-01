const express = require('express');
const router = express.Router();

//Model import
const Vendor = require('../db/models/Vendor.model');

//List of Routes
router.get('/', (req, res) => {
    //return all Vendor
    Vendor.find().then((vendor) => {
        res.send(vendor);
    })
});

router.post('/', (req, res) => {
    //Create new Vendor with name
    const name = req.body.name;
    const newVendor = new Vendor({
        name: name
    });
    newVendor.save()
    .then(() => {
        //Return full just created Vendor info
        res.send(newVendor);
    })
    .catch(err => console.log(err));
});

router.patch('/:id', (req, res) => {
    // Update Vendor by ID 
    Vendor.findByIdAndUpdate({_id: req.params.id},
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
    //Delete Vendor by ID
    Vendor.findOneAndRemove({_id:req.params.id},(err, resDoc) => {
        if (err) throw err;
        if (resDoc) res.send(resDoc);
        else {
            res.status(400).json({ msg: 'Not found' });
        }
    })
});

/*********************************/
module.exports = router;