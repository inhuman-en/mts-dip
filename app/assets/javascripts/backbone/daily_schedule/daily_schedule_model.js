(function(app) {

	app.DailySchedule = Backbone.Model.extend({		
	
		defaults: {
			doctor_id: "",
			doctor_name: "Ivanov",
			duration: 30,
			schedule_start: "10:00",
			schedule_end: "12:00",
		},

	});	

})(window);
