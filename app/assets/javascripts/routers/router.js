CooksBookApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'index',
    'recipes/new': 'new',
    'recipes/:id': 'show',
    'recipes/:id/edit': 'edit'
  },

  edit: function (id) {
    var recipe = CooksBookApp.recipes.getOrFetch(id);
    var formView = new CooksBookApp.Views.RecipeForm({
      collection: CooksBookApp.recipes,
      model: recipe
    });

    this._swapView(formView);
  },

  index: function () {
    CooksBookApp.recipes.fetch();
    var indexView = new CooksBookApp.Views.RecipesIndex({
      collection: CooksBookApp.recipes
    });

    this._swapView(indexView);
  },

  new: function () {
    var newRecipe = new CooksBookApp.Models.recipe();
    var formView = new CooksBookApp.Views.RecipeForm({
      collection: CooksBookApp.recipes,
      model: newRecipe
    });

    this._swapView(formView);
  },

  // show: function (id) {
  //   var recipe = CooksBookApp.recipes.getOrFetch(id);
  //   var showView = new CooksBookApp.Views.RecipeShow({
  //     model: recipe
  //   });
  //
  //   this._swapView(showView);
  // },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
