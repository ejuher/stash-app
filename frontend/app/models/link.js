import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  title: DS.attr('string'),
  tag: DS.attr('string'),
  createdAt: DS.attr('date', { serialize: false }), // not working :<

  tagEmoji: Em.computed('tag', function() {
    let tag = this.get('tag')
    if (tag === 'AUDIO') {
      return '🎷'
    } else if (tag === 'VIDEO') {
      return '📼'
    } else if (tag === 'ARTICLE') {
      return '📰'
    } else if (tag === 'OTHER') {
      return '🤷‍'
    }
  })
});
