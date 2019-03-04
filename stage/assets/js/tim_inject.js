timDoc = {}

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

function timVersionInject() {
    // If no sdk version set, try to load as json from asset folder 
    if(typeof timsdk === "undefined") {
        timsdk = {};
        fetch("../assets/sdk_version.json")
            .then(response => response.json(), reason => reason)
            .then(json => setSdkVersion(json.sdk_version), reason => reason);
    }
    else {
        setSdkVersion(timsdk.sdk_version);
    }

    // TIM API version
    var projectbrief = document.getElementById("projectbrief");
    if (projectbrief != undefined) {
        if(timapi.api_lang != undefined) {
            projectbrief.innerHTML = "TIM API " + timapi.api_lang;
        }

        if(timapi.api_version != undefined) {
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
        guidelink.innerHTML = "Back to Implementation Guide";
        guidelink.id = "guidelink";
        projectalign.appendChild(guidelink);
    }

    // Type banner
    if(window.type != undefined) {
        if(window.type === "stage") {
            var bannerElement = document.getElementById("stageBanner");
            // make banner visible
            bannerElement.style.display = 'block';
        }
        else if(window.type === "archived") {
            var bannerElement = document.getElementById("archiveBanner");
            // make banner visible
            bannerElement.style.display = 'block';
        }
    }
}

// only set this as onload function, if not already one set... 
// if another one is set, that function needs to call the inject
if(window.onload == undefined) {
    window.onload = timVersionInject;
}

timDoc.injecter = timVersionInject;
