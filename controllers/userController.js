const User = require("../models/userSchema")
const bcrypt =require("bcrypt")
const {validate} =require("../config/validator")
const {generateToken} =require("../utils/generateToken")

// adding a user

const addUser = async (req, res) => {
    const { username, email, password } = req.body;
    const vaild = await validate({ username, email, password});
    if (vaild) {

        const hashedPassword =await bcrypt.hash(vaild.password, 8)
        const savedUser = await User.create({
            username,
            email,
            password,hashedPassword,
        });
if (User) {
    res.status(201).json({
    Username: User.username,
    email: User, email,
    id: User._id,
    token: generateToken(User._id)
    });
}


        res.status(201).json({
            success: true,
            message: "user created",
            savedUser,
        });
    } else {
        res.status(400).json({
            error: true,
            message: "Invaild data",
        });
    }
 };
 // user login
 async function loginUser(req, res) {
    try {
        const { email,password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
               error:true,
               message:"Account not found",
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res .status(400).json({
                error: true,
                message: "Invalid password",
            });
        }

        return res.status(200).send({
            seccess:true,
            message: "User logged in",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "couldn't login. please try again.",
        });
    }
 }

 //getting a user
 const getUsers= async(req, res) => {
    const user = await User.find();
    res.status(200).json(user);
 }

 module.exports={ addUser, loginUser, getUsers }

