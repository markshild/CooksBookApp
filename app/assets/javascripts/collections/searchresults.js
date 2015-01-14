CooksBookApp.Collections.SearchResults = Backbone.Collection.extend({

  url: "api/recipes/search",

  model: CooksBookApp.Models.Recipe,

  parse: function (resp) {
    this._pages = resp.pages;

    return resp.recipes;
  }

});
