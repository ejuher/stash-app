import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['row'],

  actions: {
    goToLink(link) {
      document.location.assign(link.get('url'));
    }
  }
});
