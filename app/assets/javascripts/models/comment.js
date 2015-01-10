CooksBookApp.Models.Comment = Backbone.Model.extend({
  urlRoot: '/api/comments',

  toJSON: function() {
    return { comment: _.clone( this.attributes ) }
  },

  initialize: function (options) {
    // this.recipe = options.recipe;
  }

});
