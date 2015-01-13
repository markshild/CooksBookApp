CooksBookApp.Models.Favorite = Backbone.Model.extend({
  urlRoot: '/api/favorites',

  toJSON: function() {
    return { favorite: _.clone( this.attributes ) }
  },

  initialize: function (options) {
    // this.recipe = options.recipe;
  }

});
