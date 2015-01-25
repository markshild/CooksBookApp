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
    console.log("anything");
  },

  events: {
    'submit form': "submit",
    "click a.add-ingredient": "addIngredient",
    "click a.add-direction": "addDirection",
    "click .remove": "removeItem",
    "change #input-recipe-picture": "fileInputChange"
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
    var newEl = $('<li><input type="text" name="ingredient[]" placeholder="ex: 2 cups flour"><span class="remove">X</span></li>');
    this.$('ul#ingredients').append(newEl);
  },

  addDirection: function (event) {
    event.preventDefault();
    var newEl = $('<li><input type="text" name="direction[]" placeholder="New Direction"><span class="remove">X</span></li>');
    this.$('ul#directions').append(newEl);
  },

  removeItem: function (event) {
    event.preventDefault();
    $(event.target).parent().remove();
  },

  submit: function (event) {
    event.preventDefault();
    var $waiting = $('<div/>')
      .addClass("waiting")
      .append("<p/>")
      .text("Our scientists are attempting to calculate nutrition information. Please be patient.");
    $waiting.append('<img src="http://aforgrave.ca/detritus/wp-content/uploads/2012/12/Beaker3_280.gif" height="150px">')
    this.$el.append($waiting);
    var params = this.$('form').serializeJSON().recipe;
    this.model._ingredient = this.$('form').serializeJSON().ingredient
    this.model._direction = this.$('form').serializeJSON().direction
    var that = this;
    this.model.save(params, {
      success: function () {
        that.collection.add(that.model, {merge: true});

        delete that.model._picture;
        Backbone.history.navigate('recipes/' + that.model.id, {trigger: true});
      },
      error: function () {
        this.$('.waiting').remove();
      }
    })
  },

  fileInputChange: function(event){

    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._picture = reader.result;

    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._picture;

    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-recipe-picture").attr("src", src);
  }

});
