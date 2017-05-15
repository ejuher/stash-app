import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  title: DS.attr('string'),
  tag: DS.attr('string'),
  createdAt: DS.attr('date'),
  archived: DS.attr('boolean', { defaultValue: false }),

  hasCreatedAt: Ember.computed('createdAt', function() {
    return this.get('createdAt') !== undefined;
  }),

  tagEmoji: Ember.computed('tag', function() {
    let tag = this.get('tag');
    if (tag === 'AUDIO') {
      return '🎷';
    } else if (tag === 'VIDEO') {
      return '📼';
    } else if (tag === 'ARTICLE') {
      return '📰';
    } else if (tag === 'OTHER') {
      return '💁🏼';
    }
  })
});
