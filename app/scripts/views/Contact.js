/*global Ember, App*/
App.ContactView = Ember.View.extend({
  didInsertElement: function() {
    $("body").css({
      "backgroundColor": "#9B59B6"
    });
  }
});