const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    // function for our authenticated routes
    //modifying how token is retrieved from request object, b.c. GraphQL uses authorization headers with bearer token.
    authMiddleware: function (req) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }   
        if (!token) {
            return req;
        }
        // verify token and get user data out of it
        try {
            const {data} = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        return req;
    },
    //next fxn removed, graphql has its own resolver.
    
    signToken: function ({username, email, _id}) {
        const payload = {username, email, _id};
        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
};

        
