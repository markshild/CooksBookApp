CooksBookApp.Views.RecipeForm = Backbone.CompositeView.extend({

  template: JST['recipes/form'],

  className: 'recipes-form',

  initialize: function () {
    this.comments = this.model.comments();
    this.tags = this.model.tags();
    this.ingredients = this.model.ingredients();
    this.directions = this.model.directions();
    this.listenTo(this.comments, 'add delete', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit': "submit"
  },

  render: function () {
    var content = this.template({
      recipe: this.model,
      tags: this.tags,
      ingredients: this.ingredients,
      directions: this.directions
    });
    this.$el.html(content);
    return this;
  },


});
