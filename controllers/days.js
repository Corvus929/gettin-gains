const Day = require('models/day');
const Workout = require('model/workout');

module.exports = {
    index,
    new: newDay,
    create
};

function index(req, res) {
    Day.find({}, function(err, days) {
        console.log(days);
        res.render('/days', {
            days
        })
    })
}