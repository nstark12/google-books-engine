const { User } = require('../models')
const { GraphQLError } = require('graphql')
const { signToken } = require('../utils/auth')

const resolvers = {
    Query: {
        getSingleUser: async (parent, { _id, username }, contextValue, info) => {

            // TODO: Make sure user is authenticated

            const foundUser = await User.findOne({
                $or: [{ _id }, { username }],
              });
          
              if (!foundUser) {
                throw new GraphQLError('Cannot find a user with this id', {
                    extensions: {
                        code: 'NO_USER_FOUND'
                    }
                })
              }
          
              return foundUser;
        },
    },
    Mutation: {
        createUser: async (parent, { user }, contextValue, info) => {
            const newUser = await User.create(user);

            if (!newUser) {
              throw new GraphQLError('Something is wrong!', {
                extensions: {
                    code: 'ERROR_CREATING_USER'
                }
              })
            }
            const token = signToken(newUser);
            return { token, user };
        },
        login: async (parent, { username, email, password }, contextValue, info) => {
            const user = await User.findOne({ $or: [{ username }, { email }] });
            
            if (!user) {
                throw new GraphQLError('Cannot find this user', {
                    extensions: {
                        code: 'LOGIN_ERROR'
                    }
                })
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new GraphQLError('Wrong password', {
                    extensions: {
                        code: 'LOGIN_ERROR'
                    }
                })
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { _id, book }, contextValue, info) => {
            // TODO: Make sure user is authenticated
            try {
                const updatedUser = await User.findOneAndUpdate(
                  { _id },
                  { $addToSet: { savedBooks: book } },
                  { new: true, runValidators: true }
                );
                return updatedUser

              } catch (err) {
                console.log(err);
                throw new GraphQLError('Error saving book')
              }
        },
        deleteBook: async (parent, { _id, bookId }, contextValue, info) => {
            // TODO: Make sure user is authenticated
            const updatedUser = await User.findOneAndUpdate(
                { _id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
              );

              if (!updatedUser) {
                throw new GraphQLError('Error deleting book', {
                    extensions: {
                        code: 'USER_NOT_FOUND'
                    }
                })
              }
              return updatedUser
        }
    }
}

module.exports = resolvers

