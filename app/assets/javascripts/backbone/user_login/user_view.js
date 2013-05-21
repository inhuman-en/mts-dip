(function(app) {

    app.UserView = Backbone.View.extend({
        
        // el - elent-bloc "div", with login field
        el: '#login_block',

        initialize: function() {
            
            this.user = new app.UserModel();
            this.render();

            Backbone.Mediator.sub("user_blocked", this.getUser, this);
            //this.user.on("request", this.userBlock, this);
            this.user.on("all", function(e){console.log(e);}, this);
        },

        // template with logins inputs
        nav_template: JST["backbone/user_login/nav_template"],
        
        // template with "user on" 
        inrole_template: JST["backbone/user_login/user_template"],

        events: {
            
            "click #btn_login"              : "userLogin",
            "click #close"                      : "hideError",
            "click #home"                       : "routHome",
            "click #private_schedule" : "routPrivateSchedule",
            "click #exit"                           : "userLogout"
        },

        getUser: function(attr) {
            console.log(this.user.url);
            this.user.url = "users/update.json";
            console.log(this.user.url);
            // this.user.save();
            this.user.fetch({user_id:attr["id"]});
        },

        userBlock: function() {
            console.log(this.user);
            //console.log(this.user.get("id"),attr["user_id"] );
            //console.log(this.user);
            // if (this.user.get("id") === attr["user_id"]){console.log("warn");
            // this.user.set({role:{"key":"blocked"}});
            // }
        },

        userLogin: function() {

            var user_email = this.$el.find('input[type=text]').val(),
                    user_password = this.$el.find('input[type=password]').val();
            
            log_user = new app.UserModel({ email: user_email,
                                                                    password: user_password
                                                                    });
            this.user = log_user; // for UserEx;
            log_user.on('sync', this.checkLogin, this);
            log_user.save();            
        },

        checkLogin: function(params) {
            
            if(this.user.get('login')) {

                Backbone.Mediator.pub('user_login', 
                                                            {
                                                                id : this.user.get('id'),
                                                                role: this.user.get('role',[0])
                                                            }
                                        );

                this.$el.html(this.inrole_template({ name: this.user.get('name')}));
                this.routHome();
                return this;

            } else {
                
                $("#login_error").removeClass("hidden");
                setTimeout(this.hideError, 3000);
            }
        },


        hideError: function() {
            $("#login_error").hide();
        },

        routHome: function() {
            app.mts.router.navigate('home', {trigger:true});

            $("#home").addClass("active");
            $("#exit").removeClass("active");
            $("#private_schedule").removeClass("active");
        },

        routPrivateSchedule: function() {
    
            app.mts.router.navigate('my-private-schedule', {trigger:true});

            $("#home").removeClass("active");
            $("#exit").removeClass("active");
            $("#private_schedule").addClass("active");
            //return false;
        }, 

        userLogout: function() {
           
            $("#tab1").show();
            $("#tab2").hide();

            
            if (app.mts.weekdays !== null) app.mts.weekdays.$el.empty();

            app.mts.weekdays = null;
            app.mts.nextTickets = null;


            this.user.clear();
            Backbone.Mediator.pub('user_logout', 
                                                            {
                                                                id : this.user.get('id'),
                                                                role: this.user.get('role',[0])
                                                            }
                                        );
            this.$el.html(this.nav_template);
            app.mts.router.navigate('', {trigger:true});
            return this;
        },

        render: function() {

                this.$el.html(this.nav_template);
                return this;
        }

    });
        
})(window);