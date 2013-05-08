(function(app) {

	app.SpecView = Backbone.View.extend({

	    	tagName: "li",
	    	template: JST["backbone/specializations/specialization_template"],

			events: {
				"click": "specSelect"
			},

			specSelect: function() {
       
       			this.$el.toggleClass("selected_spec");
       			Backbone.Mediator.pub(( this.model.is_selected ? 
       									"spec_unselected" : "spec_selected" ),
       				 					{ id: this.model.get("id") });
       			this.model.is_selected = (this.model.is_selected ? false : true);

			},

			render: function() {
				this.$el.html(this.template(this.model.toJSON()));
		        return this; 
		    }
	});


})(window);
