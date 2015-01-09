CooksBookApp.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST['recipes/show'],

  className: 'recipes-show',

  initialize: function () {
    this.comments = this.model.comments();
    this.tags = this.model.tags();
    this.ingredients = this.model.ingredients();
    this.directions = this.model.directions();
    this.listenTo(this.model, 'sync change reset', this.render);
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
