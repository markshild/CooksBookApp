CooksBookApp.Models.Recipe = Backbone.Model.extend({
  urlRoot: '/api/recipes',

  toJSON: function() {
    var json = {recipe: _.clone(this.attributes)};

    if (this._picture) {
      json.recipe.picture = this._picture;
    }
    if (this._ingredient) {
      json.ingredient = this._ingredient;
    }
    if (this._direction) {
      json.direction = this._direction;
    }

    return json;
  },

  comments: function () {
    if(!this._comments) {
      this._comments = new CooksBookApp.Collections.Comments([], { recipe: this });
    }

    return this._comments;
  },

  favorites: function () {
    if(!this._favorites) {
      this._favorites = new CooksBookApp.Collections.Favorites([], { recipe: this });
    }

    return this._favorites;
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
    if(response.favorites) {
      this.favorites().set(response.favorites, {parse: true});
      delete response.favorites;
    }

    return response;
  }
});
