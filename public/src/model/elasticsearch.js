steal(
  'can',
  'elasticsearch',
function (can, es) {

  var esClient = window.esClient = new es.Client({
    host: document.location.protocol + '//' + document.location.host + '/api'
  });

  return can.Model.extend({

    // Static

    id: '_id',

    init: function () {
      this.parseModel = function (model) {
        return model._source;
      }
    },

    create: function (attrs) {
      var self = this;
      var dfd = new can.Deferred();
      var config = {
        index: 'streak',
        type: this.type,
        body: attrs
      };

      esClient.create(config, function (err, response) {
        if (err) {
          dfd.reject(err);
          return;
        }

        attrs._id = response._id;

        dfd.resolve(self.parseModel(attrs));
      });

      return dfd;
    },

    findAll: function (attrs) {

      var self = this;
      var dfd = new can.Deferred();
      var config = {
        index: 'streak',
        type: this.type,
        body: attrs
      };

      esClient.search(config, function (err, response) {
        if (err) {
          dfd.reject(err);
          return;
        }

        var models = response.hits.hits;

        dfd.resolve(models);
      });

      return dfd;
    },

  }, {

    // Instance

  });

});