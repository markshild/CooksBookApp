CooksBookApp.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],
  tagName: 'ul',

  initialize: function () {
    this.listenTo(this.collection, "add destroy change", this.render)
  },

  events: {
    'click .comment-delete': 'destroyComment'
  },

  render: function () {
    var content = this.template({
      comments: this.collection,
      current_id: CooksBookApp.currentUserId
    });
    this.$el.html(content);
    return this;
  },

  destroyComment: function(event) {
    event.preventDefault();
    $target = $(event.target);
    var comment = this.collection.get($target.data('id'))
    comment.destroy();
  }
});
