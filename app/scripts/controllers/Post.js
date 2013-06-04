/*global App, Ember*/

App.PostsPostController = Ember.ObjectController.extend({
  
  /**
   * TODO
   * Need to incorporate << Prev | Next >> buttons into posts.
   **/
  
  needs: ['posts'],
  nextPost: function() {
    this.advancePost(1);
  },
  previousPost: function() {
    this.advancePost(-1);
  },
  advancePost: function(delta) {
    var posts = this.get('controllers.posts'),
        index = posts.indexOf(this.get('content')) + delta;
    if (index >= 0 && index <= posts.get('length')-1) {
      this.transitionToRoute('posts.post', posts.objectAt(index));
    }
  },
  
  day: function() {
    var date = new Date(this.get('model.date'));
    
    return date.getDate();
  }.property('model.day'),
  month: function() {
    var date = new Date(this.get('model.date'))
      , months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    
    return months[date.getMonth()];
  }.property('model.month'),
  year: function() {
    var date = new Date(this.get('model.date'));
    
    return date.getFullYear();
  }.property('model.year')
});