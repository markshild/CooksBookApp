window.CooksBookApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new CooksBookApp.Routers.Router({$rootEl.});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  CooksBookApp.initialize();
});
