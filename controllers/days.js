const Day = require('../models/day');
const Workout = require('../models/workout');

module.exports = {
    index,
    show,
    new: newDay,
    create
};

function index(req, res) {
    res.render('days/index', {title: 'All Days'});

}

function show(req, res) {
    Day.findById(req.params.id)
    .populate('workouts')
    .exec(function(err, day) {
        Workout.find(
          {_id: {$nin: day.workouts}},
          function(err, workouts) {
            console.log(workouts);
            res.render('/days', {
              title: 'Day',
              day,
              workouts
            });
          }
        );
      });
}

function newDay(req, res) {
    res.render('days/new', {title: 'New Workout'});
}

function create(req, res) {
    day.save(function(err) {
        if (err) return res.redirect('/days/new');
        console.log(day);
        res.redirect('/days')
    });
}