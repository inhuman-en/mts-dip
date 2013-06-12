(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',

      'home'                : 'index',
      'home/'               : 'index',
      'home/:sel_id'        : 'selSpecFromUrl',
      'my-private-schedule' : 'showPrivateSchedule',
      'admin'               : 'showAdminPanel'
    },
    
    initialize : function() {
        this.view = new app.RouterView({el : $('#mts-application')});
    },

    index: function() {
        console.log("console.log");
        this.view.handlerIndex();
     },

    showHome: function() {
      console.log("console.log");
        this.view.handlerShowHome();
    },

    showPrivateSchedule: function() {
        
        this.view.handlerShowPrivateSchedule();
    },


    selSpecFromUrl: function(sel_id) {
        this.view.handlerIndex();

        mts.historyHome.selSpec(sel_id);
    },

    showAdminPanel: function() {
    
        this.view.hadlerShowAdminPanel();

    }



  });

})(window, window.mts);
