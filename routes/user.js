const express = require('express'); //framework
const router = express.Router(); // router that is integrated in express

//middleware import
const objectMiddleware = require('../middlewares/object');
const authMiddleware = require('../middlewares/auth');

// controllers import
const userController = require('../controllers/user');

// available routes (CRUD - get/post/put/delete)
router.get('/', objectMiddleware, userController.getUserList);
router.get('/:id', objectMiddleware, userController.getUser);
router.post('/signup', objectMiddleware, userController.createUser);
router.post('/login', objectMiddleware, userController.login);
router.put('/:id', objectMiddleware, userController.updateUser);
router.delete('/:id', objectMiddleware, userController.deleteUser);

module.exports = router;