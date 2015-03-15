var app=angular.module('app',['ui.router']);
app.controller('MainCtrl',function($scope){
});
app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
	.state('book',{
		url:'/book',
		templateUrl: 'seat-book.html',
    controller:'SecondCtrl'
	})
})
app.controller('SecondCtrl',function($scope,seatarrangement,removeA){
var name;
var seats;
$scope.tableheadings=['Name','No. of seats','Seat No.s'];
$scope.seat='';
$scope.tables=[];
var bookedSeats = [5, 6, 7,9];
$scope.$watch('name',function(data){
  $scope.names=data;
});

$scope.$watch('number',function(data){
  $scope.seat=data;
})
// function to remove an item from an array
//this function is for selecting and deselecting seats and to prevent selection of already booked seats
function place(bookedSeats){
$('.' + settings.seatCss).click(function () {
if ($(this).hasClass(settings.selectedSeatCss)){
    alert('This seat is already reserved');
}
else{
    $(this).toggleClass(settings.selectingSeatCss);
    var val=$(this).children("a").attr("title");
    var row='A';
    var x=Math.floor(val/settings.cols);
    var y = (val%settings.cols);
    var row=String.fromCharCode(row.charCodeAt() + x);
    var seatNo=row+y;
    if($(this).hasClass(settings.selectingSeatCss)){
    seatss.push(seatNo);
  }
  else{
    removeA(seatss,seatNo);
  }
    }

});
 // this function is used for validation . 
$scope.clicked=function () {
    var str = [], item;
    $.each($('#place li.' + settings.selectingSeatCss + ' a'), function (index, value) {
        item = $(this).attr('title');
        
        str.push(item);                  
    });
    
  // if the Name or no. of seats input is blank 
      if($scope.names==undefined||$scope.names==''|| $scope.seat==undefined)
    {
      $scope.successfully=false;
      $scope.errorr=true;
      $scope.text=" Name or no. of seats cannot be blank";
      
    }
     else if(str.length!=$scope.seat) // if the number of seats you selected are different from what you chose
    { $scope.successfully=false;
      $scope.errorr=true;
      $scope.text= " You chose to book "+$scope.seat+" seat(s)";
    seatss=[];
      $.each($('.'+settings.selectingSeatCss), function (index, value) {
            $(this).toggleClass(settings.selectingSeatCss); 
      
    });
    }
    else 
    {
       //proceeds  if you have selected the amount of seats you specified
       $scope.errorr=false;
       $scope.successfully=true;
      $scope.text="Your ticket has been booked successfully "+$scope.names;
      $scope.tables.push({'name':$scope.names,'seats':$scope.seat,'seatnos':seatss});
      seatss=[];
      //$scope.$digest();
      $.each($('.'+settings.selectingSeatCss), function (index, value) {
            $(this).toggleClass(settings.selectingSeatCss); 
      });
     
    }
   
    
    
}
};

// this object has the properties for the seat map
var settings = {
               rows: 7,
               cols: 10,                     
               rowCssPrefix: 'row-',
               colCssPrefix: 'col-',
               seatWidth: 35, 
               seatHeight: 35,
               seatCss: 'seat',
               selectedSeatCss: 'selectedSeat',
               selectingSeatCss: 'selectingSeat'                                      
           };
var seatss=[];
// calling the factory to populate the view with  seat map
seatarrangement(settings,bookedSeats)

  place(bookedSeats);
});
