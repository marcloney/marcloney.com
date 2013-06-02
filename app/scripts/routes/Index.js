/*global App,Ember*/

App.IndexRoute = Ember.Route.extend({
  setupController: function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var height = $(window).height() - 200;
    
      $("header").css({
        "height": height + "px"
      });
        
      $("header h1").css({
        "line-height": height + "px"
      });
    });
  },
  
  events: {
    linkBlog: function() {
      var self = this;
      
      $("header").animate({
        "height": "50px"
      }, 500, function() {
        $("section").slideUp();
        $(this).find("h1").remove();
        $(this).find("h2, nav").fadeIn(500, function() {
          self.transitionTo('posts');
        });
      });
      
      
    }
  }
});
