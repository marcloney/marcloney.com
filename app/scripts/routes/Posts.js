/*global App,Ember*/

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.Post.find();
  }
})

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return App.Post.find(params.post_id);
  }
})