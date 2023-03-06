require('dotenv').config();
require('./config/database');
let Day = require('./models/day');
let Workout = require('./models/workout');
let data = require('./data');
let p1 = Day.deleteMany({});
let p2 = Workout.deleteMany({});

Promise.all([p1, p2])
.then(function(results){
    console.log(results);
    return Workout.create(data.workouts)
})
.then(function(workouts){
    console.log(workouts);
    return Day.create(data.days)
})
.then(function(days){
    console.log(days)
    return Promise.all([
        Workout.findOne({}), 
        Day.findOne({})
    ])
})
.then(function(results){
    let firstWorkout = results[0];
    let firstDay = results[1];
    firstDay.workouts.push(firstWorkout._id);
    return firstDay.save(); 
})
.then(function(firstDay){
    console.log(firstDay);
})
.then(process.exit);