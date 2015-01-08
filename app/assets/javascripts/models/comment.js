CooksBookApp.Models.Comment = Backbone.Model.extend({
  urlRoot: '/api/comments',

  initialize: function (options) {
    this.recipe = options.recipe;
  }

});
