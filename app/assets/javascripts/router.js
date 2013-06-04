(function(app, mts) {

  app.Router = Backbone.Router.extend({

    routes: {
      ''                    : 'index',
      'home'                : 'index',
      'my-private-schedule' : 'showPrivateSchedule',
      'admin'               : 'showAdminPanel'
    },
    
    initialize : function() {
        this.view = new app.RouterView({el : $('#mts-application')});
    },

    index: function() {
        
        this.view.handlerIndex();
     },

    showHome: function() {

        this.view.handlerShowHome();
    },

    showPrivateSchedule: function() {
        
        this.view.handlerShowPrivateSchedule();
    },

    showAdminPanel: function() {
      $('#tab1').addClass('hidden');
      $('#tab2').addClass('hidden');
      $('#tab3').removeClass('hidden');
    }

  });

})(window, window.mts);