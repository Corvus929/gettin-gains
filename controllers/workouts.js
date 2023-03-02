const Day = require('../models/day');
const Workout = require('../models/workout');

module.exports = {
    new: newWorkout,
    addToDay,
    create,
    index
};

function index(req, res) {
    res.render('workouts/index')
};

function addToDay(req, res) {
    Day.findById(req.params.id, function(err, movie) {
        day.workouts.push(res.body.performerId);
        day.dave(function(err) {
            res.redirect(`/days/${day._id}`);
        });
});
}

function create(req, res) {
    req.body.born({})
    
}

function newWorkout(req, res) {
    Workout.find({})
    .sort('date')
    .exec(function (err, workouts) {
        res.render('workouts/new', {
            title: 'Add Workout',
            workouts
        });
    });
}