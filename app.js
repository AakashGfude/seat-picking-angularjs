var app=angular.module('app',['ui.router']);
app.controller('MainCtrl',function($scope){
});
app.config(function($stateProvider,$urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
	.state('book',{
		url:'/book',
		templateUrl: 'partials/seat-book.html',
    controller:'SecondCtrl'
	})
})
app.controller('SecondCtrl',function($scope){
var name;
var seats;
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
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
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
 
$('#btnShowNew').click(function () {
    var str = [], item;
    $.each($('#place li.' + settings.selectingSeatCss + ' a'), function (index, value) {
        item = $(this).attr('title');
        
        str.push(item);                  
    });
    
  // if the number of seats you selected are different from what you chose
      if($scope.names==undefined|| $scope.seat==undefined)
    {
      $("#total").text("* Name or no. of seats cannot be blank");
    }
     else if(str.length!=$scope.seat)
    { $("#total").text(" * You chose to book "+$scope.seat+" seat(s)");
    seatss=[];
      $.each($('.'+settings.selectingSeatCss), function (index, value) {
            $(this).toggleClass(settings.selectingSeatCss); 
      
    });
    }
    else 
    {
       //proceeds  if you have selected the amount of seats you specified
      $("#total").text("");
      $scope.tables.push({'name':$scope.names,'seats':$scope.seat,'seatnos':seatss});
      seatss=[];
      $scope.$digest();
      $.each($('.'+settings.selectingSeatCss), function (index, value) {
            $(this).toggleClass(settings.selectingSeatCss); 
      });
     
    }
   
    
    if(($("#total").text()==""))
      alert("Thanks "+ $scope.name+ " for booking your ticket");
})
};


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
var str = [], seatNo, className,colNo,rowNo;
var seatss=[];
var rowNo='A';
var left=-50;
// this function creates the seat map  , it assigns classes and aligns each individual seat
var init=function (reservedSeat) {

              
                for (i = 0; i < settings.rows; i++) {
                  str.push('<li style="top:' + (((i * (settings.seatHeight))-10)).toString() + 'px;left:' + left + 'px;font-size: 200%">' +
                                  '<a title="' + rowNo + '">' + rowNo + '</a>' +
                                  '</li>');
                    for (j = 0; j < settings.cols; j++) {
                        seatNo = (j + i * settings.cols + 1);
                        
                        colNo=j+1;

                        
                        className = settings.seatCss + ' ' + settings.rowCssPrefix + i.toString() + ' ' + settings.colCssPrefix + j.toString();
                        if ($.isArray(reservedSeat) && $.inArray(seatNo, reservedSeat) != -1) {
                            className += ' ' + settings.selectedSeatCss;
                        }
                        str.push('<li class="' + className + '"' +
                                  'style="top:' + (i * settings.seatHeight).toString() + 'px;left:' + (j * settings.seatWidth).toString() + 'px">' +
                                  '<a title="' + seatNo + '">' + colNo + '</a>' +
                                  '</li>');
                    }rowNo=String.fromCharCode(rowNo.charCodeAt() + 1);
                }
                $('#place').html(str.join(''));
            };
         
            init(bookedSeats);

  place(bookedSeats);
});