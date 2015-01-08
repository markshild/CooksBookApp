CooksBookApp.Models.Tags = Backbone.Model.extend({
  urlRoot: '/api/tags',

  initialize: function (models, options) {
    this.recipe = options.recipe;
  }

});
