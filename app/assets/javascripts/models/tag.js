CooksBookApp.Models.Tag = Backbone.Model.extend({
  urlRoot: '/api/tags',

  initialize: function (options) {
    this.recipe = options.recipe;
  }

});
