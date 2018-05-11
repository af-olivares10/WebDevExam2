import { assert } from 'meteor/practicalmeteor:chai';

import {Meteor} from "meteor/meteor";
import {User} from "./user"

if (Meteor.isServer) {
  describe("users", () => {

    describe("users.insert", () => {
      let nickname = "ps";
      beforeEach(()=>{
        User.insert({nickname,score:1,profile:"profile"});
      })
      it("should insert a user", () => {
        let user = User.findOne({nickname});
          assert.equal(1, user.score);
      });
    });
    describe("users.update", () => {
      let nickname = "p1";
      beforeEach(()=>{
        User.insert({nickname,score:0,profile:"profile"});
      })
      it("should update a user", () => {
        let user = User.findOne({nickname});
        user.score = 666;
        Meteor.call("users.update",user);
        let userN = User.findOne({nickname});
        assert.equal(666, userN.score);
      });
    });

  });
}
