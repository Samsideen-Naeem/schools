const {route, Router} = require("express")
const {addUser, loginUser, getUsers} = require("../controllers/userController")

const router = Router();

router.post("/register", addUser).post('/login', loginUser)


router.route('/').get(getUsers)

module.exports =router