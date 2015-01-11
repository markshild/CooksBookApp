CooksBookApp.Models.Tag = Backbone.Model.extend({
  urlRoot: '/api/tags',

  toJSON: function() {
    return { tag: _.clone( this.attributes ) }
  },

  initialize: function (options) {
    this.recipe = options.recipe;
  },

  parse: function (response) {
    if(response.recipes) {
      this.recipes().set(response.recipes, { parse: true });
      delete response.recipes;
    }
    return response;
  },

  recipes: function () {
    if(!this._recipes) {
      this._recipes = new CooksBookApp.Collections.Recipes([], { tag: this });
    }

    return this._recipes;
  }

});
