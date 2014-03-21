'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// REF: http://mongoosejs.com/docs/guide.html
var DoingTaskSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    start: {
        type: Date,
        default: Date.now
    },
    end: {
        type: Date,
        default: null
    },
    done: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    }
});

/**
 * Validations
 */
DoingTaskSchema.path('user').validate(function (user) {
    return user && user.length;
}, 'TodoTasks must have a user.');

DoingTaskSchema.pre('save', function (next) {
    if (this.done && !this.end) {
        this.end = new Date();
    } else if (!this.done && this.end) {
        this.end = null;
    }
    next();
});

DoingTaskSchema.statics.load = function (id, cb) {

    // Get the first MongoDB document that matches
    // this criteria.
    // REF: http://docs.mongodb.org/manual/reference/method/db.collection.findOne/
    this.findOne({
        _id: id
    })
    // This add a couple fields to the document (record).
    // REF: http://mongoosejs.com/docs/populate.html
    .populate('user')

    // exec runs after populate has finished.
    // Remember, node is all about asynchronous code.
    // http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    .exec(cb);
};

// Now that the schema is set up, register it with Mongoose
// so it can be used when needed.
// REF: http://mongoosejs.com/docs/models.html
mongoose.model('DoingTask', DoingTaskSchema);
