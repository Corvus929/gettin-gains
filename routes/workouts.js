let express = require('express');
let router = express.Router();
const workoutsCtrl = require('..controllers/performers');

router.get('/workouts/new', workoutsCtrl.new);
router.post('/workouts', workoutsCtrl.create);
router.post('/days/:id/workouts', workoutsCtrl.addToDays);

module.exports = router;