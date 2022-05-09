"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var Remembr = new Schema({
  text: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    "default": Date.now
  },
  done: {
    type: Boolean,
    "default": false
  }
});
module.exports = model('Remembr', Remembr);