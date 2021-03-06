var allGuides = []
var currentGuides = {}

var onCol = "rgb(188, 221, 188)";
var offCol = "rgb(210, 210, 210)";

/**
 * Updates document elements and buttons according to guide-selection
 */
function updateGUI(animated) {

    // Change visibility of all elements with class "filterGuides" according to the guide's visibility
    [].forEach.call(document.querySelectorAll('.filterGuides'), function (el) {

        var classList = el.className.split(' ');
        var visible = false;
        classList.forEach(function(guideName) {
            if(allGuides.indexOf(guideName) >= 0) {
                try {
                    visible = visible || (localStorage.getItem(guideName) == "true")
                }
                catch(err) {
                    if(guideName in currentGuides) {
                        visible = visible || currentGuides[guideName];
                    }
                    // if guide not present in currentGuides, add it as visible
                    else {
                        currentGuides[guideName] = true;
                        visible = true;
                    }
                }
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
    allGuides.forEach(function(guideName) {
        let btnGuide = document.getElementById(guideName);
        if(btnGuide != undefined) {
            var visible = true;
            try {
                visible = (localStorage.getItem(guideName) == "true")
            }
            catch(err) {
                if(guideName in currentGuides) {
                    visible = currentGuides[guideName];
                }
                else {
                    currentGuides[guideName] = true;
                    visible = true;
                }
            }

            btnGuide.style.background = (visible ? onCol : offCol);
        }
    });
}


/**
 * Toggles visibility of a certain guide
 * @param guideName Name of guide 
 */
function toggleGuide(btnGuide) {
    var guideName = btnGuide.id;
    if(allGuides.indexOf(guideName) >= 0) {
        // try to get current state from localStorage
        try {
            let visible = (localStorage.getItem(guideName) == "true")
            // toggle state
            window.localStorage.setItem(guideName, String(!visible));
        }
        catch(err) {
            if(guideName in currentGuides) {
                currentGuides[guideName] = !currentGuides[guideName];
            }
            else {
                currentGuides[guideName] = true;
            }
        }
        
    }
    updateGUI(true);
}

/** 
 * Adds stylesheet for guide-ribbon, based on amount of found active guides
 */
function addGuidesStylesheet() {

    // get all active guides in the document
    [].forEach.call(document.querySelectorAll('.filterGuides'), function (el) {
        var classList = el.className.split(' ');
        classList.forEach(function(guideName) {
            if((allGuides.indexOf(guideName) < 0) && (guideName !== 'filterGuides') && (guideName.indexOf('guide') >= 0)) {
                allGuides.push(guideName);
            }
        });
    });

    var guideDiv = document.getElementById('guideDiv');
    var guideTitle = document.getElementById('guideTitle');
    var guideCloseBtn = document.getElementById('closeGuideSel');
    var guideSel = document.getElementById('guideSel');

    // start hidden
    var showGuideSelection = false
    guideSel.style.opacity = 0;
    guideCloseBtn.style.opacity = 0;
    guideSel.style.display = "none";

    guideDiv.onclick = function (e) {

        if(e.srcElement != guideDiv && e.srcElement != guideTitle && e.srcElement != guideCloseBtn) {
            return;
        }

        // hide guide selection; set css classes for animation
        if(showGuideSelection) {
            if (guideDiv.classList.contains('showGuideSel')){
                guideDiv.classList.remove('showGuideSel');
            }
            if (!guideDiv.classList.contains('hideGuideSel')){
                guideDiv.classList.add('hideGuideSel');
            }
            if (!guideSel.classList.contains('fade-out')){
                guideSel.classList.add('fade-out');
            }
            if (guideSel.classList.contains('fade-in')){
                guideSel.classList.remove('fade-in');
            }
            if (!guideCloseBtn.classList.contains('fade-out')){
                guideCloseBtn.classList.add('fade-out');
            }
            if (guideCloseBtn.classList.contains('fade-in')){
                guideCloseBtn.classList.remove('fade-in');
            }
            guideSel.style.display = "none";
        }
        // show guide selection; set css classes for animation
        else {
            if (guideDiv.classList.contains('hideGuideSel')){
                guideDiv.classList.remove('hideGuideSel');
            }
            if (!guideDiv.classList.contains('showGuideSel')){
                guideDiv.classList.add('showGuideSel');
            }
            if (guideSel.classList.contains('fade-out')){
                guideSel.classList.remove('fade-out');
            }
            if (!guideSel.classList.contains('fade-in')){
                guideSel.classList.add('fade-in');
            }
            if (guideCloseBtn.classList.contains('fade-out')){
                guideCloseBtn.classList.remove('fade-out');
            }
            if (!guideCloseBtn.classList.contains('fade-in')){
                guideCloseBtn.classList.add('fade-in');
            }
            guideSel.style.display = "block";
        }
        showGuideSelection = !showGuideSelection;
    }

    // create buttons for all found guides
    allGuides.forEach(function(guide) {

        // create button
        var btn = document.createElement('Button');

        // add text
        var text = guide.replace('guide', '');
        btn.appendChild(document.createTextNode(text));

        // add class
        btn.classList.add('btnGuide');

        // add id
        btn.id = guide;

        // add function
        btn.setAttribute('onclick', 'javascript: toggleGuide(this);')

        // add button
        guideSel.appendChild(btn);

    });

    // adjust styling of guide-selector based on count of guide-buttons
    if(allGuides.length > 0) {
        var height = ((allGuides.length * 40)+72);
        var keyframesCSS = "@keyframes grow { from { height: 62.75px; margin-bottom: 80px; } to { height: "+height+"px; margin-bottom: 10px; } } @keyframes shrink { from { height: "+height+"px; margin-bottom: 10px; } to { height: 62.75px; margin-bottom: 80px; } }";
        var style = document.createElement("style");
        if (style.styleSheet) {
            style.styleSheet.cssText = keyframesText;
        } else {
            style.appendChild(document.createTextNode(keyframesCSS));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        guideDiv.style.display = "block";
    }
}

window.onload = function(evt) { 
    timVersionInject();
    addGuidesStylesheet();
    updateGUI(false);
}

