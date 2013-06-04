/*global Ember, DS*/

var App = window.App = Ember.Application.create({
  LOG_TRANSITIONS: true  
});

require('app/scripts/routes/*');
require('app/scripts/controllers/*');
require('app/scripts/models/*');
require('app/scripts/views/*');

App.Router.map(function() {
  this.resource('posts', function() {
    this.resource('posts.post', { path: ':post_id' });
  });
  
  this.resource('contact');
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    //url: 'http://localhost:8080/api/1.0'
    url: 'http://www.marcloney.com/api/1.0'
  })
});