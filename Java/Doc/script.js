function show(type)
{
    count = 0;
    for (var key in methods) {
        var row = document.getElementById(key);
        if ((methods[key] &  type) != 0) {
            row.style.display = '';
            row.className = (count++ % 2) ? rowColor : altColor;
        }
        else
            row.style.display = 'none';
    }
    updateTabs(type);
}

function updateTabs(type)
{
    for (var value in tabs) {
        var sNode = document.getElementById(tabs[value][0]);
        var spanNode = sNode.firstChild;
        if (value == type) {
            sNode.className = activeTableTab;
            spanNode.innerHTML = tabs[value][1];
        }
        else {
            sNode.className = tableTab;
            spanNode.innerHTML = "<a href=\"javascript:show("+ value + ");\">" + tabs[value][1] + "</a>";
        }
    }
}

function injectGuidelink() {

    var navLists = document.getElementsByClassName("navList");

    if((navLists.length > 0) && (navLists[0].title == "Navigation")) {
        // use last element of nav-bar (help-doc) to create href with correct folder level
        var href = navLists[0].lastElementChild.lastElementChild.href.replace("help-doc", "../guide");

        // link to implementation guide
        var guidelink = document.createElement("a");
        guidelink.href = href;
        guidelink.innerHTML = "Back to Implementation Guide";
        guidelink.id = "guidelink_noframes";
        guidelink.target = "_top"
        navLists[0].appendChild(guidelink);
    }
}

window.onload = function(evt) { 

    if((this.timDoc != undefined) && (this.timDoc.injecter != undefined)) {
        this.timDoc.injecter();    
    }
    injectGuidelink();
}

