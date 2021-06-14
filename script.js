var height
var currentCols = 16;
var color = "black"; //default black
var colors = ["red", "orange", "yellow", "pink", "purple", "green", "blue"]
var rainbowCount = 0; //Starts at zero. ranges through colors 
var paint = false;
var customColor = false;
var currentOpacity = 0.3;//Default opacity for non-custom color
makeGrid(currentCols); //Default grid   

//Update size on slider input
var slider = document.getElementById("sizeOutput");
var size = document.getElementById("size");

size.oninput = function(){
    currentCols = this.value;
    slider.innerHTML = currentCols;
    makeGrid()
}


//Creates grid with size/grid density defined by row
function makeGrid() {
    // Creates rows one by one until max rows is reached
    // Creates containers
    resetGrid()
    for(i = 0; i < currentCols; i++) {
        var column = document.createElement("div");
        column.setAttribute('class', 'column');
        document.getElementById("grid").appendChild(column);
        // Creates box div to go in containers creating one row
        for (j = 0; j < currentCols; j++) {
            var box = document.createElement("div");
            box.setAttribute("class", "box");
            box.setAttribute("prevopacity", currentOpacity);
           
            // Add event listener for mouse over events
            box.addEventListener("mouseover", hoverBox);
            column.appendChild(box);
        }
    }
}

//Action for cells in grid to draw color
function hoverBox(e){
    // add mouseover event for target's background color
    if(paint)
    {
        currentOpacity = e.target.style.backgroundColor.slice(-4, -1);
        var prevOpacity = e.target.getAttribute("prevopacity");

        if(customColor == false)
        {
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
        else{e.target.style.backgroundColor = colorSelect();}
    }
    
}

//Color Selection - input opacity and returns rgba for color
function colorSelect(opacity){
    // Gets the selected color option with input opacity
    var inputColor = color;

    if(customColor == true)
    {
        return color;
    }
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

//Color update
function updateColor(value)
{
    color = value;
    //Reset active button
    button = document.getElementsByClassName("active")[0];
    if(button != null)
    {
        button.setAttribute("class", "")
    }

    button = document.getElementById(color);
    button.setAttribute("class", "active")

    customColor = false;
}
function setCustomColor(input)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(input);
    color = 'rgb('+parseInt(result[1], 16)+', ' + parseInt(result[2], 16) +', '+parseInt(result[3], 16)+')'; 
    
    customColor = true;

    //Reset active button
    button = document.getElementsByClassName("active")[0];
    if(button != null)
    {
        button.setAttribute("class", "")
    }

}

//Pant acitve update
function setPaintActive(input)
{
    paint = input;
}

//Take screenshot and replace grid with image
function screenshot() {//Takes screenshot and replaces sketch
    html2canvas(document.getElementById("grid"), {scale: 2}).then(canvas => {
        var sketch = document.getElementById("grid");
        while (sketch.firstChild) {
            sketch.removeChild(sketch.firstChild);
        }
        sketch.appendChild(canvas);
    });

}

//Remove grid and create new grid
function resetPage(){
    makeGrid()
    return;
}
//Removes grid and resets opacity
function resetGrid(){
    var elem = document.getElementById("grid");
    while (elem.firstChild) elem.removeChild(elem.firstChild);
    currentOpacity = 0.3;//Reset opacity

}