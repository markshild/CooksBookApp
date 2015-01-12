CooksBookApp.Views.TagShow = Backbone.View.extend({
  template: JST['tags/show'],

  initialize: function () {
    this.recipes = this.model.recipes();
  },

  events: {

  },

  render: function () {
    var content = this.template({ recipes: this.recipes });
    this.$el.html(content);
    return this;
  }
});
