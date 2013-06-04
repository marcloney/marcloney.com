/*global App,DS*/

App.Post = DS.Model.extend({
  title: DS.attr('string'),
  tags: DS.attr('string'),
  blurb: DS.attr('string'),
  extended: DS.attr('string'),
  date: DS.attr('string')
});