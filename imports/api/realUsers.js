import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


export const rUser = new Mongo.Collection('usersData');



if (Meteor.isServer) {
  Meteor.publish('userData', function () {
    if (this.userId) {
      return Meteor.users.find({ _id: this.userId }, {
        fields: { other: 1, things: 1 }
      });
    } else {
      this.ready();
    }
  });
}
