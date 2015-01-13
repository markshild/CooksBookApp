CooksBookApp.Models.User = Backbone.Model.extend({
  url: '/api/users/current',


  recipes: function () {
    if(!this._recipes) {
      this._recipes = new CooksBookApp.Collections.Recipes([]);
    }

    return this._recipes;
  },

  favorites: function () {
    if(!this._favorites) {
      this._favorites = new CooksBookApp.Collections.Recipes([]);
    }

    return this._favorites;
  },


  parse: function (response) {
    if(response.recipes) {
      this.recipes().set(response.recipes, { parse: true });
      delete response.recipes;
    }
    if(response.favorites) {
      this.favorites().set(response.favorites, {parse: true});
      delete response.favorites;
    }

    return response;
  }
});
