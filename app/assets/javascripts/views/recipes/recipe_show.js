

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
      model: direction
    });
    this.addSubview('#direction', view);
  },

  addDirection: function (direction) {
    var view = new CooksBookApp.Views.DirectionShow({
      model: direction
    });
    this.addSubview('#direction', view);
  },

  renderListForm: function () {
    var view = new TrelloClone.Views.ListForm({
      collection: this.collection
    });
    this.addSubview('#list-form', view);
  }
});
