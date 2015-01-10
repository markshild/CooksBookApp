CooksBookApp.Models.Direction = Backbone.Model.extend({
  urlRoot: '/api/directions',

  toJSON: function() {
    return { direction: _.clone( this.attributes ) }
  },

  initialize: function (options) {
    this.recipe = options.recipe;
  }

});
