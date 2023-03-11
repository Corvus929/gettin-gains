let express = require('express');
let router = express.Router();
const workoutsCtrl = require('../controllers/workouts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/new/days/:id', ensureLoggedIn, workoutsCtrl.new);
router.post('/', ensureLoggedIn, workoutsCtrl.create);
router.post('/:id', ensureLoggedIn, workoutsCtrl.addToDay);
router.delete('/:id', ensureLoggedIn, workoutsCtrl.delete);
router.put('/edit/days/:id', ensureLoggedIn, workoutsCtrl.update);
router.get('/edit/days/:id', ensureLoggedIn, workoutsCtrl.edit);

module.exports = router;