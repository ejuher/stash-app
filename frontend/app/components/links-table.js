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
    if (a.get('createdAt') === undefined) { return -1; } // a comes first
    if (b.get('createdAt') === undefined) { return 1; } // b comes first
    if (b.get('createdAt').getTime() > a.get('createdAt').getTime()) { return 1; } else { return -1; }
  }),

  filteredSortedLinks: Ember.computed('sortedLinks', 'filters.[]', function() {
    if (!this.get('filters.length')) { return this.get('sortedLinks'); }
    return this.get('sortedLinks').filter((link) => {
      return this.get('filters').includes(link.get('tag'));
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
