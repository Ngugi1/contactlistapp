var app = angular.module('ContactListApp' ,[]);
app.controller('AppCtrl' ,function ($scope , $http) {
    console.log('hello world');
   var refresh = function(){
        $http.get('/contactlist').success(function(response){
        console.log(response.length);
        $scope.contactlist = response;
    });
   
   }
   refresh();
   $scope.addContact = function () {
       console.log($scope.contact);
       $http.post('/contactlist', $scope.contact).success(function (response) {
           console.log(response);
            refresh();
       });
   };
    $scope.remove= function (id)
    {
        console.log(id);
        $http.delete('/contactlist/'+id).success(function(response) {
           refresh();
        });
    };
    $scope.edit= function(id){
        console.log(id);
      $http.get('/contactlist/'+id).success(function(response){
         $scope.contact = response; 
      });
    };
    
    $scope.update= function(id){
        console.log('trying to update the contact');
      $http.put('/contactlist/'+id , $scope.contact).success(function(response){
          console.log("updated");
          $scope.contact = null;
          refresh();
      });
        
    };
});
