import Ember from 'ember';

export default Ember.Component.extend({
  filters: [],

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

  filteredSortedLinks: Ember.computed('sortedLinks', 'filters', function() {
    var that = this;
    return this.get('sortedLinks').filter(function(link) {
      return that.get('filters').includes(link.get('tag'));
    });
  }),

  actions: {
    goToLink(link) {
      window.open(link.get('url'));
    },

    toggleFilter(filter) {
      this.get('filters').addObject(filter);
    }
  }
});
