CooksBookApp.Collections.Directions = Backbone.Collection.extend({

  model: CooksBookApp.Models.Direction,
  url: '/api/directions',

  getOrFetch: function (id) {
    var model = this.get(id),
    directions = this;

    if(model) {
      model.fetch();
    } else {
      model = new CooksBookApp.Models.Direction({ id: id });
      model.fetch({
        success: function () {
          directions.add(model);
        },
      });
    }
    
    return model;
  },
});
