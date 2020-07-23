var express    = require("express"),
    router     = express.Router(); 
const { body, validationResult } = require('express-validator');
const {signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post("/signup",
[
    body("name", "name should be atleast 5 characters").isLength({min: 5}),
    body("email", "email is requires").isEmail(),
    body("password", "password should be atleast 5 characters").isLength({min: 5}),
], 
signup
);

router.post("/signin",
[
    body("email", "email is requires").isEmail(),
    body("password", "password field is required").isLength({min: 1}),
], 
signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A protected route");
});

module.exports = router;