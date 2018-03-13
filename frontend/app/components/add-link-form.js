import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['form-horizontal'],
  store: Ember.inject.service(),

  urlExists: Ember.computed.notEmpty('url'),

  actions: {
    addLink(tag) {
      let store = this.get('store');
      let link = store.createRecord('link', {
        title: this.get('title'),
        url: this.get('url'),
        tag: tag
      });
      link.save().then(() => {
        this.set('url', '');
      },
      function(res) {
        link.deleteRecord();
        alert(res.errors);
      });
    }
  }
});
