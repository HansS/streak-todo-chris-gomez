steal.config({
  map: {
    'elasticsearch/elasticsearch': 'elasticsearch',
    "jquery/jquery": "jquery",
    "lodash/lodash": "lodash/main",
    "moment/moment": "moment",
    "fastclick/fastclick": "fastclick",
    "later/later": "later",

    // AMD
    "can/can": "can",
    "can/map/define/define": "can/map/define",
    "can/route/pushstate/pushstate": "can/route/pushstate",
    "can/view/stache/stache": "can/view/stache",
    "can/list/promise/promise": "can/list/promise"
  },
  paths: {

    // AMD
    "can": "bower_components/canjs/amd/can.js",
    "can/*": "bower_components/canjs/amd/can/*.js",

    // Steal
    // "can/*": "bower_components/canjs/steal/canjs/*.js",
    "bootstrapjs/*": "bower_components/bootstrap/js/*.js",
    'elasticsearch': 'bower_components/elasticsearch/elasticsearch.js',
    "jquery": "bower_components/jquery/dist/jquery.js",
    "jquery-cookie/jquery-cookie": "bower_components/jquery-cookie/jquery.cookie.js",
    "lodash/*": "bower_components/lodash-amd/modern/*.js",
    "later": "bower_components/later/later.js",
    "moment": "bower_components/moment/moment.js",
    "fastclick": "bower_components/fastclick/lib/fastclick.js"
  },
  meta: {
    moment: {
      exports: "moment"
    },
    jquery: {
      exports: "jQuery",
      format: "global"
    },
    // "bootstrapjs/dropdown": {
    //   deps: [ "jquery" ]
    // },
    "fastclick": {
      exports: "FastClick"
    }
  },
  ext: {
    stache: "src/utils/system-stache"
  }
});

// Conditional dependency management
// if(steal.config('fixtures')) {
//   System.meta['src/index'] = {
//     deps: [
//     ]
//   };
// }