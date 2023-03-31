const mongoose = require("mongoose");



const countSchema = mongoose.Schema({


    searchCountTotal:
        Number,





})

const Count = mongoose.model('Count', countSchema);
module.exports = Count;