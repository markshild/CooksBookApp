window.CooksBookApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new CooksBookApp.Routers.Router({$rootEl: $('#container')});
    Backbone.history.start();
  }
};
