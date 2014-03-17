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
    done: {
        type: Boolean,
        default: false,
        required: true
    },
    foo: {
        type: String,
        default: '',
        trim: true
    },
    baz: {
        type: String,
        default: '',
        trim: true
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
// This sets up validation on the "title" field
// for articles.
// Schema paths refer to the fields.
// REF: http://mongoosejs.com/docs/api.html#schema_Schema-path
// There are built-in validations.  This is a custom validation.
// REF: http://mongoosejs.com/docs/validation.html
// REF: http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
TodoTaskSchema.path('user').validate(function (user) {
    return user && user.length;
}, 'TodoTasks must have a user.');

/**
 * Statics
 */
// QUESTION: Where is this used?
TodoTaskSchema.statics.load = function(id, cb) {

    // Get the first MongoDB document that matches
    // this criteria.
    // REF: http://docs.mongodb.org/manual/reference/method/db.collection.findOne/
    this.findOne({
        _id: id
    })
    // This add a couple fields to the document (record).
    // REF: http://mongoosejs.com/docs/populate.html
    .populate('user', 'name username')

    // exec runs after populate has finished.
    // Remember, node is all about asynchronous code.
    // http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    .exec(cb);
};

// Now that the schema is set up, register it with Mongoose
// so it can be used when needed.
// REF: http://mongoosejs.com/docs/models.html
mongoose.model('TodoTask', TodoTaskSchema);
