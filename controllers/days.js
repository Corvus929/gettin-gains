const Day = require('../models/day');
const Workout = require('../models/workout');

module.exports = {
    index,
    show,
    new: newDay,
    create,
    edit, 
    update,
    deleteDay
};

function index(req, res) {
    Day.find({}).then( (days) => {
        res.render('days/index', {title: 'All Days',
    days,
    });
})
    }


// function show(req, res) {
//     Day.findById(req.params.id)
//     .populate('workouts')
//     .then(function(day) {
//         Workout.find(
//           {_id: {$nin: day.workouts}})
//           .then(
//           function(workouts) {
//             console.log(workouts);
//             res.render('days/show', {
//               title: 'Day',
//               day,
//               workouts
//             });
//           }
//         );
//       });
// }

async function show(req, res) {
    try {
        let id = req.params.id;
        let day = await Day.findById(id).populate('workouts');
        if(day) {
            console.log(day);
            return res.render('days/show', {
                title: 'Day',
                day                
            })
        }
    } catch(err) {
        return res.status(500).send(err.message);
    }
}

function newDay(req, res) {
    res.render('days/new', {title: 'New Day'});
}

function create(req, res) {
    const day = new Day(req.body);
    day.userRecommending = req.user._id;
    day.save(function(err) {
        if (err) return res.redirect('/days/new');
        console.log(day);
        res.redirect('/days/:id/workouts/new')
    });
    
}

function edit(req, res) {
    Day.findOne({_id: req.params.id, userRecommending: req.user._id}, function(err, day) {
        if (err || !day) return res.redirect('/days'); 
        res.redirect(`/days/${day._id}`);
        }
    );
}

function update(res, res) {
    Day.findOneAndUpdate(
        {_id: req.params.id, userRecommending: req.user._id},
        req.body, 
        {new: true},
        function(err, day) {
            if (err || !day) return res.redirect('/days');
            res.redirect(`/days/${day._id}`);
        }
    );
}

function deleteDay(req, res) {
    Day.findOneAndDelete(
        {_id: req.params.id, userRecommending: req.user._id, function(err) {
            res.redirect('/days');
        }}
    );
}