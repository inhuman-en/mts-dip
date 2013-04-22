(function(app) {

	app.WeeklyView = Backbone.View.extend({
        
        tagName : 'tr',
        
        initialize : function(){
            
        },
        
        events : {
            'click .schedule-item' : 'selectItem'
        },
        
        render : function(){
            
            var schedule =  this.model.get('schedule');
 
            this.$el.append($('<td />', { text : this.model.get('doctor_name')}));
            
            for(i in schedule){
                this.$el.append($('<td />', 
                    {
                       text : schedule[i].start + ' - ' + schedule[i].end,
                       id : this.model.get('doctor_name') + '-' + i,
                       "class" : 'schedule-item'
                    }
                
                ));            
           }
            
            return this;
        },
        
        selectItem : function(e){
            
            var target = e.target,
            attr_data = $(target).attr('id').split('-');
            
            if(attr_data.length === 2){
                
                if(this.triggerSelect($(target))){
                    
                    Backbone.Mediator.pub('weekly_selectItem', 
                        {
                            name : this.model.get('doctor_name'),
                            id : this.model.get('doctor_id'),
                            duration : this.model.get('doctor_duration'),
                            schedule : $(target).text()
                        }
                    );
                    
                }else{
                    
                    Backbone.Mediator.pub('weekly_unselectItem', 
                        {
                            name : this.model.get('name'),
                            id : this.model.get('id'),                            
                        }
                    );
                    
                }
                
            }else{
                console.warn('wrong id or selected element');
            }
            
        },
        
        triggerSelect : function(elem) {
            
            var result = false;
            
            if(elem.hasClass('active')){
                elem.removeClass('active');
                result = false;
            }else{
                elem.addClass('active');
                result = true;
            }
            
            return result;
            
        }
        
    });
    
    
    
}(window))