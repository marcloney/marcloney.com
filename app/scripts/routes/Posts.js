/*global App,Ember*/

App.PostsIndexRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
});

App.PostsPostRoute = Ember.Route.extend({
  model: function(params) {
    return App.Post.find(params.post_id);
  }
});