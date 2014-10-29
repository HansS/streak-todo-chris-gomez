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
      this.parseModel = function (data) {

        // There seems to be a bug in CanJS where parseModel is called
        // twice in succession. Knowing this we can ignore any calls to
        // parseModel that pass an object with no "_source" property.
        if (! data._source) {
          return data;
        }

        var modelPreppedData = data._source;
        modelPreppedData._id = data._id;
        return modelPreppedData;
      };
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

        dfd.resolve(response);
      });

      return dfd;
    },

    update: function (id, attrs) {
      var dfd = new can.Deferred();

      delete attrs._id;

      var config = {
        index: 'streak',
        type: this.type,
        id: id,
        body: {
          doc: attrs
        }
      };

      esClient.update(config, function (err, response) {
        if (err) {
          dfd.reject(err);
          return;
        }

        dfd.resolve({});
      })

      return dfd;
    },

    findOne: function (attrs) {

      var self = this;
      var dfd = new can.Deferred();
      var config = {
        index: 'streak',
        type: this.type,
        id: attrs._id
      };

      esClient.get(config, function (err, response) {
        if (err) {
          dfd.reject(err);
          return;
        }

        var model = response;

        dfd.resolve(model);
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

        var results = response.hits.hits;

        /*
        // This should go in parseModels
        var models = [];

        for (var i in results) {
          var result = results[i];
          var model = result._source;
          model._id = result._id;
          models.push(model);
        }

        dfd.resolve(models);
        */

        dfd.resolve(results);
      });

      return dfd;
    }

  }, {

    // Instance

  });

});