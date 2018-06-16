AppManager.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'home': 'home',
    'page1': 'showPage1',
    'page2': 'showPage2'
  }
});
