import Ember from 'ember';

export default Ember.Component.extend({
  filters: [],

  audioActive: Ember.computed('filters.[]', function() {
    return this.get('filters').includes('AUDIO');
  }),
  videoActive: Ember.computed('filters.[]', function() {
    return this.get('filters').includes('VIDEO');
  }),
  articleActive: Ember.computed('filters.[]', function() {
    return this.get('filters').includes('ARTICLE');
  }),
  otherActive: Ember.computed('filters.[]', function() {
    return this.get('filters').includes('OTHER');
  }),

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

  filteredSortedLinks: Ember.computed('sortedLinks', 'filters.[]', function() {
    var that = this;
    if (!this.get('filters.length')) { return this.get('sortedLinks'); }
    return this.get('sortedLinks').filter(function(link) {
      return that.get('filters').includes(link.get('tag'));
    });
  }),

  actions: {
    goToLink(link) {
      window.open(link.get('url'));
    },

    toggleFilter(filter) {
      if (this.get('filters').includes(filter)) {
        this.get('filters').removeObject(filter);
      } else {
        this.get('filters').addObject(filter);
      }
    }
  }
});
