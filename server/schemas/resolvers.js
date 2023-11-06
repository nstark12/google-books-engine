const { User } = require('../models')
const { GraphQLError } = require('graphql')

const resolvers = {
    Query: {
        getSingleUser: async (parent, { _id, username }, contextValue, info) => {
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
        createUser: async (parent, args, contextValue, info) => {
            
        },
        login: async (parent, args, contextValue, info) => {
            
        },
        saveBook: async (parent, args, contextValue, info) => {
            
        },
        deleteBook: async (parent, args, contextValue, info) => {
            
        }
    }
}

module.exports = resolvers

