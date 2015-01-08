

CooksBookApp.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST['recipes/show'],

  className: 'recipes-show',

  initialize: function () {
    this.comments = this.model.comments();
    this.tags = this.model.tags();
    this.ingredients = this.model.ingredients();
    this.directions = this.model.directions();
    this.listenTo(this.comments, 'add delete', this.render);
  },

  render: function () {
    var content = this.template({
      board: this.model
    });
    this.$el.html(content);
    this.ingredients.each(this.addIngredient.bind(this));
    this.directions.each(this.addDirection.bind(this));
    this.tags.each(this.addTag.bind(this));
    this.comments.each(this.addComment.bind(this));
    this.renderCommentForm();
    return this;
  },

  addIngredient: function (ingredient) {
    var view = new CooksBookApp.Views.DirectionShow({
      model: ingredient
    });
    this.addSubview('#direction', view);
  },

  addDirection: function (direction) {
    var view = new CooksBookApp.Views.DirectionShow({
      model: direction
    });
    this.addSubview('#direction', view);
  },

  addTag: function (tag) {
    var view = new CooksBookApp.Views.TagShow({
      model: tag
    });
    this.addSubview('#tag', view);
  },

  addComment: function (comment) {
    var view = new CooksBookApp.Views.CommentShow({
      model: comment
    });
    this.addSubview('#comment', view);
  },

  renderCommentForm: function () {
    var view = new CooksBookApp.Views.CommentForm({
      collection: this.comments
    });
    this.addSubview('#comment-form', view);
  }
});
