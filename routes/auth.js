const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
        req.body.password, 
        process.env.PASSWORD_KEY
        ).toString(),  //cryptoJS to encrypt password
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }   catch(err) {
        res.status(500).json(err);
    }
});

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Invalid Username");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_KEY
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword !== req.body.password && 
            res.status(401).json("Invalid Password");

            const accessToken = jwt.sign({ //create access token
                id: user._id,
                isAdmin: user.isAdmin,

            },  
            process.env.JWT_KEY,
            {expiresIn:"3d"} // access token expires in 3 days
            );

        const { password, ...others } = user._doc; // makes it so password doesn't send to show

        res.status(200).json({...others, accessToken});

    }   catch (err) {
        res.status(500).json(err)
    }
}); 

//export router
module.exports = router