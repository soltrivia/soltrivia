
const router = require('koa-router')({
    prefix: '/weapp'   //  
})
const controllers = require('../controllers')

const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

router.get('/login', authorizationMiddleware, controllers.login)
router.get('/user', validationMiddleware, controllers.user)

router.post('/upload', controllers.upload)

router.get('/tunnel', controllers.tunnel.get)
router.post('/tunnel', controllers.tunnel.post)

router.get('/message', controllers.message.get)
router.post('/message', controllers.message.post)


router.get('/getGId', validationMiddleware, controllers.getGId)

router.get('/get_score', validationMiddleware, controllers.get_score)

router.get('/qr_address', validationMiddleware, controllers.qr_address)

router.get('/question_sort', validationMiddleware, controllers.question_sort)
// router.get('/question_sort', controllers.question_sort)

router.get('/storeFriendsNetwork', validationMiddleware, controllers.storeFriendsNetwork)

router.get('/getRankFriendsData', validationMiddleware, controllers.getRankFriendsData)

router.get('/getRankGlobalData', validationMiddleware, controllers.getRankGlobalData)

router.get('/storeUser_network', validationMiddleware, controllers.storeUser_network)

router.get('/upDateUser_networkFromClickId', validationMiddleware, controllers.upDateUser_networkFromClickId)


router.get('/upDateShareInfoToUser_network', validationMiddleware, controllers.upDateShareInfoToUser_network)


module.exports = router
