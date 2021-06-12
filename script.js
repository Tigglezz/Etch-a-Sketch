const container = document.getElementsByClassName("container")
const box = document.getElementById('box');
var height
var rainbowCount = 1; //Starts at one. ranges through colors 
var color;
var opacity = 0.3;

makeGrid(16); //Default grid   

function makeGrid(rows) {
    // Creates rows one by one until max rows is reached
    // Creates containers
    resetGrid()
    for(i = 0; i < rows; i++) {
        var newContainer = document.createElement("div");
        newContainer.setAttribute('class', 'container');
        document.getElementById("grid").appendChild(newContainer);
    // Creates box div to go in containers creating one row
        for (j = 0; j < rows; j++) {
            var box = document.createElement("div");
            box.setAttribute("id", "box");

            // Set size according to amount of rows
            if(rows == 48) {
                box.style.width = "8px"
                box.style.height = "8px"
            } else if(rows == 32) {
                box.style.width = "13px"
                box.style.height = "13px"
            } else if(rows == 24) {
                box.style.width = "18px"
                box.style.height = "18px"
            } else if(rows == 16) {
                box.style.width = "28px"
                box.style.height = "28px"
            } else if(rows == 8) {
                box.style.width = "58px"
                box.style.height = "58px"
            }

            // Add event listener for mouse over events
            box.addEventListener("mouseenter", hoverBox);
            container[i].appendChild(box);
        }
    }
}

function hoverBox(e){
    // add mouseover event for target's background color
    if(colorSelect() == "rainbow"){
        rainbow(e);
    }
    else{
        console.log(e.target.style.backgroundColor);
        if(e.target.style.backgroundColor == colorSelect())
        {
            opacity += 0.1;
        }
        else if(e.target.style.backgroundColor == '')
        {
            //reset opacity
            opacity = 0.3;
        }
        e.target.style.backgroundColor = colorSelect();


    }
}

function resetPage(){
    location.reload();
    return;
}

function colorSelect(){
    // Gets the selected color option on change
    var element = document.getElementById('color');
    var elementValue = element.options[element.selectedIndex].value;
    switch(elementValue)
    {
        case "black":
            return 'rgba(0, 0, 0, ' + opacity+')'
        case "red":
            return 'rgba(255, 0, 0, ' + opacity+')'
        case "yellow":
            return 'rgba(255, 255, 0, ' + opacity+')'
        case "pink":
            return 'rgba(255, 0, 255, ' + opacity+')'
        case "purple":
            return 'rgba(125, 0, 125, ' + opacity+')'
        case "orange":
            return 'rgba(255, 125, 0, ' + opacity+')'
        case "green":
            return 'rgba(0, 255, 0, ' + opacity+')'
        case "blue":
            return 'rgba(0, 0, 255, ' + opacity+')'
    }    
}

function resetColor()
{
    opacity = 0.5;
}

function sizeSelect(){
    // Gets the selected size on change
    var element = document.getElementById('size');
    var elementValue = element.options[element.selectedIndex].value;

    // Make grid 
    makeGrid(elementValue);    

    return elementValue;

}

function resetGrid(){
    var elem = document.getElementById("grid");
    while (elem.firstChild) elem.removeChild(elem.firstChild);
}

function rainbow(e)
{
    // Gets all color options
    var element = document.getElementById('color');

    if(rainbowCount == 7){rainbowCount = 1}; //Max range is 7
    //Choose random color
    e.target.style.backgroundColor = element.options[rainbowCount++].value;
     
    
}