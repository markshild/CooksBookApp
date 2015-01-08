CooksBookApp.Collections.Recipes = Backbone.Collection.extend({

  model: CooksBookApp.Models.Recipe,
  url: '/api/recipes',

  getOrFetch: function (id) {
    id = parseInt(id)
    var model = this.get(id),
    recipes = this;

    if(model) {
      model.fetch();
    } else {
      model = new CooksBookApp.Models.Recipe({ id: id });
      model.fetch({
        success: function () {
          recipes.add(model);
        },
      });
    }

    return model;
  },
});

CooksBookApp.recipes = new CooksBookApp.Collections.Recipes();
