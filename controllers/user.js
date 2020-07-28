const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
         if(err || !user){
             return res.status(400).json({
                error: "No user was found in the DB"
             });
         }
         req.profile = user;
         next();
    });
};

exports.getUser = (req, res) => {
    // TODO: get back here for password
    req.profile.salt  = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req, res) => {
 User.findByIdAndUpdate(
     {_id: req.profile._id},
     {$set: req.body},
     {new: true, useFindAndModify: false},
     (err, user) => {
         if(err){
             return res.status(400).json({
                error: "You are not authorised to upate the user"
             });
         }
        user.salt  = undefined;
        user.encry_password = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
         res.json(user);
     }
 )
};

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No order found for this user"
            });
        }
        return res.json(order);
    });

};
