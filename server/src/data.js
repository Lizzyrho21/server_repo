'use strict';


const ItemModel = require('./item-model.js');

const Data = { ItemModel };
// var ObjectID=require("mongodb").ObjectId;

Data.addAnItem = async(req,res,next) => {
  try {
    const data = req.body;
    const item = new ItemModel(data);
    await item.save();
    res.status(200).json(item);
  } catch(e) { next(e.message); }
}

Data.getAllItems = async(req, res) => {
  const items = await ItemModel.find({});
  try{
  res.status(200).json(items);} catch(error){
    console.error(error)
  }
}

Data.getOneItem = async (req, res) => {
   const id = req.params.id;
  const items = await ItemModel.find({ _id: id }); 
  try{
  res.status(200).json(items[0]);} catch(error){
    console.error(error);
  }
  
}

Data.findByIdAndDelete = async(req, res) => {
  const id = req.params.id;
  const items = await ItemModel.remove({_id: id});
  console.log(res.status(200).json(items[0]));
}

// Data.getOneItem = async(req, res) => {
//   const id = req.params.id;
//  const items = await ItemModel.find(_items => _items.id === id );
//  res.status(200).json(items[0]);
// }
// server.get("/items/:id", (req, res) => {
//   const itemId = req.params.id;
//   const item = data.find(_item => _item.id === itemId);



// Delete
// router.delete('/:entryId', (req,res) => {
//   EntryCollection.findOneAndDelete({entryTitle: req.params.entryId }, (errors, results) => {
//       errors ? res.send(error) : res.send(results);
//   });

module.exports = Data;
