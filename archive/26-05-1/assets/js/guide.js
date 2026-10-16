var allGuides = []
var currentGuides = {}

var onCol = "rgb(188, 221, 188)";
var offCol = "rgb(210, 210, 210)";

var div_min_height = 20;
var div_min_margin = 120;

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
                    var storedVisibility = localStorage.getItem(guideName);
                    if(storedVisibility == "true") {
                        visible = true;
                    }
                }
                // if local storage not available out of security reasons...
                catch(err) {
                    if(guideName in currentGuides) {
                        visible = visible || currentGuides[guideName];
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

    // sync/add all found guide-names to local storage and
    allGuides.forEach(function(guideName) {
        // update local storage
        try {
            var storedVisibility = localStorage.getItem(guideName);
            if((storedVisibility != "true") && (storedVisibility != "false")){
                localStorage.setItem(guideName, "true"); // default true
            }
        }
        catch(err) { }
        currentGuides[guideName] = true;
    });
    
    visible = true;   

    var guideDiv = document.getElementById('guideDiv');
    var guideTitle = document.getElementById('guideTitle');
    var guideCloseBtn = document.getElementById('closeGuideSel');
    var guideSel = document.getElementById('guideSel');

    // start visible
    var showGuideSelection = true
    guideSel.style.opacity = 1;
    guideCloseBtn.style.opacity = 1;
    guideSel.style.display = "block";

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
            if (!guideCloseBtn.classList.contains('plus_icon')){
                guideCloseBtn.classList.add('plus_icon');
            }
            if (guideCloseBtn.classList.contains('close_icon')){
                guideCloseBtn.classList.remove('close_icon');
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
            if (guideCloseBtn.classList.contains('plus_icon')){
                guideCloseBtn.classList.remove('plus_icon');
            }
            if (!guideCloseBtn.classList.contains('close_icon')){
                guideCloseBtn.classList.add('close_icon');
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

        // get div height depending on guide-buttons heights and margins + title offset
        var height = ((allGuides.length * 29)+42);

        if(height > div_min_margin) {
            margin = 0;
        }
        else {
            margin = div_min_margin - height + 20;
        }

        // get margin (distance to index-navigation), depending div height
       // var margin = div_min_height - height;


        if(height < div_min_height) {
            height = div_min_height;
        }
        var keyframesCSS = "@keyframes grow { from { height: "
            +div_min_height+"px; margin-bottom: "
            +div_min_margin+"px; } to { height: "
            +height+"px; margin-bottom: "+
            +margin+"px; } } @keyframes shrink { from { height: "
            +height+"px; margin-bottom: "+
            +margin+"px; } to { height: "
            +div_min_height+"px; margin-bottom: "
            +div_min_margin+"px; } }";
        var style = document.createElement("style");
        if (style.styleSheet) {
            style.styleSheet.cssText = keyframesText;
        } else {
            style.appendChild(document.createTextNode(keyframesCSS));
        }
        document.getElementsByTagName('head')[0].appendChild(style);
        guideDiv.style.display = "block";
        guideDiv.style.height = height + "px";
        guideDiv.style.marginBottom = margin + "px";
    }    
    
    /*var img = document.getElementById('closeGuideSel');
    img.setAttribute('style','transform:rotate(45deg)');    */
}

window.onload = function(evt) { 
    timVersionInject();
    addGuidesStylesheet();
    updateGUI(false);
}

