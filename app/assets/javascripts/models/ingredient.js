CooksBookApp.Models.Ingredient = Backbone.Model.extend({
  urlRoot: '/api/ingredients',

  initialize: function (options) {
    this.recipe = options.recipe;
  }

});
