CooksBookApp.Collections.Ingredients = Backbone.Collection.extend({

  model: CooksBookApp.Models.Ingredient,
  url: '/api/ingredients',

  getOrFetch: function (id) {
    var model = this.get(id),
    ingredients = this;

    if(model) {
      model.fetch();
    } else {
      model = new CooksBookApp.Models.Ingredient({ id: id });
      model.fetch({
        success: function () {
          ingredients.add(model);
        },
      });
    }

    return model;
  },
});
