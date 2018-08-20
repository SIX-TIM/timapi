timDoc = {}

function timVersionInject() {
    // Project name
    var projectName = document.getElementById("projectname");
    if(projectName != undefined) {
        //projectName.innerHTML = "TIM SDK";

        if(window.sdk_version != undefined) {
            // SDK-num
            var sdknum = document.createElement("span");
            sdknum.innerHTML = window.sdk_version;
            sdknum.id = "sdknum";
            projectName.appendChild(sdknum);
        }
    }

    // TIM API version
    var projectbrief = document.getElementById("projectbrief");
    if (projectbrief != undefined) {
        if(window.api_lang != undefined) {
            projectbrief.innerHTML = "TIM API " + window.api_lang;
        }

        if(window.api_version != undefined) {
            var timnum = document.createElement("span");
            timnum.innerHTML = window.api_version;
            timnum.id = "timnum";
            projectbrief.appendChild(timnum);
        }
    }

    // Implementation guide
    var projectalign = document.getElementById("projectalign");
        if(projectalign != undefined) {
        var guidelink = document.createElement("a");
        guidelink.href = "../guide.html";
        guidelink.innerHTML = "Back to Implementation Guide";
        guidelink.id = "guidelink";
        projectalign.appendChild(guidelink);
    }

    // Stage-banner
    if((window.stage != undefined) && (window.stage == true)) {
        var stageElement = document.getElementById("stage");
        // make banner visible
        stageElement.style.display = 'block';
    }
}

// only set this as onload function, if not already one set... 
// if another one is set, that function needs to call the inject
if(window.onload == undefined) {
    window.onload = timVersionInject;
}

this.timDoc.injecter = timVersionInject;