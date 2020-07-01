const express = require('express');
const router = express.Router();

//Model import
const Category = require('../db/models/Category.model');

//List of Routes
router.get('/', (req, res) => {
    //return all
    Category.find().then((vendor) => {
        res.send(vendor);
    })
});

router.post('/', (req, res) => {
    //Create new one with name
    const name = req.body.name;
    const newCategory = new Category({
        name: name
    });
    newCategory.save()
    .then(() => {
        //Return just created one
        res.send(newCategory);
    })
    .catch(err => console.log(err));
});

router.patch('/:id', (req, res) => {
    // Update by ID 
    Category.findByIdAndUpdate({_id: req.params.id},
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
    //Delete by ID
    Category.findOneAndRemove({_id:req.params.id},(err, resDoc) => {
        if (err) throw err;
        if (resDoc) res.send(resDoc);
        else {
            res.status(400).json({ msg: 'Not found' });
        }
    })
});

/*********************************/
module.exports = router;