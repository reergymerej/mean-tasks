'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String
    }
});

CategorySchema.statics.load = function (_id, callback) {
    this.findOne({
        _id: _id
    }).exec(callback);
};

mongoose.model('Category', CategorySchema);
