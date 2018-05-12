import {Mongo} from "meteor/mongo";

export const Ball = new Mongo.Collection("Ball");
Meteor.methods({
  'findagencies'() {
    try {
      const result = HTTP.call('GET', 'http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList');
      return result.data;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      return {};
    }
  },
  'findRoutesByAgency'(agency) {
    try {
      const result = HTTP.call('GET', 'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a='+agency.agency);
      return result.data;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      return {};
    }
  },
  'findRoutesByAgencyAndRoute'(obj) {
    try {
      const result = HTTP.call('GET', 'http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a='+obj.agency+'&r='+obj.route);
      return result.data;
    } catch (e) {
      // Got a network error, timeout, or HTTP error in the 400 or 500 range.
      return {};
    }
  },
});
