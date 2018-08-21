var allGuides = []

var onCol = "rgb(188, 221, 188)";
var offCol = "rgb(220, 220, 220)";

/**
 * Updates document elements and buttons according to guide-selection
 */
function updateGUI(animated = true) {

    // Change visibility of all elements with class "filterGuides" according to the guide's visibility
    [].forEach.call(document.querySelectorAll('.filterGuides'), function (el) {

        var classList = el.className.split(' ');
        var visible = false;
        classList.forEach(guideName => {
            if(allGuides.includes(guideName)) {
                visible = (localStorage.getItem(guideName) == "true")
            }
        });

        if(animated) {
            // toggle visibility
            if(visible) {

                if (el.classList.contains('fade-out')){
                    el.classList.remove('fade-out');
                }
                if (!el.classList.contains('fade-in')){
                    el.classList.add('fade-in');
                }
                el.style.display = "block";
                setTimeout(function() { el.style.display = "block" }, 750);
            }
            else {
                if (!el.classList.contains('fade-out')){
                    el.classList.add('fade-out');
                }
                if (el.classList.contains('fade-in')){
                    el.classList.remove('fade-in');
                }
                setTimeout(function() { el.style.display = "none" }, 750);
            }
        }
        else {
            el.style.display = visible ? 'block' : 'none';
        }
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

/** 
 * Adds stylesheet for guide-ribbon, based on amount of found active guides
 */
function addGuidesStylesheet() {

    // get all active guides in the document
    [].forEach.call(document.querySelectorAll('.filterGuides'), function (el) {
        var classList = el.className.split(' ');
        classList.forEach(guideName => {
            if((allGuides.indexOf(guideName) < 0) && (guideName !== 'filterGuides')) {
                allGuides.push(guideName);
            }
        });
    });

    // create buttons for all found guides
    guideSel = document.getElementById('guideSel');
    allGuides.forEach(guide => {

        // create button
        var btn = document.createElement('Button');

        // add text
        var text = guide.replace('guide', '');
        btn.append(document.createTextNode(text));

        // add class
        btn.classList.add('btnGuide');

        // add id
        btn.id = guide;

        // add function
        btn.setAttribute('onclick', 'javascript: toggleGuide(this);')

        // add button
        guideSel.appendChild(btn);

    });

    // adjust styling of button-selector
    if(allGuides.length > 0) {
        // set correct y-offset for amount of active guides
        var yOff = ((allGuides.length * 40)+20);
        var guideSelCSS = "#guideDiv { bottom: -"+ yOff +"px; }";
        var style = document.createElement("style");
        if (style.styleSheet) {
            style.styleSheet.cssText = guideSelCSS;
        } else {
            style.appendChild(document.createTextNode(guideSelCSS));
        }
        document.getElementsByTagName('head')[0].appendChild(style);

        guideDiv = document.getElementById('guideDiv');
        guideDiv.style.display = 'block';
    }
}

window.onload = function(evt) { 
    timVersionInject();
    addGuidesStylesheet();
    updateGUI(false);
}

