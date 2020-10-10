const router = require('express').Router();
const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');

router.post('/register', async (req, res) => {
    // Validation Email
    if (!validator.isEmail(req.body.email)) {
        return res.send({ error: 'Email is not valid!' });
    };

    // Validation User
    const userIsExist = 
    await User.findOne({ email: req.body.email });
    
    if (userIsExist) {
        return res.status(400).send({ msg: 'Email already exist' });
    };

    // Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create User
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });

    try {
        user
        .save()
        .then((savedUser) => res.send(savedUser))
        .catch((err) => res.status(400).send({error: err}));
    } catch (err) {
        res.status(400).send(err);
    };
});

router.post('/login', async (req, res) => {
    // Check is user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ msg: 'Incorrect email' });

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ msg: 'Incorrect password' });


    const token = jwt.sign({_id: user._id}, config.jwtSecret);
    res.header('auth-token', token).send({
        accessToken: token,
        id: user._id,
        username: user.name,
        email: user.email,
        roles: user.roles,
    });
});

module.exports = router;