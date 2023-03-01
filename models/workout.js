const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
name: String,
notes: String,
image: String,
video: String,

user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },

}, {
    timestamps: true
})

const daySchema = new Schema ({
    date: Date,
    workouts: [workoutSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Workout', workoutSchema);