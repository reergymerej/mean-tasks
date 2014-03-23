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
    duration: {
        type: Number
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
    var start, end;

    if (this.done && !this.end) {
        start = this.start;
        end = new Date();

        this.duration = end.getTime() - start.getTime();
        this.end = end;
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

// DoingTaskSchema.statics.groupBy = function (cb) {
//     this.group({
//         key: {
//             category: 1,
//             description: 1
//         },
//         cond: {
//             done: {
//                 $ne: false
//             }
//         },
//         reduce: function (currentDoc, aggregatedDoc) {
//             var start = (new Date(currentDoc.start)).getTime(),
//                 end = (new Date(currentDoc.end)).getTime(),
//                 duration = end - start;

//             aggregatedDoc.duration += duration;

//         },
//         initial: { duration: 0 }
//     })

//     .exec(cb);
// };

// Now that the schema is set up, register it with Mongoose
// so it can be used when needed.
// REF: http://mongoosejs.com/docs/models.html
mongoose.model('DoingTask', DoingTaskSchema);
