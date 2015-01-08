CooksBookApp.Models.Comment = Backbone.Model.extend({
  urlRoot: '/api/comments',

  initialize: function (models, options) {
    this.recipe = options.recipe;
  }

});
