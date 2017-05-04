import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],
  store: Ember.inject.service(),

  noUrl: Ember.computed.empty('url'),

  actions: {
    addLink(tag) {
      let store = this.get('store');
      let link = store.createRecord('link', {
        title: this.get('title'),
        url: this.get('url'),
        tag: tag
      });
      link.save().then(function() {
        return;
      },
      function(res) {
        link.deleteRecord();
        alert(res.errors);
      });
    }
  }
});
