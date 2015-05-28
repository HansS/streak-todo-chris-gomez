module.exports = {
  "action": {
    "properties": {
       "_index": {
          "type": "string"
       },
       "_type": {
          "type": "string"
       },
       "_version": {
          "type": "long"
       },
       "createdAt": {
          "type": "date",
          "format": "dateOptionalTime"
       },
       "relativeDate": {
          "type": "date",
          "format": "dateOptionalTime"
       },
       "title": {
          "type": "string"
       },
       "userId": {
          "type": "string",
          "index": "not_analyzed"
       }
    }
  }
};