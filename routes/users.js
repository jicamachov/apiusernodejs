const express = require('express');
const mongoose = require('../config/connection');

const userController = require('../controllers/users');

const router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/create', userController.create);

router.get('/search/:username', userController.search);

router.get('/retrieve', userController.retrieve);

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.remove);


module.exports = router;
