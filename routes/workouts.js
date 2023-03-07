let express = require('express');
let router = express.Router();
const workoutsCtrl = require('../controllers/workouts');

router.get('/new/days/:id', workoutsCtrl.new);
router.post('/', workoutsCtrl.create);
router.post('/:id', workoutsCtrl.addToDay);
router.delete('/:id', workoutsCtrl.delete);

module.exports = router;