//importing main container
const container = document.getElementById("grid-container");

//initializing an array for the images
var imgArray = new Array();

//defining grid creation function
function makeGrid(rows, cols) {
    //initializing grid rows and columns
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);

    //creating text container and defining grid area for it
    var text_box = document.createElement("div");
    container.appendChild(text_box).className = "grid-item text-box";
    const para = document.createElement("p");
    const node = document.createTextNode("It is not so much for its beauty that the forest makes a claim upon men's hearts, as for that subtle something, that quality of air that emanation from old trees, that so wonderfully changes and renews a weary spirit. —Robert Louis Stevenson");
    para.appendChild(node);
    text_box.appendChild(para);
    text_box.style.gridRowStart = 2;
    text_box.style.gridRowEnd = rows;
    text_box.style.gridColumnStart = 2;
    text_box.style.gridColumnEnd = cols;

    //importing images dynamically
    for (i = 0; i < (rows * 2 + (cols - 2) * 2); i++) {
        var cell = document.createElement("div");
        container.appendChild(cell).className = "grid-item grid-image";
        cell.setAttribute("id", "item" + (i + 1));
        var elem = document.createElement("img");
        elem.setAttribute("src", "images/" + (i + 1) + ".jpg");
        cell.appendChild(elem);
        elem.setAttribute("id", "image" + (i + 1));

        //inserting images to the image array
        imgArray[i] = elem;
        imgArray[i].src = elem.src;
    };
};

//executing grid creation function and performing media query for responsive design
responsiveGrid();

function responsiveGrid() {
    document.getElementById("grid-container").innerHTML = "";
    if (window.innerWidth > 1680) {
        makeGrid(3, 10);
    } else if (window.innerWidth > 1366) {
        makeGrid(3, 9);
    } else if (window.innerWidth > 1280) {
        makeGrid(3, 8);
    } else if (window.innerWidth > 1024) {
        makeGrid(4, 7);
    } else if (window.innerWidth > 640) {
        makeGrid(5, 7);
    } else if (window.innerWidth > 320) {
        makeGrid(10, 11);
    } else {
        makeGrid(15, 8);
    }
}

window.addEventListener('resize', responsiveGrid);

//defining image swapping animation
var id = null;
clearInterval(id);
id = setInterval(frame, 1000);
function frame() {
    const randomElement = imgArray[Math.floor(Math.random() * imgArray.length)];
    var parentIndex = imgArray.indexOf(randomElement);

    var temp = imgArray[parentIndex].src;
    imgArray[parentIndex].src = imgArray[parentIndex + 1].src;
    imgArray[parentIndex + 1].src = temp;
}

//continuing the animation when tab is active
window.onfocus = function () {
    clearInterval(id);
    id = setInterval(frame, 1000);
};

//pausing the animation when tab is inactive
window.onblur = function () {
    clearInterval(id);
};