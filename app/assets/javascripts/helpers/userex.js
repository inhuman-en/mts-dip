(function(app, mts) {

    function getRole() {
        var role = this.user.get('role')['key'];
        if (!role) {
            console.warn('something with hash role in userEx');
        }
        
        return role;
    }
     
    function getDoctorId() {
        
        var doctor_id = false;
        
        if (this.user.get('role')['key'] === 'doctor') {        
            doctor_id = this.user.get('role')['doctor_id'];
        } else {
            console.warn('not a doctor');
        }
        
        return doctor_id;
    }
        
    function getId() {
        var id = false;
       
        if (this.user.get('role')['key'] !== 'guest') {
            id = this.user.get('id');
        } else {
            console.warn('user is not enrolled');
        }
       
        return id;
    }
    
    function UserEx () {
        
        this.getRole = getRole;
        this.getId = getId;
        this.getDoctorId = getDoctorId;
        
    }
    
    app.UserEx = UserEx;
         
}(window, window.mts))