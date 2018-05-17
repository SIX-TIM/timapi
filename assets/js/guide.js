var allGuides = ["guideUnattended", "guidePetrol", "guideDialog"]

var onCol = "rgb(188, 221, 188)";
var offCol = "rgb(220, 220, 220)";

/**
 * Updates document elements and buttons according to guide-selection
 */
function updateGUI() {

    // Change visibility of all elements with class "filterGuides" according to the guide's visibility
    [].forEach.call(document.querySelectorAll('.filterGuides'), function (el) {

        var classList = el.className.split(' ');
        var visible = false;
        classList.forEach(guideName => {
            if(allGuides.includes(guideName)) {
                visible = (localStorage.getItem(guideName) == "true")
            }
        });
        
        // toggle visibility
        el.style.display = visible ? 'block' : 'none';
    });

    // Update guide-buttons:
    for(let guideName of allGuides) {
        let btnGuide = document.getElementById(guideName);
        if(btnGuide != undefined) {
            btnGuide.style.background = (localStorage.getItem(guideName) == "true") ? onCol : offCol;
        }
    }
}

/**
 * Toggles visibility of a certain guide
 * @param guideName Name of guide 
 */
function toggleGuide(btnGuide) {
    var guideName = btnGuide.id;
    if(allGuides.includes(guideName)) {
        // get current state from localStorage
        let currentState = (localStorage.getItem(guideName) == "true")
        // toggle state
        window.localStorage.setItem(guideName, String(!currentState));
    }
    updateGUI();
}

function addGuidesStylesheet() {
    // get amount of active guides (find all buttons)
    var guideCtr = 0;
    [].forEach.call(document.querySelectorAll('.btnGuide'), function (el) {
        guideCtr++;
    });
    // set correct y-offset for amount of active guides
    var yOff = ((guideCtr * 40)+20);
    var guideSelCSS = "#guideDiv { bottom: -"+ yOff +"px; }";
    var style = document.createElement("style");
    if (style.styleSheet) {
        style.styleSheet.cssText = guideSelCSS;
    } else {
        style.appendChild(document.createTextNode(guideSelCSS));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
}

window.onload = function(evt) { 
    var guideDiv = document.getElementById("guideDiv"); 
    addGuidesStylesheet();
    updateGUI();
}

