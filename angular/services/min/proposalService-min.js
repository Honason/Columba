columbaApp.service("proposalService",["$http",function(s){this.GetAllUsers=function(e){s.post("/users/getall").success(function(s){e(s)})}}]);