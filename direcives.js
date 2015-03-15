app.directive('table',function(){
  return {
       restrict: 'E',
       scope:{
        coloumns: '=',
        data:'='
       },
       template: ' <tr>'+'<th>{{coloumns[0]}}</th>'+'<th>{{coloumns[1]}}</th>'+
       '<th>{{coloumns[2]}}</th>'+
      '</tr><tr ng-repeat="table in data">'+
      '<td>{{table.name}}</td>'+
      '<td>{{table.seats}}</td>'+
      ' <td>{{table.seatnos}}</td>'+
    '</tr>',
       link: function(scope,elm,attrs){
       }
  }
});

app.directive('errors',function(){
  return {
  restrict:'A',
  require:'ngModel',
  link: function(scope,elm,attrs,ngModelCtrl){
    scope.click=function(){
      console.log('Bye');
      ngModelCtrl.$render=function(){
      elm.html(scope.text);

    };
    }
  }
};
});
