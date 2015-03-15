app.factory('removeA',function(){
  return function(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
});
app.factory('seatarrangement',function()
{
  return function(settings,reservedSeat){
    var str = [], seatNo, className,colNo,rowNo;
var rowNo='A';
var left=-50;
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
  }
});