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

async function show(req, res) {
    console.log(req.params.id);
    try {
        let id = req.params.id;
        let day = await Day.findById(id).populate('workouts');
        if(day) {
            console.log(day);
            return res.render('days/show', {
                title: `Day`,
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
    // day.userRecommending = req.user._id;
    day.save() 
    .then(function(day) {
        console.log(day);
        res.redirect('/days/workouts/new')
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

async function deleteDay(req, res) {
    let deleteCount = await Day.findByIdAndDelete(req.params.id);
    console.log(deleteCount);    
    res.redirect(`/days`);
    };