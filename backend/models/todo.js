const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
    task:{
        type: String,
        required : true,
    },
    status: {type: Boolean, default: false}
});

const todo = mongoose.model("todo", toDoSchema);
module.exports = todo;