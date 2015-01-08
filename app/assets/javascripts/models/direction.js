CooksBookApp.Models.Direction = Backbone.Model.extend({
  urlRoot: '/api/directions',

  initialize: function (models, options) {
    this.recipe = options.recipe;
  }

});
