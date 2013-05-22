(function(app) {

  app.StatusModel = Backbone.Model.extend({

    url:"/user_statuses.json",
          
    defaults : {
        miss_count: 0,
        status: "",
    },

    addMissUrl: function(attr) {
      
      var user_id = attr["user_id"];

         this.url = '/user_statuses/'+ user_id +'/addmiss.json';

         this.fetch();

        },

    removeMissUrl: function(attr) {
      var user_id = attr["user_id"];

         this.url = '/user_statuses/'+ user_id +'/removemiss.json';

         this.fetch();
    }
  });
 
 })(window);