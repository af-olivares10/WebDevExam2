import { assert } from 'meteor/practicalmeteor:chai';

import {Meteor} from "meteor/meteor";
import {Ball} from "./ball"

if (Meteor.isServer) {
  describe("balls", () => {

    describe("balls.insert", () => {

      let nBall = {};
      nBall.p1 = "nickname";
      nBall.p2 = "nickname2";
      nBall.users = 2;
      nBall.private = true;
      nBall.winner = "";
      beforeEach(()=>{
        Ball.insert(nBall);
      });

      it("should insert a ball", () => {
        let ball = Ball.findOne({p1:"nickname"});
        assert.equal(nBall.p2, ball.p2);
      });
    });

    describe("balls.update", () => {

      let nBall = {};
      nBall.p1 = "nickname3";
      nBall.p2 = "nickname4";
      nBall.users = 2;
      nBall.private = true;
      nBall.winner = "";
      beforeEach(()=>{
        Ball.insert(nBall);
      });

      it("should update a ball", () => {
        let ball = Ball.findOne({p1:"nickname3"});
        ball.private = false;
        Meteor.call("balls.update",ball);
        let ballN = Ball.findOne({p1:"nickname3"});
        assert.equal(false, ballN.private);
      });
    });



  });
}
