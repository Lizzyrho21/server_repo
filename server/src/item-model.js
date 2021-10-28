'use strict';

const mongoose = require('mongoose');
mongoose.connection.on(`error`, console.error.bind(console, `Mongo error`));

const ItemSchema = new mongoose.Schema({
  id: {
    type: 'String',
    },
  name: {type:'String', required:true},
  description: {type:'String', required:true},
  notes: {type:'String'},
});

module.exports = mongoose.model('items', ItemSchema);
