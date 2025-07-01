const router = require('express').Router()
const {
    loginHandler,
    registerHandler,
    validateHandler,
    forgetPasswordHandler
} = require("../controllers/UserControllers")


router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/validate', validateHandler);
router.post('/forget-password', forgetPasswordHandler);


module.exports = router