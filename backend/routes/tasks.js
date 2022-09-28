const express = require('express')
const router = express.Router();

const tasksController =  require('../controllers/taskController')

router.post('/create',tasksController.create);
router.post('/getTasks',tasksController.getTasks);

module.exports = router;