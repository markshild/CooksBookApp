CooksBookApp.Collections.Favorites = Backbone.Collection.extend({

  model: CooksBookApp.Models.Favorite,
  url: '/api/favorites',

  getOrFetch: function (id) {
    var model = this.get(id),
    favorites = this;

    if(model) {
      model.fetch();
    } else {
      model = new CooksBookApp.Models.Favorite({ id: id });
      model.fetch({
        success: function () {
          favorites.add(model);
        },
      });
    }

    return model;
  },
});
