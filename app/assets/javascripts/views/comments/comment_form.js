CooksBookApp.Views.CommentForm = Backbone.View.extend({
  template: JST['comments/form'],
  tagName: 'ul',

  initialize: function (options) {
    this.recipe = options.recipe
  },

  events: {
    'click .comment-submit': 'submit'
  },

  render: function () {
    var content = this.template({ current_id: CooksBookApp.currentUserId });
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var body = this.$('.comment-input').val();
    var params = {
      body: body,
      recipe_id: this.recipe.id
    };
    this.collection.create(params, {wait: true});

    this.render();
  }


});
