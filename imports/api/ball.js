import {Mongo} from "meteor/mongo";

export const Ball = new Mongo.Collection("Ball");
Meteor.methods({
  'balls.findOne'(id) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    return Ball.findOne({});
  },
  'balls.update'(nBall) {
    Ball.update(nBall._id,nBall);
  },
  'balls.insert'(nBall) {
    return Ball.insert(nBall);
  },
});
