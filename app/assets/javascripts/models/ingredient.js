CooksBookApp.Models.Ingredient = Backbone.Model.extend({
  urlRoot: '/api/ingredients',

  initialize: function (models, options) {
    this.recipe = options.recipe;
  }

});
