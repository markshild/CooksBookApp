CooksBookApp.Models.Recipe = Backbone.Model.extend({
  urlRoot: '/api/recipes',

  toJSON: function() {
    return { recipe: _.clone( this.attributes ) }
  },

  comments: function () {
    if(!this._comments) {
      this._comments = new CooksBookApp.Collections.Comments([], { recipe: this });
    }

    return this._comments;
  },

  ingredients: function () {
    if(!this._ingredients) {
      this._ingredients = new CooksBookApp.Collections.Ingredients([], { recipe: this });
    }

    return this._ingredients;
  },

  directions: function () {
    if(!this._directions) {
      this._directions = new CooksBookApp.Collections.Directions([], { recipe: this });
    }

    return this._directions;
  },

  tags: function () {
    if(!this._tags) {
      this._tags = new CooksBookApp.Collections.Tags([], { recipe: this });
    }

    return this._tags;
  },

  author: function (response) {
    if(!this._author) {
      this._author = response;
    }

    return this._tags;
  },

  parse: function (response) {
    if(response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }
    if(response.ingredients) {
      this.ingredients().set(response.ingredients, { parse: true });
      delete response.ingredients;
    }
    if(response.directions) {
      this.directions().set(response.directions, { parse: true });
      delete response.directions;
    }
    if(response.tags) {
      this.tags().set(response.tags, { parse: true });
      delete response.tags;
    }
    if(response.author) {
      this.author(response.author);
      delete response.author;
    }

    return response;
  }
});
