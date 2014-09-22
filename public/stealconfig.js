steal.config({
  map: {
    "jquery/jquery": "jquery",
    "lodash/lodash": "lodash/main",
    "moment/moment": "moment",
    "fastclick/fastclick": "fastclick"
  },
  paths: {
    "can/*": "bower_components/canjs/*.js",
    "bootstrapjs/*": "bower_components/bootstrap/js/*.js",
    "jquery": "bower_components/jquery/dist/jquery.js",
    "jquery-cookie/jquery-cookie": "bower_components/jquery-cookie/jquery.cookie.js",
    "lodash/*": "bower_components/lodash-amd/modern/*.js",
    "moment": "bower_components/momentjs/moment.js",
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
    stache: "app/utils/system_stache"
  }
});