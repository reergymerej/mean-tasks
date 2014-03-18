'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// REF: http://mongoosejs.com/docs/guide.html
var TodoTaskSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: null
    },
    done: {
        type: Boolean,
        default: false,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

/**
 * Validations
 */
TodoTaskSchema.path('user').validate(function (user) {
    return user && user.length;
}, 'TodoTasks must have a user.');

TodoTaskSchema.pre('save', function (next) {
    if (this.end) {
        this.done = true;
    }
    next();
});


// Now that the schema is set up, register it with Mongoose
// so it can be used when needed.
// REF: http://mongoosejs.com/docs/models.html
mongoose.model('TodoTask', TodoTaskSchema);
