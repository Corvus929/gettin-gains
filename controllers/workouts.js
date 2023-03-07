const Day = require('../models/day');
const Workout = require('../models/workout');

module.exports = {
    new: newWorkout,
    addToDay,
    create,
    index,
    delete: deleteWorkout
};

function index(req, res) {
    res.render('workouts/index')
};

function addToDay(req, res) {
    Day.findById(req.params.id)
    .then(function(day) {
        day.workouts.push(res.body.workoutId);
        day.save(function(err) {
            res.redirect(`/days/${day._id}`);
        });
});
    res.render(`days/show`)
}

async function create(req, res) {
    const workout = await new Workout(req.body);
    console.log(req.body);
    // day.userRecommending = req.user._id;
    console.log('this is the workout: ' + workout);
    workout.save() 
    .then(async function(workout) {
        let thisDay = await Day.findById(req.body.dayId)
        thisDay.workouts.push(workout._id);
        thisDay.save();
        res.redirect(`/days`);
    });
}

function newWorkout(req, res) {
    console.log('this is req params id: ' + req.params.id)
    Workout.find({})
    .sort('date')
    .then(function(workouts) {
        res.render('days/workouts/new', {
            title: 'Add Workout',
            workouts,
            dayId: req.params.id
        });
    });
}

async function deleteWorkout(req, res) {
    let deleteCount = await Workout.findByIdAndDelete(req.params.id);
    console.log(deleteCount);    
    res.redirect(`/days/show`);
    
}