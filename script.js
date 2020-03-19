var constantClock
var currentHour

//Run clock forever
constantClock = setInterval(function(){

    //Check the time
    currentHour = moment().format("H")
    var currentHourNum = parseInt(currentHour)
    
    //Set Variables for before and after 
    var time = moment(currentHour,'H'), beforeTime = moment('09', 'H'), afterTime = moment('17', 'H');
    
    //Check if current time is after or before work hours set proper styles (green if before, gray if after)
    //If it is after 5
    if (time.isAfter(afterTime)) {
        
        for(i = 9; i <= 17; i++){
            $("#hour-" +i).addClass("past")   
            $("#hour-" + i ).removeClass("future")
            $("#hour-" + i ).removeClass("present")
        }

    //If it is before 9
    } else if(time.isBefore(beforeTime)){

        for(i = 9; i <= 17; i++){
            $("#hour-" +i).addClass("future")
            $("#hour-" + i ).removeClass("past")
            $("#hour-" + i ).removeClass("present")
        }
    
    //If its during work hours
    } else {
        
        //Take current hour apply present class remove other classes
        $("#hour-" + currentHour).addClass("present")
        $("#hour-" + currentHour ).removeClass("past")
        $("#hour-" + currentHour ).removeClass("future")
        
        //Take hours before and apply past class remove other classes
        for(i = currentHourNum - 1; i >= 9; i--){
            $("#hour-" + i ).addClass("past")
            $("#hour-" + i ).removeClass("future")
            $("#hour-" + i ).removeClass("present")
        }

        //take after hours and apply future class remove other classes
        for(i = currentHourNum + 1; i <= 17; i++){
            $("#hour-" + i).addClass("future")
            $("#hour-" + i ).removeClass("past")
            $("#hour-" + i ).removeClass("present")
        }

    }
},1000)




//Checks for clicks on any of the save buttons
$(".saveBtn").on("click",function(event){

    //What you clicked on
    var clickTarget = this

    //Gets the text in the clicked elements sibling (description)
    var textToSave = $(clickTarget).siblings(".description").val()

    //Gets the id of the parent element
    var parentElement = $(clickTarget).parents().attr("id")

    //Saves value in textToSave with a key of parentElement
    localStorage.setItem(parentElement,textToSave)

})






//Displays previously saved toDos onto screen
function renderToDos(){

    //Loops through every text box on screen
    for(i = 9; i <= 17; i++){

        //Gets each saved value
        var itemToRender = localStorage.getItem("hour-" + i)

        //If it had no value set text to empty string
        if(itemToRender === null){
            $("#hour-"+i).children(".description").val("")

        //If a value was saved, display it to its corresponding box
        } else {
            $("#hour-" +i).children(".description").val(itemToRender)
        }
    }
}


//Display previously saved text values
renderToDos()