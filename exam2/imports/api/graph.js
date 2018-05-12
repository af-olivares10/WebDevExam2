import {Mongo} from "meteor/mongo";

export const Graphi = new Mongo.Collection("graphs");
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('graphs', function tasksPublication() {
    return Graphi.find();
  });
}
Meteor.methods({
  'comments.insert'(graph) {
    Graphi.insert(graph);
  },
});
