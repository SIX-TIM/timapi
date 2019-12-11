function show(type) {
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

function updateTabs(type) {
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

function setSdkVersion(sdk_version) {
    if(sdk_version !== undefined) {
        // Project name
        var projectName = document.getElementById("projectname");
        if(projectName != undefined) {
            // SDK-num
            var sdknum = document.createElement("span");
            sdknum.innerHTML = sdk_version;
            sdknum.id = "sdknum";
            projectName.appendChild(sdknum);
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
        guidelink.innerHTML = "Implementation Guide";
        guidelink.id = "guidelink_noframes";
        guidelink.target = "_top"
        navLists[0].appendChild(guidelink);
    }
}


function timVersionInject() {
    // TIM SDK version 
    if(typeof timsdk !== "undefined") {
        setSdkVersion(timsdk.sdk_version);
    }

    // TIM API version
    var projectbrief = document.getElementById("projectbrief");
    if (projectbrief != undefined) {
        if((typeof timapi !== "undefined") && (timapi.api_lang != undefined)) {
            projectbrief.innerHTML = "TIM API " + timapi.api_lang;
        }

        if((typeof timapi !== "undefined") && (timapi.api_version != undefined)) {
            var timnum = document.createElement("span");
            timnum.innerHTML = timapi.api_version;
            timnum.id = "timnum";
            projectbrief.appendChild(timnum);
        }
    }

    // Implementation guide
    var projectalign = document.getElementById("projectalign");
        if(projectalign != undefined) {
        var guidelink = document.createElement("a");
        guidelink.href = "../guide.html";
        guidelink.innerHTML = "Implementation Guide";
        guidelink.id = "guidelink";
        projectalign.appendChild(guidelink);
    }
}

window.onload = function(evt) { 
    timVersionInject();
    injectGuidelink();
}