CooksBookApp.Views.RecipeShow = Backbone.CompositeView.extend({

  template: JST['recipes/show'],

  className: 'recipes-show group',

  initialize: function () {
    this.comments = this.model.comments();
    this.ingredients = this.model.ingredients();
    this.tags = this.model.tags();
    this.directions = this.model.directions();
    this.favorites = this.model.favorites();
    if (this.model.get('favorited')) {
      this.favoriteId = this.model.get('favorite_id');
    }
    this.listenTo(this.model, 'sync change reset', this.render);
  },

  events: {
    "click .delete": "deleteRecipe",
    "click .add-favorite": "addFavorite",
    "click .delete-favorite": "deleteFavorite",
  },

  render: function () {
    var content = this.template({
      recipe: this.model,
      current_id: CooksBookApp.currentUserId,
      tags: this.tags,
      favoriteCount: this.favorites.length,
      favorite: this.favoriteId
    });
    this.$el.html(content);
    this.addIngredients(this.ingredients);
    this.addDirections(this.directions);
    this.addComments(this.comments);
    this.renderCommentForm();
    return this;
  },

  deleteRecipe: function (event) {
    event.preventDefault();
    this.model.destroy();
    Backbone.history.navigate('', {trigger: true})
  },

  addFavorite: function (event) {
    var $target = $(event.target)
    $target.parent().removeClass('add-favorite')
    var favorite = new CooksBookApp.Models.Favorite({
      recipe_id: this.model.id
    });
    var that = this;
    favorite.save({}, {
      success: function () {
        that.favorites.add(favorite);
        that.model.set({favorited: true});
        that.favoriteId = favorite.id
        that.render();
      }
    })

  },

  deleteFavorite: function (event) {
    var $target = $(event.target)
    $target.parent().removeClass('delete-favorite')
    var favorite = this.favorites.get($target.data('id'))
    var that = this;
    favorite.destroy({ wait: true,
      success: function () {
        that.model.set({favorited: false});
        that.render();
      }
    });

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
