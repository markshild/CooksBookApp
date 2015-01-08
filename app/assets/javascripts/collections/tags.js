CooksBookApp.Collections.Tags = Backbone.Collection.extend({

  model: CooksBookApp.Models.Tag,
  url: '/api/tags',

  getOrFetch: function (id) {
    var model = this.get(id),
    tags = this;

    if(model) {
      model.fetch();
    } else {
      model = new CooksBookApp.Models.Tag({ id: id });
      model.fetch({
        success: function () {
          tags.add(model);
        },
      });
    }

    return model;
  },
});
