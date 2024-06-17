const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // JWTs
        const accessToken = jwt.sign(
            {  "userId": foundUser._id, "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120s' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // current user and refresh token
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);


        res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000}); // (remove "secure: true" if is not https) for now I added due a "mark cross-site cookies as secure to allow setting them in cross-site contexts" error
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };