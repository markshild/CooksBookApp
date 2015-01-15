CooksBookApp.Views.RecipeSearch = Backbone.View.extend({


  initialize: function (options) {
    this.collection = new CooksBookApp.Collections.SearchResults();
    this.listenTo(this.collection, "sync", this.render);
    this.collection._query = options.query;
    if (options.query) {
      this.collection.fetch({
        data: {query: this.collection._query}
      });
    }
  },

  events: {
    "click .search": "search",
    "click .next-page": "nextPage",
    "click .prev-page": "prevPage"
  },

  template: JST["recipes/search"],

  render: function () {
    var content = this.template({recipes: this.collection});
    this.$el.html(content);

    this.renderSearchResults();

    return this;
  },

  renderSearchResults: function () {
    var container = this.$(".search-results");
    this.collection.each(function (recipe) {
      var subTemplate = JST["recipes/_box"]

      container.append(subTemplate({recipe: recipe}));
    });
  },

  search: function (event) {
    event.preventDefault();
    this.collection._query = this.$(".query").val();
    this.collection.fetch({
      data: {query: this.collection._query}
    });
  },

  nextPage: function (event) {
    this.collection._pages.page = (this.collection._pages.page || 1) + 1;
    this.collection.fetch({
      data: {
        query: this.collection._query,
        page: this.collection._pages.page
      }
    });
  },

  prevPage: function (event) {
    this.collection._pages.page = this.collection._pages.page - 1;
    this.collection.fetch({
      data: {
        query: this.collection._query,
        page: this.collection._pages.page
      }
    });
  }

});
