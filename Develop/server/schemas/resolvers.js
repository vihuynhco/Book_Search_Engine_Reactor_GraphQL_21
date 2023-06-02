const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    //query for me, returns user data if user is logged in
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: context.user._id})
        //removes password and __v from user data
          .select('-__v -password')
          .populate('savedBooks');
        return userData;
      }
      //if no user data, throw auth error
      throw new AuthenticationError("You need to be logged in!");
    },
  },
    Mutation: {
      //to add user: destructure username, email, and password from args
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            //token is equal to sign token function
            const token = signToken(user);
            //retunrs both user and token
            return {token, user};   
        },
        login: async (parent, {email, password}) => {
          //locate user by email
            const user = await User.findOne({email});
            //if email is not found, throw auth error
            if (!user) {
                throw new AuthenticationError("No user found with this email address");
            }
            //correctPW is equal to isCorrectPassword function
            const correctPw = await user.isCorrectPassword(password);
            //if password is not correct, throw auth error
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            //token is equal to sign token function
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {savedBooks}, context) => {
          if (context.user) {
            const updatedBooks = await User.findOneAndUpdate(
              {_id: context.user._id},
              {$addToSet: {savedBooks: savedBooks}},
              {new: true}
            ).populate('savedBooks');
            return updatedBooks;
          }
          throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, {bookId}, context) => {
      if (context.user) {
        const updatedBooks = await User.findOneAndUpdate(
          {_id: context.user._id},
          {$pull: {savedBooks: {bookId: bookId}}},
          {new: true}
        );
        return updatedBooks;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};


module.exports = resolvers;