const Router = require('express')
const userController = require('../controller/userController')


const router = Router()


router.get(("/users"), userController.getAllUsers)

router.post("/users", userController.creatUser);

router.put(("/users/:id"), userController.updateUser)

router.delete("/users/:id", userController.deleteUser)

module.exports = router 