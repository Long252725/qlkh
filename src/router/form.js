const router = require('express').Router()
import formController from '../app/controllers/FormController'

router.get('/', formController.index)
router.post('/khach-hang', formController.createKhachHang)
router.put('/update', formController.updateKhachHang)
router.get('/show/:customerId', formController.showKhachHang)
router.get('/search/', formController.search)

module.exports = router 