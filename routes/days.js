let express = require('express');
let router = express.Router();
const daysCtrl = require('../controllers/days');

//everything has /days in front of it
router.get('/', daysCtrl.index);
router.get('/new', daysCtrl.new);
router.get('/:id', daysCtrl.show);
router.post('/', daysCtrl.create);

module.exports = router;