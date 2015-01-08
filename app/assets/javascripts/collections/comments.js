CooksBookApp.Collections.Comments = Backbone.Collection.extend({

  model: CooksBookApp.Models.Comment,
  url: '/api/comments',

  getOrFetch: function (id) {
    var model = this.get(id),
    comments = this;

    if(model) {
      model.fetch();
    } else {
      model = new CooksBookApp.Models.Comment({ id: id });
      model.fetch({
        success: function () {
          comments.add(model);
        },
      });
    }

    return model;
  },
});
