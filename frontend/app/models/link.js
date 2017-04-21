import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  title: DS.attr('string'),
  tag: DS.attr('string'),
  createdAt: DS.attr('date', { serialize: false }) // not working :<
});
