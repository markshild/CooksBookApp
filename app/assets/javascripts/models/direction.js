CooksBookApp.Models.Direction = Backbone.Model.extend({
  urlRoot: '/api/directions',

  initialize: function (options) {
    this.recipe = options.recipe;
  }

});
