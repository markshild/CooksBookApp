CooksBookApp.Views.UserShow = Backbone.View.extend({

  template: JST['users/current'],

  className: 'users-show group',

  initialize: function () {
    this.recipes = this.model.recipes();
    this.favorites = this.model.favorites();
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
  },

  render: function () {

    var content = this.template({
      recipes: this.recipes,
      user: this.model,
      favorites: this.favorites,
      recipePartial: JST['recipes/_box']
    });
    this.$el.html(content);
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
  }
});
