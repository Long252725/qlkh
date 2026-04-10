const router = require('express').Router()
const ListController = require('../app/controllers/ListController')

router.get('/', ListController.index)
router.delete('/delete-multiple', ListController.delete)
router.get('/edit/:id', ListController.update)

module.exports = router