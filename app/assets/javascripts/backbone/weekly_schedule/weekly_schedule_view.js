(function(app) {

	app.WeeklyView = Backbone.View.extend({
        
        tagName : 'tr',
        
        collTemplate :  JST["backbone/weekly_schedule/weekly_schedule_collTemplate"],
        
        initialize : function(){
            this.model.on('select:schedule_day', this.activeTrigger, this);
            this.model.on('select:schedule_day', this.publishTrigger, this);
            this.model.on('change:selected', this.selfRemove, this);   
        },
        
        events : {
            'click .schedule-item' : 'selectDay'
        },
        
        render : function(){
            
            var schedule =  this.model.get('schedule');
 
            this.$el.append(
            
                this.collTemplate(
                        {
                            text : this.model.get('doctor_name'),
                            id : 'doc'+ this.model.get('doctor_id') + '-name',
                            class_name : "schedule-name"
                        }
                    )
            );
            
            for(i in schedule){
                
                this.$el.append(
                
                    this.collTemplate(
                        {
                            text : schedule[i].start + ' - ' + schedule[i].end,
                            id : 'doc'+ this.model.get('doctor_id') + '-' + i,
                            class_name : "schedule-item"
                        }
                    )
                );
                            
           }
            
            return this;
        },
        
        activeTrigger : function(day, trigger){
            elem = this.$el.find('#doc'+ this.model.get('doctor_id') + '-' + day);
            
            (!trigger)? $(elem).removeClass('active') : $(elem).addClass('active');
                   
        },
        
        selectDay : function(e){
            
            target = $(e.target);
            
            this.model.scheduleTrigger(target.attr('id').split('-')[1]);
        },
        
        publishTrigger : function(day, trigger) {
                
                if(trigger) {
                    
                    Backbone.Mediator.pub('weekly_selectItem', 
                        {
                            name : this.model.get('doctor_name'),
                            id : this.model.get('doctor_id'),
                            duration : this.model.get('doctor_duration'),
                            schedule : $(target).text(),
                            day : this.model.get('schedule')[day]['data']
                        }
                    );
                
                     
                }else{
        
                    Backbone.Mediator.pub('weekly_unselectItem', 
                        {
                            id : this.model.get('id'),
                            day : this.model.get('schedule')[day]['data']                            
                        }
                    );
                    
                }
        
        },
        
        unselectedDays : function () {
            
            var schedule = this.model.get('schedule');
            
            for (day in schedule){
                
                if(schedule[day]['selected'] === true){
                    
                    this.model.scheduleTrigger(day);
                }
                
            }
            
        },
        
        selfRemove : function (obj, value) {
            
            if(value === false){
                
                this.unselectedDays();
                this.remove();
                
            }
            
        }
        
    });
    
    
    
}(window))