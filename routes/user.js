const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password=  CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASSWORD_KEY
        ).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate
        (req.params.id, 
            {
                $set: req.body,
            }, 
            { new:true }
        );
        res.status(200).json(updatedUser);
    } catch(err) {
        res.status(500).json(err);
    }
});

//Delete method
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});

//Get method
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }catch (err) {
        res.status(500).json(err);
    }
});


//Get all users
router.get("/g", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query 
        ? await User.find().sort({ _id: -1 }).limit(5) //could find last 5 users created
        : await User.find(); // add ?new=true in 'get all users' request url
        res.status(200).json(users);
    }   catch (err) {
        res.status(500).json(err);
    }
});

//Get user Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); // return of last year

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte:lastYear } } },
            {
                $project:{
                    month: {$month: "$createdAt"} //assignment of month
                },
            },
            {
                $group:{
                    _id: "$month", 
                    total:{ $sum: 1 } // shows total created in month
                }
            }
        ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//export router
module.exports = router;



/* just a beginning test here
// req gets info from user, then send res to user
router.get("/usertest", (req,res)=>{
    res.send("user test success");
});

// localhost:5000/api/user/usertest
// specifically for user, can route to others

router.post("/userposttest", (req,res)=>{
    const username = req.body.username; //passing to server
    res.send("your username is: " + username);
});
*/

