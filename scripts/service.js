function validatePhone(txtPhone) {
    var a = document.getElementById(txtPhone).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

function validateCredit(cardNum) {
    var a = document.getElementById(cardNum).value;
    // This filter asks for something like (12345), so parentheses with any number (at least 1)
    // of digits
    var filter = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    if (filter.test(a)) {
        return true;
    }
    else {
        return false;
    }
}

var unavailableDates = ["06/28/2020","07/05/2020","07/12/2020"]
var felix = ["06/25/2020","06/27/2020","07/02/2020","07/04/2020","07/09/2020","07/11/2020"]

const setDateFormat = "mm/dd/yy";

function disableDates(date) {
    // Sunday is Day 0, disable all Sundays
    if (date.getDay() == 0)
        return [false];
    var string = jQuery.datepicker.formatDate(setDateFormat, date);
    return [ unavailableDates.indexOf(string) == -1 && felix.indexOf(string) == -1]
}

$(document).ready(function(){

    
    $(document).ready(function(){
      $("input").focus(function(){
        $(this).css("background-color", "yellow");
      });
      $("input").blur(function(){
        $(this).css("background-color", "white");
      });
    });

    // phone validation, it calls validatePhone
    // and also some feedback as an Alert + putting a value in the input that shows the format required
    // the "addClass" will use the class "error" defined in style.css and add it to the phone input
    // The "error" class in style.css defines yellow background and red foreground
    $("#phone").on("change", function(){
        if (!validatePhone("phone")){
            alert("Wrong format for the phone number, use numbers only without spacing");
            $("#phone").val("xxxxxxxxxx");
            $("#phone").addClass("error");
        }
        else {
            $("#phone").removeClass("error");
        }
    });

    $("#credit").on("change", function(){
        if (!validateCredit("credit")){
            alert("Wrong format for the credit card number, use numbers only without spacing");
            $("#credit").val("xxxxxxxxxxxxxxxx");
            $("#credit").addClass("error");
        }
        else {
            $("#credit").removeClass("error");
        }
    });

    // To change the style of the calender, look in jqueryui.com, under Themes, in the ThemeRoller Gallery 
    // You can try different themes (the names are under the calendars) / This is Excite Bike 
    // To use a different theme you must include its css in your HTML file. 
    // The one I included in my HTML is the Excite Bike, but you can try others

    // Also, here is a good tutorial for playing with the datepicker in https://webkul.com/blog/jquery-datepicker/ 
    // Datepicker is also documented as one of the widgets here: https://api.jqueryui.com/category/widgets/ 
    $( "#dateInput1" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/24/2020'),  
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            daysOfWeekDisabled: [4,6],
            beforeShowDay: disableDates,
            beforeShowDay: function(a) { 
                a = a.getDay();
                return[a>0 && a<4,""];
            }
        }   
    );
$( "#dateInput2" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/24/2020'),  
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates,
            beforeShowDay: function(a) { 
                a = a.getDay();
                return[a>1 && a<6,""];
            }
        }   
    );
$( "#dateInput3" ).datepicker(
        {
            dateFormat: setDateFormat,
            // no calendar before June 1rst 2020
            minDate: new Date('06/24/2020'),  
            maxDate: '+4M',
            // used to disable some dates
            beforeShowDay: $.datepicker.noWeekends,
            beforeShowDay: disableDates,
            beforeShowDay: function(a) { 
                a = a.getDay();
                return[a>3 && a<=6,""];
            }
        }   
    );

    // Look at the different events on which an action can be performed
    // https://www.w3schools.com/jquery/jquery_events.asp
    // Here, we put 
    $("#debit").on("mouseenter", function(){
        $("#debit").addClass("showInput");
    });

    $("#debit").on("mouseleave", function(){
        $("#debit").removeClass("showInput");
    });
  
    // https://jqueryui.com/tooltip/ 
    // The class "highlight" used here is predefined in JQuery UI
    // the message of the tooltip is encoded in the input (in the HTML file)
    $("#debit").tooltip({
        classes: {
          "ui-tooltip": "highlight"
        }
      });


});
