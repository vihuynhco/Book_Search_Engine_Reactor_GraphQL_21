const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    // function for our authenticated routes
    //modifying how token is retrieved from request object, b.c. GraphQL uses authorization headers with bearer token.
    authMiddleware: function ({req}) {
        //allows token to be sent via headers
        const token = req.headers.authorization || '';
        //if token is bearer, remove bearer name (7) and by trimming removes spaces to ensure only token is extracted
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        // console.log(token);
        if(!token) {
            throw new Error('You are not logged in.')
        }

        try {
            const {data} = jwt.verify(token, secret, {maxAge: expiration});
            req.user = data;
        } catch (err) {
            console.log('Token is not valid');
            throw new Error('Token is not valid');
        }
    },
    //next fxn removed, graphql has its own resolver.
    
    signToken: function ({username, email, _id}) {
        const payload = {username, email, _id};
        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
};

        
