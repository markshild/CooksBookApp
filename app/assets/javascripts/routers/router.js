CooksBookApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    CooksBookApp.tags.fetch();
  },

  routes: {
    '': 'index',
    'recipes/new': 'new',
    'recipes/:id': 'show',
    'recipes/:id/edit': 'edit'
  },

  edit: function (id) {
    var recipe = CooksBookApp.recipes.getOrFetch(id);

    if (CooksBookApp.currentUserId !== recipe.author.id) {
      Backbone.history.navigate("", {trigger: true});
      return;
    }

    var formView = new CooksBookApp.Views.RecipeForm({
      collection: CooksBookApp.recipes,
      model: recipe,
      tags: this.tags
    });

    this._swapView(formView);
  },

  index: function () {
    var tags = new CooksBookApp.Collections.Tags();
    tags.fetch({ url: '/api/tags/top' });
    var indexView = new CooksBookApp.Views.RecipesIndex({
      collection: tags
    });

    this._swapView(indexView);
  },

  new: function () {
    if (!CooksBookApp.currentUserId) {
      Backbone.history.navigate("", {trigger: true});
      return;
    }
    var newRecipe = new CooksBookApp.Models.Recipe();
    var formView = new CooksBookApp.Views.RecipeForm({
      collection: CooksBookApp.recipes,
      model: newRecipe
    });

    this._swapView(formView);
  },

  show: function (id) {
    var recipe = CooksBookApp.recipes.getOrFetch(id);
    var showView = new CooksBookApp.Views.RecipeShow({
      model: recipe
    });

    this._swapView(showView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
