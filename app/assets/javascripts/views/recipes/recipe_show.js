CooksBookApp.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST['recipes/show'],

  className: 'recipes-show',

  initialize: function () {
    this.comments = this.model.comments();
    this.ingredients = this.model.ingredients();
    this.tags = this.model.tags();
    this.directions = this.model.directions();
    this.listenTo(this.model, 'sync change reset', this.render);
  },

  events: {
    "click .delete": "deleteRecipe",
    "click .add-favorite": "addFavorite",
    "click .delete-favorite": "deleteFavorite"
  },

  render: function () {
    var content = this.template({
      recipe: this.model,
      current_id: CooksBookApp.currentUserId
    });
    this.$el.html(content);
    this.addIngredients(this.ingredients);
    this.addDirections(this.directions);
    this.addTags(this.tags);
    this.addComments(this.comments);
    this.renderCommentForm();
    return this;
  },

  deleteRecipe: function (event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true})
  },

  favorite: function () {

  },

  deleteRecipe: function (event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true})
  },

  addIngredients: function (ingredients) {
    var view = new CooksBookApp.Views.IngredientShow({
      collection: ingredients
    });
    this.addSubview('#ingredient', view);
  },

  addDirections: function (directions) {
    var view = new CooksBookApp.Views.DirectionShow({
      collection: directions
    });
    this.addSubview('#direction', view);
  },

  addTags: function (tags) {
    var view = new CooksBookApp.Views.TagShow({
      collection: tags
    });
    this.addSubview('#tag', view);
  },

  addComments: function (comments) {
    var view = new CooksBookApp.Views.CommentShow({
      collection: comments
    });
    this.addSubview('#comment', view);
  },

  renderCommentForm: function () {
    var view = new CooksBookApp.Views.CommentForm({
      collection: this.comments,
      recipe: this.model
    });
    this.addSubview('#comment-form', view);
  }
});
