const jwt = require('jsonwebtoken')
const User = require ('../models/userModel')

// Middleware to verify user authentication
const requireAuth = async (req, res, next) => {

    //verify authentication
    const {authorization} = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

// Middleware to verify admin authorization
const requireAdminAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Fetch the user and check if they are an admin
        const user = await User.findOne({ _id }).select('_id isAdmin');

        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }

        // Attach user info to the request object
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = { requireAuth, requireAdminAuth }