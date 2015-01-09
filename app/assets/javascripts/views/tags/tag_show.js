CooksBookApp.Views.TagShow = Backbone.View.extend({
  template: JST['tags/show'],
  tagName: 'ul',

  events: {

  },

  render: function () {
    var content = this.template({ tags: this.collection });
    this.$el.html(content);
    return this;
  }
});
