CooksBookApp.Models.Ingredient = Backbone.Model.extend({
  urlRoot: '/api/ingredients',

  toJSON: function() {
    return { ingredient: _.clone( this.attributes ) }
  },

  initialize: function (options) {
    this.recipe = options.recipe;
  }

});
