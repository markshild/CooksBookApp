CooksBookApp.Views.DirectionShow = Backbone.View.extend({
  template: JST['directions/show'],
  tagName: 'ol',

  events: {

  },

  render: function () {
    var content = this.template({ directions: this.collection });
    this.$el.html(content);
    return this;
  }
});
