let express = require('express');
let router = express.Router();
const workoutsCtrl = require('../controllers/workouts');

router.get('/new', workoutsCtrl.new);
router.post('/', workoutsCtrl.create);
router.post('/:id', workoutsCtrl.addToDay);

module.exports = router;