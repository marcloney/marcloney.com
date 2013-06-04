/*global App,Ember*/

App.IndexRoute = Ember.Route.extend({
  events: {
    /**
     * TODO
     * Need to incorporate linkBlog/linkContact into a single function (pull transition from data-transition or href).
     **/
     
    linkBlog: function() {
      var self = this;
      
      $("header").animate({
        "height": "50px"
      }, 500, function() {
        $("section").slideUp();
        $(this).find("h1").remove();
        $(this).find("h2, nav").fadeIn(500, function() {
            /**
     * TODO
     * Need to transition to the last post rather than manually specifying.
     **/
     
          self.transitionTo('posts.post', App.Post.find(2));
        });
      });
    },
    
    linkContact: function() {
      var self = this;
      
      $("body").animate({
          "backgroundColor": "#9B59B6"
        }, 500);
        
      $("header").animate({
        "height": "50px",
        "backgroundColor": "#8E44AD"
      }, 500, function() {
        $("section").slideUp();
        
        $(this).find("h1").remove();
        $(this).find("h2, nav").fadeIn(500, function() {
          self.transitionTo('contact');
        });
      });
    }
  }
});
