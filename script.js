var noLeapYearArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var leapYearArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();
var nowDate = new Date(currentYear, currentMonth, currentDate.getDate())
var countDayInMonth;
var prevYear;
var prevMonth;
var nextYear;
var nextMonth;
var Data = [];
var outDate;
var outCell;
var oldBgColor;
var oldText;
for(var i=0;i<localStorage.length;i++)
{
    if(localStorage.getItem('item'+i)!=null)
    {
        var bufferArray = (localStorage.getItem('item'+i)).split(',');
        Data.push([bufferArray[0], bufferArray[1], bufferArray[2], bufferArray[3]]);
    }
}
//alert(localStorage.getItem('item'+0));
//alert(Data);
buildSpreadSheet();
add.onclick = function()
{
    dialog1.show();
}
exit.onclick = function()
{
    dialog1.close();
}
function nowButton()
    {
        currentYear = currentDate.getFullYear();
        currentMonth = currentDate.getMonth();
        document.getElementById('calendar').remove();
        document.getElementById('divCalendar').remove();
        buildSpreadSheet();
    }
function computePrevAndNextMonth()
    {
        if(currentMonth == 0)
        {
            prevMonth = 11;
            prevYear = currentYear-1;
            nextMonth == 1;
            nextYear = currentYear;
        }
        else
        if(currentMonth == 11)
        {
            prevMonth = 10;
            prevYear = currentYear;
            nextMonth = 0;
            nextYear = currentYear+1; 
        }
        else
        {
            prevMonth = currentMonth-1;
            prevYear = currentYear;
            nextMonth = currentMonth+1;
            nextYear = currentYear;
        }
    }
function countDayInMonthFun(year, month)
    {      
        if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
            {
                return leapYearArray[month];
            }
        else
            {
                return noLeapYearArray[month];
            }
    }
function convertMonthToString(anyDate)
    {
        switch(anyDate)
        {
           case 0: return 'Январь';
           case 1: return 'Февраль';
           case 2: return 'Март';
           case 3: return 'Апрель';
           case 4: return 'Май';
           case 5: return 'Июнь';
           case 6: return 'Июль';
           case 7: return 'Август';
           case 8: return 'Сентябрь';
           case 9: return 'Октябрь';
           case 10: return 'Ноябрь';
           case 11: return 'Декабрь';
        }
    }
function convertDayToString(anyDate)
    {
        switch(anyDate.getDay())
        {
            case 0: return 'Воскресенье';
            case 1: return 'Понедельник';
            case 2: return 'Вторник';
            case 3: return 'Среда';
            case 4: return 'Четверг';
            case 5: return 'Пятница';
            case 6: return 'Суббота';
        }
    }
function buttonLeft()
    {
        if(currentMonth == 0)
        {
            currentMonth = 11;
            currentYear--;
            document.getElementById('calendar').remove();
            document.getElementById('divCalendar').remove();
            buildSpreadSheet();
        }
        else
        {
            currentMonth--;
            document.getElementById('calendar').remove();
            document.getElementById('divCalendar').remove();
            buildSpreadSheet();
        }
    }
function buttonRight()
    {
        if(currentMonth == 11)
        {
            currentMonth = 0;
            currentYear++; 
            document.getElementById('calendar').remove();
            document.getElementById('divCalendar').remove();
            buildSpreadSheet();
        }
        else
        {
            currentMonth++;
            document.getElementById('calendar').remove();
            document.getElementById('divCalendar').remove();
            buildSpreadSheet();
        }
    }
