(function(app) {

	app.CurrentSchedulesView = Backbone.View.extend({		

			template: JST["backbone/current_schedule/current_schedules_template"],
						
			initialize: function() {

				Backbone.Mediator.sub("user_login", this.render, this);

				this.$el.hide();	

			},

			addSchedule: function(attr) {

				var schedule_array = attr["schedule"].split(" - "),
					schedule_start = schedule_array[0],
					schedule_end = schedule_array[1];

				var daily_schedule = new app.DailySchedule( { doctor_id: attr["doctor_id"],
													      day: attr["day"],
													      duration: attr["duration"],
													      schedule_start: schedule_start,
													      schedule_end: schedule_end,
													      visible: true
												      } );

				this.$el.show();

				current_schedule_view = new app.CurrentScheduleView( {model: daily_schedule} );
				this.$el.find("#current_schedules_content").append(current_schedule_view.render().el);

				Backbone.Mediator.pub("timeline_render",{
				                                          doctor_id: attr["doctor_id"],
			                                              data: attr["day"],
			                                              type: "cw-doc"				   
				                                        });
			},

			/*formatDate: function(date) {

				var dd = date.getDate(),
					mm = date.getMonth() + 1,
					yyyy = date.getFullYear();

  				return dd + '-' + mm + '-' + yyyy;
			},*/
				
			render: function() {

				this.$el.html(this.template());
				
				if (window.userEx.getRole() == "doctor") {

					var doctor_id = window.userEx.getDoctorId(),
						mySchedule = new app.WeeklyModel();

					mySchedule.urlRoot =  "/weekly_schedules/" + doctor_id +"/getduration.json";
					mySchedule.fetch();

					mySchedule.on("change", function () {

						var daily_array = {},
							date = new Date(),
					    	dateex = new app.DateEx(date);

						date.setDate(date.getDate() - date.getDay());

						daily_array[0] = mySchedule.attributes.schedule.sun.start + " - " + mySchedule.attributes.schedule.sun.end;
					    daily_array[1] = mySchedule.attributes.schedule.mon.start + " - " + mySchedule.attributes.schedule.mon.end;
					    daily_array[2] = mySchedule.attributes.schedule.tue.start + " - " + mySchedule.attributes.schedule.tue.end;
					    daily_array[3] = mySchedule.attributes.schedule.wed.start + " - " + mySchedule.attributes.schedule.wed.end;
					    daily_array[4] = mySchedule.attributes.schedule.thu.start + " - " + mySchedule.attributes.schedule.thu.end;
					    daily_array[5] = mySchedule.attributes.schedule.fri.start + " - " + mySchedule.attributes.schedule.fri.end;
					    daily_array[6] = mySchedule.attributes.schedule.sat.start + " - " + mySchedule.attributes.schedule.sat.end;

					    for(i=0;i<=6;i++) {

						    this.addSchedule({doctor_id:  doctor_id,
						    					   //name: param["name"],
						    					   day: dateex.dateTransFormat(),
						    					   duration: mySchedule.get("doctor_duration"),
						    					   schedule: daily_array[i]
						    					  });

						    /*Backbone.Mediator.pub("timeline_render",{
							                                          doctor_id: doctor_id,
						                                              data: dateex.dateTransFormat(),
						                                              type: "cw-doc"	   
							                                        });*/

						    date.setDate(date.getDate() + 1);
				    	}

					}, this);    

				};
			
				return this;
			}		
	});	

})(window);

