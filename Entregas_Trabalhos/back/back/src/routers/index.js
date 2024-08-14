const Router = require('express');
const userController = require('../controller/userController');

const router = Router()

//Entidade Usuário
router.get(("/usuario"), userController.getUsers)
router.post(("/usuario"), userController.createUsers)
router.put(("/usuario/:id"), userController.updateUsers)
router.delete(("/usuario/:id"), userController.deleteUsers)


//Entidade Livro
router.get(("/livros"), userController.getBooks)
router.post(("/livros"), userController.createBooks)
router.put(("/livros/:id"), userController.updateBooks)
router.delete(("/livros/:id"), userController.deleteBooks)


//Entidade Troca
router.get(("/trocas"), userController.getChanges)
router.post(("/trocas"), userController.createChanges)
router.put(("/trocas/:id"), userController.updateChanges)
router.delete(("/trocas/:id"), userController.updateChanges)


//Entidade usuario_troca
router.get(("/usuario_troca"), userController.getUserChange)
router.post(("/usuario_troca"), userController.createUserChange)
router.put(("/usuario_troca/:id_usuario_troca"), userController.updateUserChange)
router.delete(("/usuario_troca/:id_usuario_troca"), userController.deleteUserChange)


// Entidade Avaliação
router.get(("/avaliacao"), userController.getAssessment)
router.post(("/avaliacao"), userController.createAssessment)
router.put(("/avaliacao/:id"), userController.updateAssessment)
router.delete(("/avaliacao/:id"), userController.deleteAssessment)

module.exports = router