function buildSpreadSheet()
    {
        computePrevAndNextMonth();
        countDayInMonth = countDayInMonthFun(currentYear, currentMonth);
        document.getElementById('textMonth').innerHTML = convertMonthToString(currentMonth) +' '+currentYear;
        var div = document.createElement('div');
        div.id = 'divCalendar';
        var spreadSheet = document.createElement('table');       
        spreadSheet.id = 'calendar';
        var anyString = '<tr>';
        var firstWeek = true;
        for (var i = 1; i <= countDayInMonth; i++)
        {
            var bufferDate = new Date(currentYear,currentMonth,i);
            var bufferDay = bufferDate.getDay();
            if(i == 1 && bufferDay != 1)
            {
                var countDayInPrevMonth = countDayInMonthFun(prevYear, prevMonth);
                if(bufferDay == 0)
                {
                    countDayInPrevMonth -=6;

                    for(var j = 0; j<=5;j++)
                    {
                        var twoBufferDate = new Date(prevYear, prevMonth, countDayInPrevMonth);
                        anyString += '<td id = "prevMonth">'+countDayInPrevMonth+' '+convertDayToString(twoBufferDate)+'</td>';
                        countDayInPrevMonth++;
                    }
                }
                else
                {
                    countDayInPrevMonth -= (bufferDay-2);

                    for(var j = 0; j<=bufferDay-2;j++)
                    {
                        var twoBufferDate = new Date(prevYear, prevMonth, countDayInPrevMonth);
                        anyString += '<td id = "noCurrentMonth">'+countDayInPrevMonth+' '+convertDayToString(twoBufferDate)+'</td>';
                        countDayInPrevMonth++;
                    }
                }
                
            }
            
            if(firstWeek)
            {
                if(nowDate.getDate() == bufferDate.getDate())
                {
                    anyString += '<td id = "nowDate" ';
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        anyString += 'style = "background-color:lightblue"';
                    }
                    anyString += '>'+i+' '+convertDayToString(bufferDate);
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        anyString += '<br><b>'+Data[j][0]+'</b><br>'+Data[j][2]+'<br>'+Data[j][3];
                    }
                    anyString += '</td>';
                }
                else
                {
                    anyString += '<td id = "currentMonth" ';
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        anyString += 'style = "background-color:lightblue"';
                    }
                    anyString += '>'+i+' '+convertDayToString(bufferDate);
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        anyString += '<br><b>'+Data[j][0]+'</b><br>'+Data[j][2]+'<br>'+Data[j][3];
                    }
                    anyString += '</td>';
                }
            }    
            else
            {
                if(nowDate.getDate() == bufferDate.getDate())
                {
                    anyString += '<td id = "nowDate" ';
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        anyString += 'style = "background-color:lightblue"';
                    }
                    anyString += '>'+i;
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        {
                            if(Data[j][2] == null && Data[j][3] == null)
                            {
                                anyString += '<br><b>'+Data[j][0]+'</b>';
                            }
                            else
                            anyString += '<br><b>'+Data[j][0]+'</b><br>'+Data[j][2]+'<br>'+Data[j][3];
                        }
                    }
                    anyString += '</td>';
                }
                else
                {
                    anyString += '<td id = "currentMonth" ';
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        anyString += 'style = "background-color:lightblue"';
                    }
                    anyString += '>'+i;
                    for(var j=0;j<Data.length;j++)
                    {
                        var twoBufferDate = new Date(currentYear,currentMonth,i+1);
                        if(twoBufferDate.toISOString().slice(0,10) == Data[j][1])
                        {
                            if(Data[j][2] == null && Data[j][3] == null)
                            {
                                anyString += '<br><b>'+Data[j][0]+'</b>';
                            }
                            else
                            anyString += '<br><b>'+Data[j][0]+'</b><br>'+Data[j][2]+'<br>'+Data[j][3];
                        }
                    }
                    anyString += '</td>';
                }
            }
            if(bufferDay == 0)
            {
                firstWeek = false;
                anyString += '</tr>'
            }
            if(i == countDayInMonth && bufferDay!=0)
            {
                for(var j = 0; j<=6-bufferDay;j++)
                {
                    anyString += '<td id = "noCurrentMonth">'+(j+1)+'</td>';
                }
            }
        }
        spreadSheet.innerHTML = anyString;
        div.appendChild(spreadSheet);
        document.body.append(div);
        var table = document.getElementById("calendar");
if (table != null) {
    for (var i = 0; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
        {
            table.rows[i].cells[j].onmouseover = function() {
                mouseOverCell(this);
            };
            table.rows[i].cells[j].onmouseout = function() {
                mouseOutCell(this);
            };
            table.rows[i].cells[j].onclick = function () {
                if(this.id == 'nowDate' || this.id == 'currentMonth')
                tableText(this);
            };
        }
    }
} 
}

function tableText(tableCell) {
    if(((tableCell.getBoundingClientRect().right/screen.width)*100)<60)
    {
        document.getElementById('dialog2').position = 'absolute';
        document.getElementById('dialog2').style.marginLeft = tableCell.getBoundingClientRect().right.toString()+'px';
    }
    else
    {
        document.getElementById('dialog2').position = 'absolute';
        document.getElementById('dialog2').style.marginLeft = (tableCell.getBoundingClientRect().right-420).toString()+'px'
    }
    if(((tableCell.getBoundingClientRect().top/screen.height)*100)<60)
    {
        document.getElementById('dialog2').style.marginTop = (tableCell.getBoundingClientRect().top-150).toString()+'px';
    }
    else
    {
        document.getElementById('dialog2').style.marginTop = (tableCell.getBoundingClientRect().top-300).toString()+'px';
    }
    dialog2.show();
    var bufferDate;
    if(tableCell.textContent.search(/\s/) != -1)
    bufferDate = new Date(currentYear, currentMonth, parseInt(tableCell.textContent.slice(0,tableCell.textContent.search(/\s/)))+1)
    else
    bufferDate = new Date(currentYear, currentMonth, parseInt(tableCell.textContent)+1)
    outDate = bufferDate;
    for(var j=0;j<Data.length;j++)
        {
            if(bufferDate.toISOString().slice(0,10) == Data[j][1])
            {
                eventInput.value = Data[j][0];
                date.value = Data[j][1];
                people.value = Data[j][2];
                description.value = Data[j][3];
            }
        }
    date.value = bufferDate.toISOString().slice(0,10);
    tableCell.style.backgroundColor = 'green';
    outCell = tableCell;
}
exit2.onclick = function()
{
    dialog2.close();
    if(outCell.id == 'nowDate') {outCell.style.backgroundColor = 'lightgray';}
    else
    outCell.style.backgroundColor = 'white';
}


