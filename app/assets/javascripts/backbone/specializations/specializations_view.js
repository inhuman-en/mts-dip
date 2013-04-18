(function(app) {

	app.SpecsView = Backbone.View.extend({
			
			template: JST["backbone/specializations/specializations_template"],

	  		initialize: function() {
	  			this.specs = new SpecsCollection(),
	  			this.specs.on("reset", this.render, this);
	  			this.specs.fetch();
	  		},
			
			addSpec: function(model) {
				var spec = new app.SpecView({model: model});
				this.$el.append(spec.render().el);					
			},
			
			render: function() {
				console.log(this, this.template);
				this.$el.html(this.template());
				$("body").append(this.$el);	 //correct "body" for current element in template
				this.specs.each(this.addSpec, this);	
				return this;
			}				
	 	});

})(window);