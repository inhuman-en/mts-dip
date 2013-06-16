(function(app) {

  app.UserModel = Backbone.Model.extend({
          
    defaults : {
        //id : 0,
        email : '',
        password : '',
        name : '',
        login : false,
        role : {
                 key: 'guest'
               }
    },

    url : 'users/login.json',

    //we need to get rid of this bullshit
    switchUrl: function() {
      this.url = "/users";
    },

    urlForDelete: function(id) {
      this.url = "/users/" + id;
    }

    //,

    //validate: function(attrs) {
 
    //  if (reg_email.exec(attrs.email) == null) {
    //      return "Please set valid email";
    //  }
    // } 

   });
 
 })(window);
