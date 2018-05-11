import {Mongo} from "meteor/mongo";

export const User = new Mongo.Collection("userstemp");

Meteor.methods({
  'users.findOne'(nickname) {
    return User.findOne({nickname});
  },
  'users.update'(user) {
    User.update(user._id,user);
  },
  'users.insert'(user) {
    return User.insert(user);
  },
});
