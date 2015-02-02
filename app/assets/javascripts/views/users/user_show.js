CooksBookApp.Views.UserShow = Backbone.View.extend({

  template: JST['users/current'],

  className: 'users-show group',

  initialize: function () {
    this.recipes = this.model.recipes();
    this.favorites = this.model.favorites();
    this.listenTo(this.model, 'sync', this.render);
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
  }
});
