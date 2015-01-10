CooksBookApp.Models.Tag = Backbone.Model.extend({
  urlRoot: '/api/tags',

  toJSON: function() {
    return { tag: _.clone( this.attributes ) }
  },

  initialize: function (options) {
    this.recipe = options.recipe;
  }

});
