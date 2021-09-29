$(document).ready(function () {
var reformatDate = moment().format("dddd, MMMM Do YYYY, H:mm a");
$("#currentDay").text(reformatDate);

var currentHour = (new Date()).getHours(); 

// for testing purpose:
// currentHour = 11; 

// console.log(currentHour);
// read text content from local storage
let calendarEventLocalString = localStorage.getItem("calendarEventLocal");
let calanderEventData;
if (calendarEventLocalString === null) {
    calanderEventData = {};
    localStorage.setItem("calendarEventLocal", JSON.stringify(calanderEventData));
} else {
    calanderEventData = JSON.parse(calendarEventLocalString);
}

$('.container textarea').each(function(){
    // console.log($(this).data('hour'));
    if($(this).data('hour') < currentHour) {  
        $(this).addClass("past"); //past
    } else if($(this).data('hour') == currentHour) { 
        $(this).addClass("present"); //present
    } else {  
        $(this).addClass("future"); //future
    } 
    $(this).val(calanderEventData[$(this).data('hour')]);
}) 

$('.container button').each(function(){
   $(this).click(saveEvent);
})

function saveEvent() {
    // console.log($(this).siblings('textarea').val());
    let textInput = $(this).siblings('textarea')
    let hour = textInput.data('hour');
    calanderEventData[hour] = textInput.val();
    localStorage.setItem("calendarEventLocal", JSON.stringify(calanderEventData));
}


function resetCalender(){
    localStorage.clear();
    $('.container textarea').each(function(){
        $(this).val('');
    }) 
};

$('#reset').click(resetCalender);


})