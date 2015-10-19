'use strict';

/**
 * @ngdoc function
 * @name todoListApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoListApp
 */
 var p;
angular.module('todoListApp')
  .controller('MainCtrl', function ($scope,$mdSidenav,$timeout,$mdDialog,$http,$cookies) {
    p=$cookies;
  /*declaration*/      
     /*componente preloader*/
     $scope.preloader={
        hidden:false,
     };
     /*componente navegador de opciones*/
     $scope.optionsSideNav = {
       hidden:true,
       close:function(){
         $mdSidenav('options').close();
       },
       toggle:function(){            

            var context = $scope,wait=100,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            var timer = $timeout(function() {

              timer = undefined;
              $mdSidenav('options').toggle().self.apply(context, args);

            },wait); 

       },
       selectAll:function(){
            for(var i in $scope.toDoList.tasks)
               $scope.toDoList.tasks[i].done=true;
       },
       deselectAll:function(){
            for(var i in $scope.toDoList.tasks)
               $scope.toDoList.tasks[i].done=false;
       },
       deleteSelectedTasks:function(){
            for(var i in $scope.toDoList.tasks)
              if($scope.toDoList.tasks[i].done){
                $scope.toDoList.doneTasks.push($scope.toDoList.tasks[i]);
                $scope.toDoList.tasks.splice(i,1);
              }
            $scope.memory.saveList();
            $mdDialog.alert({
                        title:"Aviso",
                        content:"Se han eliminado todas las tareas seleccionadas exitosamente",
                      });

       }
     };
     /*componente formulario de creación de tareas*/
     $scope.taskMaker = function($event){
          $mdDialog.show({  
            targetEvent: $event,
            templateUrl:"views/taskForm.html",
            controller: "TaskmakerCtrl"
          }).then(function(resp){//promises//succes
              $scope.toDoList.tasks.push(resp); 
              $scope.memory.saveList();
          },function(){});
     };

     $scope.taskEditor = function(index,$event){          
          $mdDialog.show({  
            targetEvent: $event,
            templateUrl:"views/taskForm.html",
            controller: "TaskeditorCtrl",
            locals:{task:$scope.toDoList.tasks[index]}
          }).then(function(resp){//promises//succes
              $scope.toDoList.tasks[index]=resp; 
              $scope.memory.saveList();
          },function(){});
     };


     /*cards de tareas*/
     $scope.toDoList={
         				  tasks:[],
    		     	    doneTasks:[]
     			  };


      $scope.memory={
          saveList:function(){
            $cookies.remove('toDoList');
            $cookies.putObject('toDoList',$scope.toDoList);
          },
          loadList:function(){
            try{
              var cookie;
              cookie=$cookies.getObject('toDoList');              

              if(cookie==undefined)
                throw "the cookie doesn't exist";
              $scope.toDoList=cookie;

            }catch(err){
              console.log(err);
            }
          }
      };


  /*init*/
    $scope.memory.loadList();
    /*init with delay*/
    var timer=$timeout(function() {                
                $scope.preloader.hidden=true;
                $timeout.cancel(timer);

    },500); 

  });
