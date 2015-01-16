CooksBookApp.Views.RecipesIndex = Backbone.View.extend({

  template: JST['recipes/index'],

  className: 'recipes-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    "click .tag": "renderTag",
    "submit form": "search"
  },

  render: function () {
    var content = this.template({
      tags: this.collection,
      current_id: CooksBookApp.currentUserId

    });

    this.$el.html(content);
    var tag = this.collection.first(), that = this;
    if (tag) {
      var view = new CooksBookApp.Views.TagShow({
        model: tag
      });
      that.swapView(view);


    }

    return this;
  },

  search: function (event) {
    event.preventDefault();
    var query = encodeURI(this.$('form').serializeJSON().query);
    Backbone.history.navigate('recipes/search/' + query, {trigger: true})
  },

  renderTag: function (event) {
    var id = $(event.target).data('id')
    var tag = this.collection.get(id);
    var view = new CooksBookApp.Views.TagShow({
      model: tag
    });
    this.swapView(view)

  },

  swapView: function (view) {
    this._subview && this._subview.remove();
    this._subview = view;
    this.$('#tag-show').html(view.render().$el);
  }

});
