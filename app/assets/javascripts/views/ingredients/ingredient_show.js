CooksBookApp.Views.IngredientShow = Backbone.View.extend({
  template: JST['ingredients/show'],
  tagName: 'ul',

  events: {

  },

  render: function () {
    var content = this.template({ ingredients: this.collection });
    this.$el.html(content);
    return this;
  }
});
