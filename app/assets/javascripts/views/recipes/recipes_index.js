CooksBookApp.Views.RecipesIndex = Backbone.CompositeView.extend({

  template: JST['recipes/index'],

  className: 'recipes-index',

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      recipes: this.collection,
      current_id: CooksBookApp.currentUserId
    });

    this.$el.html(content);
    return this;
  }

});
