module.export={
    isOwner : function(req, res){
        if(req.user){
            return true;
        }else{
            return false
        }
    },
    statusUI : function(req, res){
        if(this.isOwner(req, res)){
            return req.user.nick
        }
    }
}