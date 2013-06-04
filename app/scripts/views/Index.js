/*global Ember, App*/
App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    $("body").css({
      "backgroundColor": "#E74C3C"
    });
    
    var height = $(window).height() - 200;
    
    $("header").css({
      "height": height + "px"
    });
      
    $("header h1").css({
      "line-height": height + "px"
    });
  }
});