import Ember from 'ember';

export default Ember.Component.extend({
  filters: [],
  showArchived: false,
  store: Ember.inject.service(),

  didRender() {
    setInterval(() => {
      const lastLinkId = this.get('sortedLinks.firstObject.id');
      if (lastLinkId) {
        const store = this.get('store');
        store.query('link', { filter: { last_link_id: lastLinkId } }).then((newLinks) => {
          this.get('links').addObjects(newLinks);
        });
      }
    }, 6000);
  },

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
  favedActive: Ember.computed('filters.[]', function() {
    return this.get('filters').includes('FAVED');
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

  sortedLinksWithDateRows: Ember.computed('sortedLinks.[]', function() {
    let links = [];
    let lastDay = -1;
    this.get('sortedLinks').forEach(function(link) {
      let currentDay = link.get('createdAt').getDay();
      if (currentDay !== lastDay) {
        links.push(Ember.Object.create({
          date: link.get('createdAt')
        }));
        lastDay = currentDay;
      }
      links.push(link);
    });
    return links;
  }),

  filteredSortedLinks: Ember.computed('sortedLinksWithDateRows', 'filters.[]', function() {
    let links;
    if (this.get('filters').includes('FAVED')) {
      links = this.get('sortedLinksWithDateRows').filter((link) => { return link.get('faved'); });
    } else {
      links = this.get('sortedLinksWithDateRows')
    }
    if (!this.get('filters').without('FAVED').length) { return links; }
    return links.filter((link) => { return this.get('filters').includes(link.get('tag')); });
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

    archive(link) {
      $(event.target.parentElement.parentElement).slideUp(function() {
        link.set('archived', true);
        link.save();
      });
    },

    toggleFave(link) {
      link.set('faved', !link.get('faved'))
      link.save();
    }
  }
});
