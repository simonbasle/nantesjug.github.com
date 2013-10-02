"use strict";angular.module("nantesjugApp",["ui.gravatar"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/events",{templateUrl:"views/events.html",controller:"EventsCtrl"}).when("/events/:eventId",{templateUrl:"views/event.html",controller:"EventCtrl"}).when("/speakers",{templateUrl:"views/speakers.html",controller:"SpeakersCtrl"}).when("/speakers/:speakerId",{templateUrl:"views/speaker.html",controller:"SpeakerCtrl"}).when("/infos",{templateUrl:"views/infos.html"}).otherwise({redirectTo:"/"})}]);var njFunction=function(){var a=njEvents,b=njSpeakers,c=njPlaces,d={getToday:function(){var a=new Date;return a.setHours(0),a.setMinutes(0),a.setSeconds(0),a},getEvents:function(){return a},getNextEvent:function(){return _.first(d.getNextEvents())},getNextEvents:function(){var b=d.getToday();return _.filter(a,function(a){return a.date>b})},getPreviousEvents:function(){var b=d.getToday();return _.filter(a,function(a){return a.date<=b})},getEvent:function(b){return _.find(a,function(a){return a.id===b})},getSpeakers:function(){return b},getSpeaker:function(a){return _.find(b,function(b){return b.id===a})},getPlace:function(a){return _.find(c,function(b){return b.id===a})}},e=function(a){a.place=d.getPlace(a.place),_.each(a.subjects,function(a){f(a)})},f=function(a){a.speakers=_.map(a.speakers,function(a){return d.getSpeaker(a)})};return _.each(a,function(a){e(a)}),d},nj=njFunction();angular.module("nantesjugApp").controller("MenuCtrl",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path()}}]).controller("MainCtrl",["$scope",function(a){a.event=nj.getNextEvent(),a.today=nj.getToday();var b={};null!==a.event&&(b[a.event.id]=!0),a.eventDetailledView=b,a.eventToggleViewDisabled=!0}]).controller("EventsCtrl",["$scope",function(a){a.today=nj.getToday(),a.nextEvents=nj.getNextEvents(),a.previousEvents=nj.getPreviousEvents();var b={};a.nextEvents.forEach(function(a){b[a.id]=!1}),a.previousEvents.forEach(function(a){b[a.id]=!1}),a.eventDetailledView=b,a.eventToggleViewDisabled=!1,a.toggleDetail=function(b){a.eventDetailledView[b]=!a.eventDetailledView[b]}}]).controller("EventCtrl",["$scope","$routeParams",function(a,b){var c=parseInt(b.eventId,10);a.event=nj.getEvent(c),a.today=nj.getToday();var d={};d[a.event.id]=!0,a.eventDetailledView=d,a.eventToggleViewDisabled=!1,a.toggleDetail=function(b){a.eventDetailledView[b]=!a.eventDetailledView[b]}}]).controller("SpeakersCtrl",["$scope",function(a){a.speakers=nj.getSpeakers(),a.searchText=""}]).controller("SpeakerCtrl",["$scope","$routeParams",function(a,b){var c=nj.getSpeaker(b.speakerId);a.speaker=c}]);