import Ember from 'ember';

export default Ember.Component.extend({
  filters: [],
  newLinks: [],
  showArchived: false,
  store: Ember.inject.service(),

  didRender() {
    setInterval(() => {
      const lastLinkId = this.get('sortedLinks.firstObject.id');
      const store = this.get('store');
      store.query('link', { filter: { last_link_id: lastLinkId } }).then((links) => {
        this.set("newLinks", links);
      });
    }, 6000)
  },

  // try putting all the new link stuff into its own component
  // give the component the links variable, the component must compute the startTime from that list
  // does it need to be a computed property. it should work: try it.
  // when newLinks isnt empty, display the newLinks bar with a count of newLinks.length
  // "View #{newLinks.length} new links"
  // when the newLinks bar is clicked on, add all the newLinks to links, then set newLinks to empty array

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

  sortedLinks: Ember.computed.sort('archiveFilteredLinks', function(a, b) {
    if (a.get('createdAt') === undefined) { return -1; } // a comes first
    if (b.get('createdAt') === undefined) { return 1; } // b comes first
    if (b.get('createdAt').getTime() > a.get('createdAt').getTime()) { return 1; } else { return -1; }
  }),

  archiveFilteredLinks: Ember.computed('links.@each.archived', 'showArchived', function() {
    return this.get('links').filter((link) => {
      return !link.get('archived') || this.get('showArchived');
    });
  }),

  filteredSortedLinks: Ember.computed('sortedLinks', 'filters.[]', function() {
    if (!this.get('filters.length')) { return this.get('sortedLinks'); }
    return this.get('sortedLinks').filter((link) => {
      return this.get('filters').includes(link.get('tag'));
    });
  }),

  actions: {
    toggleFilter(filter) {
      if (this.get('filters').includes(filter)) {
        this.get('filters').removeObject(filter);
      } else {
        this.get('filters').addObject(filter);
      }
    },

    toggleShowArchived() {
      this.set('showArchived', !this.get('showArchived'));
    },

    archiveLink(link) {
      $(event.target.parentElement.parentElement).slideUp(function() {
        link.set('archived', true);
        link.save();
      });
    }
  }
});
