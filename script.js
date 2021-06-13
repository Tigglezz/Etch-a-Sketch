const container = document.getElementsByClassName("container")
var height
var currentRows;
var color = "black"; //default black
var colors = ["red", "orange", "yellow", "pink", "purple", "green", "blue"]
var rainbowCount = 0; //Starts at zero. ranges through colors 
var paint = false;
var currentOpacity = 0.3;
makeGrid(16); //Default grid   

function makeGrid(rows) {
    // Creates rows one by one until max rows is reached
    // Creates containers
    currentRows = rows;
    resetGrid()
    for(i = 0; i < rows; i++) {
        var newContainer = document.createElement("div");
        newContainer.setAttribute('class', 'container');
        document.getElementById("grid").appendChild(newContainer);
        // Creates box div to go in containers creating one row
        for (j = 0; j < rows; j++) {
            var box = document.createElement("div");
            box.setAttribute("class", "box");
            box.setAttribute("prevopacity", currentOpacity);

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
            box.addEventListener("mouseover", hoverBox);
            container[i].appendChild(box);
        }
    }
}

function hoverBox(e){
    // add mouseover event for target's background color

    if(paint)
    {
        currentOpacity = e.target.style.backgroundColor.slice(-4, -1);
        var prevOpacity = e.target.getAttribute("prevopacity");

        if(currentOpacity == prevOpacity)
        {
            prevOpacity =  parseFloat(currentOpacity) + 0.1;
            e.target.setAttribute("prevopacity", prevOpacity.toString());
        }
        if(colorSelect(currentOpacity).slice(5,-4) != e.target.style.backgroundColor.slice(5,-4) && color != "rainbow")
        {
            //Different color
            prevOpacity = 0.3;
        }

        e.target.style.backgroundColor = colorSelect(prevOpacity);

    }
    
}

function resetPage(){
    makeGrid(currentRows)
    return;
}

function colorSelect(opacity){
    // Gets the selected color option with input opacity
    var inputColor = color;
    
    if(opacity == "")
    {
        opacity = 0.5;
    }
    if(inputColor == "rainbow"){
        inputColor = colors[rainbowCount++];
        if(rainbowCount == 7){rainbowCount = 0}; //Max range is 7
    }

    switch(inputColor)
    {
        case "black":
            return 'rgba(0, 0, 0, ' + opacity +')'
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
    currentOpacity = 0.3;//Reset opacity
    //document.getElementById("bottomBtns").removeChild(document.getElementById("bottomBtns").lastChild);

}


function updateColor(value)
{
    color = value;
    //Reset active button
    button = document.getElementsByClassName("active")[0];
    button.setAttribute("class", "")

    button = document.getElementById(color);
    button.setAttribute("class", "active")
}

function setPaintActive(input)
{
    paint = input;
}

function screenshot() {//Takes screenshot and replaces sketch
    html2canvas(document.getElementById("grid"), {scale: 33}).then(canvas => {
        var sketch = document.getElementById("grid");
        while (sketch.firstChild) {
            sketch.removeChild(sketch.firstChild);
        }
        sketch.appendChild(canvas);



    });

}