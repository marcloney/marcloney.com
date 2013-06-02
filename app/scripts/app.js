/*global Ember, DS*/

var App = window.App = Ember.Application.create();

require('app/scripts/routes/*');
require('app/scripts/controllers/*');
require('app/scripts/models/*');
// require('app/scripts/views/*');

App.Router.map(function() {
  this.resource('posts');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
  this.resource('contact');
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.RESTAdapter.extend({
    url: 'http://localhost:3000'
  })
});