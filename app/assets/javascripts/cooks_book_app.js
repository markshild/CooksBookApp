window.CooksBookApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new CooksBookApp.Routers.Router({$rootEl: $('body')});
    Backbone.history.start();
  }
};

$(document).ready(function(){
  CooksBookApp.initialize();
});
