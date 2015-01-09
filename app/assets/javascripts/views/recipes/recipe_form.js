CooksBookApp.Views.RecipeForm = Backbone.CompositeView.extend({

  template: JST['recipes/form'],

  className: 'recipes-form',

  initialize: function () {
    this.comments = this.model.comments();
    this.ingredients = this.model.ingredients();
    this.directions = this.model.directions();
    this.listenTo(CooksBookApp.tags, "sync", this.render)
    this.listenTo(this.comments, 'add delete', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'submit form': "submit",
    "click a.add-ingredient": "addIngredient",
    "click a.add-direction": "addDirection",
    "click .remove": "removeItem"
  },

  render: function () {
    var content = this.template({
      recipe: this.model,
      tags: CooksBookApp.tags,
      ingredients: this.ingredients,
      directions: this.directions
    });
    this.$el.html(content);
    return this;
  },

  addIngredient: function (event) {
    event.preventDefault();
    var newEl = $('<li><input type="text" name="ingredient[]" value=""><span class="remove">X</span></li>');
    this.$('ul#ingredients').append(newEl);
  },

  addDirection: function (event) {
    event.preventDefault();
    var newEl = $('<li><input type="text" name="direction[]" value=""><span class="remove">X</span></li>');
    this.$('ul#directions').append(newEl);
  },

  removeItem: function (event) {
    event.preventDefault();
    $(event.target).parent().remove();
  },

  submit: function (event) {
    event.preventDefault();
    var params = this.$('form').serializeJSON();
    var that = this;
    this.model.save(params, {
      success: function () {
        that.collection.add(this.model, {merge: true});
        Backbone.history.navigate('recipes/' + that.model.id, {trigger: true});
      }
    })
  }

});
