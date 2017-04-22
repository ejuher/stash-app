import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],

  sortedLinks: Ember.computed.sort('links', function(a, b) {
    // b.createdAt is not defined at the instant the link is created
    if (b.get('createdAt') === undefined || b.get('createdAt').getTime() > a.get('createdAt').getTime()) {
      // b comes before a
      return 1; 
    } else { 
      // a comes before b
      return -1;
    }
    return 0;
  }),

  actions: {
    goToLink(link) {
      window.open(link.get('url'));
    }
  }
});
