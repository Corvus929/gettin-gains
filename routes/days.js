let express = require('express');
let router = express.Router();
const daysCtrl = require('..controllers/days');

router.get('/days', daysCtrl.index);
router.get('/days/new', daysCtrl.new);
router.get('/days/:id', daysCtrl.show);
router.post('/days', daysCtrl.create);

module.exports = router;