const container = document.getElementsByClassName("container")
const box = document.getElementById('box');
var height

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
            box.addEventListener("mouseover", hoverBox);
            container[i].appendChild(box);
        }
    }
}

function hoverBox(e){
    // add mouseover event for target's background color
    e.target.style.backgroundColor = colorSelect();
}

function resetPage(){
    location.reload();
    return;
}

function colorSelect(){
    // Gets the selected color option on change
    var element = document.getElementById('color');
    var elementValue = element.options[element.selectedIndex].value;
    return elementValue;
}

function sizeSelect(){
    // Gets the selected size on change
    var element = document.getElementById('size');
    var elementValue = element.options[element.selectedIndex].value;

    // Change the width and height of boxes to fit area
    console.log(document.getElementById('box'));

    // Make grid 
    makeGrid(elementValue);    

    return elementValue;

}

function resetGrid(){
    var elem = document.getElementById("grid");
    while (elem.firstChild) elem.removeChild(elem.firstChild);
}
