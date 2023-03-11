let express = require('express');
let router = express.Router();
const daysCtrl = require('../controllers/days');
const ensureLoggedIn = require('../config/ensureLoggedIn');


//everything has /days in front of it
router.get('/', ensureLoggedIn, daysCtrl.index);
router.get('/new', ensureLoggedIn, daysCtrl.new);
router.get('/:id', ensureLoggedIn, daysCtrl.show);
router.post('/', ensureLoggedIn, daysCtrl.create);
router.delete('/:id', ensureLoggedIn, daysCtrl.deleteDay);

module.exports = router;