doneButton.onclick = function()
{
    if(outCell.id == 'nowDate') {outCell.style.backgroundColor = 'lightgray';}
    else
    outCell.style.backgroundColor = 'white';
    var pushEnabled = false;
    var bufferDate = outDate;
    for(var j=0;j<Data.length;j++)
        {
            if(bufferDate.toISOString().slice(0,10) == Data[j][1])
            {
                Data[j][0] = eventInput.value;
                Data[j][1] = date.value;
                Data[j][2] = people.value;
                Data[j][3] = description.value;
                window.localStorage.clear();
        for(var i=0;i<Data.length;i++)
            {
              window.localStorage.setItem('item'+i, Data[i]);
            }
                pushEnabled = true;
            }
        }
    if(!pushEnabled)
    Data.push([eventInput.value, date.value, people.value, description.value]);
    window.localStorage.clear();
    for(var i=0;i<Data.length;i++)
    {
        window.localStorage.setItem('item'+i, Data[i]);
    }
    document.getElementById('calendar').remove();
    document.getElementById('divCalendar').remove();
    eventInput.value = date.value = people.value = description.value = null;
    buildSpreadSheet();
    dialog2.close();
}
quickEvent.onclick = function()
{
    var regExp = /[0-9]{4}-(01|02|03|04|05|06|07|08|09|10|11|12)-(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)[\s]{0,1},[\s]{0,1}[А-ЯЁа-яё\s]{0,}/;
    if(regExp.test(addInput.value))
    {
        var bufferArray = addInput.value.split(/,[\s]{0,1}/);
        Data.push([bufferArray[1], bufferArray[0], null, null]);
        window.localStorage.clear();
        for(var i=0;i<Data.length;i++)
        {
            window.localStorage.setItem('item'+i, Data[i]);
        }
        addInput.value = null;
        document.getElementById('calendar').remove();
        document.getElementById('divCalendar').remove();
        buildSpreadSheet();
        dialog1.close();
    }
    else
    {alert('неправильно введены данные');}
}

searchElement.onsearch = function()
{
    var anyString;
    if(searchElement.value != '')
    {
        if(Data.length!=0)
        {
            anyString += dialog3.innerHTML;
            anyString += '<table id = "dialogTable">'
            for(var i = 0;i<Data.length;i++)
            {
                if(Data[i][0].indexOf(searchElement.value)!==-1)
                {
                    anyString += '<tr><td>'+Data[i][0]+'<br>'+Data[i][1]+'</td></tr>';
                }
            }
            anyString += '</table>';
            dialog3.innerHTML = anyString.replace('undefined', '');
            dialog3.show();
            var table = document.getElementById("dialogTable");
            if (table != null) {
                for (var i = 0; i < table.rows.length; i++) {
                    for (var j = 0; j < table.rows[i].cells.length; j++)
                    {
                        table.rows[i].cells[j].onmouseover = function() {
                            mouseOverCell(this);
                        };
                        table.rows[i].cells[j].onmouseout = function() {
                            mouseOutCell(this);
                        };
                        table.rows[i].cells[j].onclick = function () {
                            clickOnCell(this);
                        };
                    }
                }
        }
    }
}
    else
    {
        dialog3.close();
    }
    
}

function mouseOverCell(cell)
{
    oldBgColor = cell.style.backgroundColor;
    oldText = cell.style.color;
    cell.style.backgroundColor = 'blue';
    cell.style.color = 'white';
}
function mouseOutCell(cell)
{
    cell.style.backgroundColor = oldBgColor;
    cell.style.color = oldText ;
}
function clickOnCell(cell)
{
    var regExp = /[0-9]{4}-(01|02|03|04|05|06|07|08|09|10|11|12)-(01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31)/;
    var anyArray = cell.textContent.match(regExp);
    var anyString = anyArray[0].split('-');
    var bufferDate = new Date(anyString[0],anyString[1]-1,anyString[2])
    currentYear = bufferDate.getFullYear();
    currentMonth = bufferDate.getMonth();
    document.getElementById('calendar').remove();
    document.getElementById('dialogTable').remove();
    document.getElementById('divCalendar').remove();
    buildSpreadSheet();
    dialog3.close();
}
