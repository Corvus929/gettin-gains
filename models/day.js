const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daySchema = new Schema ({
    date: Date,
    workouts: [{
        type: Schema.Types.ObjectId,
        ref: 'Workout'
       }],
    },  {
    timestamps: true
})

module.exports = mongoose.model('Day', daySchema);