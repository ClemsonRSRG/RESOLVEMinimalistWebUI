/**
 * This function adds a new gutter for the CodeMirror editor.
 */
function addNewCodeMirrorGutter(cmEditor) {
    var vcs = getVCs();
    var vc;
    var i;
    for (i = 0; i < vcs.length; i++) {
        // Check to see if there is already a vc marker at that line
        var vcMarker;
        if (cmEditor.lineInfo(Number(vcs[i].line)).gutterMarkers !== undefined) {
            vcMarker = cmEditor.lineInfo(Number(vcs[i].line)).gutterMarkers.vcs;
            vcMarker.setAttribute("title", vcMarker.getAttribute("title") + ", " + vcs[i].vcID);
        } else {
            // Processing VC icon
            var processingIcon = document.createElement("img");
            processingIcon.setAttribute("src", "public/images/vc_processing.png");
            processingIcon.setAttribute("alt", "VC Processing Icon");
            processingIcon.setAttribute("style", "width:22.5px;height:22.5px;border:0;");

            // Create a vc marker using the processing icon.
            vcMarker = document.createElement("a");
            vcMarker.setAttribute("href", "#");
            vcMarker.setAttribute("data-toggle", "modal");
            vcMarker.setAttribute("data-target", "#vcModal");
            vcMarker.setAttribute("title", "VC(s): " + vcs[i].vcID);
            vcMarker.innerHTML = processingIcon.outerHTML;

            // Add it to the gutter
            cmEditor.setGutterMarker(Number(vcs[i].line), "vcs", vcMarker);
        }
    }
}

/**
 * This creates a fake prover results array.
 */
function createProverResults() {
    var vcResultArray = [];
    vcResultArray.push(new FakeProveMessage(new FakeProveResult("0_1", "Proved, 0 ms")));
    vcResultArray.push(new FakeProveMessage(new FakeProveResult("0_2", "Timeout after 3000 ms")));
    vcResultArray.push(new FakeProveMessage(new FakeProveResult("0_3", "Proved, 24 ms")));
    vcResultArray.push(new FakeProveMessage(new FakeProveResult("1_1", "Timeout after 3000 ms")));
    vcResultArray.push(new FakeProveMessage(new FakeProveResult("1_2", "Proved, 1 ms")));

    return vcResultArray;
}

/*
 * This function decodes the UrlEncoded content from the server. It also
 * replaces the %20's with spaces (" "). We have to replace the spaces with
 * the HTML code before transmission because the Java UrlEncode replaces spaces
 * with pluss signs ("+"). If we don't do this replacement we will lose all
 * plus signs that are have spaces next to them.
 */
function decode(content) {
    var lsRegExp = /%20/g;
    var lsRegExp2 = /%2B/g;

    content = String(unescape(content)).replace(lsRegExp, " ");
    content = content.replace(lsRegExp2, "+");

    return content;
}

/*
 * This creates a fake prover message object.
 */
function FakeProveMessage(resultData) {
    this.job = "verify";
    this.status = "complete";
    this.result = resultData;
}

/*
 * This creates a fake prover result object.
 */
function FakeProveResult(id, resultData) {
    this.id = id;
    this.result = resultData;
}

/*
 * This creates a fake VC message object.
 */
function FakeVCMessage() {
    this.job = "genVCs";
    this.status = "complete";
    this.result = "%3CvcFile%3E%7B%22vcs%22%3A%5B%7B%22vcGivens%22%3A%221%253A%252520%25281%252520%253C%253D%252520%257CQ%2527%2527%257C%2529%250A%22%2C%22sourceFile%22%3A%22Iterative_Append_Realiz.rb%22%2C%22vcGoal%22%3A%22%25281%252520%253C%253D%252520%257CQ%2527%2527%257C%2529%250A%22%2C%22lineNum%22%3A%2211%22%2C%22vc%22%3A%220_1%22%2C%22vcInfo%22%3A%22Requires%252520Clause%252520of%252520Dequeue%252520in%252520Procedure%252520Append%253A%252520Iterative_Append_Realiz.rb%252811%2529%22%7D%2C%7B%22vcGivens%22%3A%221%253A%252520%2528%257CQ%2527%257C%252520%253C%253D%252520Max_Length%2529%250A2%253A%252520%2528Q%2527%2527%252520%253D%252520%2528%253CE%2527%253E%252520o%252520Q%2527%2529%2529%250A3%253A%252520%25281%252520%253C%253D%252520%257CQ%2527%2527%257C%2529%250A4%253A%252520%2528%2528%257CP%257C%252520%252B%252520%257CQ%257C%2529%252520%253C%253D%252520Max_Length%2529%250A5%253A%252520%2528%257CP%257C%252520%253C%253D%252520Max_Length%2529%250A6%253A%252520%2528%257CQ%257C%252520%253C%253D%252520Max_Length%2529%250A7%253A%252520%2528min_int%252520%253C%253D%252520Max_Length%2529%250A8%253A%252520%2528Max_Length%252520%253C%253D%252520max_int%2529%250A9%253A%252520%2528min_int%252520%253C%253D%2525200%2529%250A10%253A%252520%25281%252520%253C%253D%252520max_int%2529%250A11%253A%252520%25281%252520%253C%253D%252520Max_Length%2529%250A%22%2C%22sourceFile%22%3A%22Iterative_Append_Realiz.rb%22%2C%22vcGoal%22%3A%22%2528%25281%252520%252B%252520%257CP%2527%257C%2529%252520%253C%253D%252520Max_Length%2529%250A%22%2C%22lineNum%22%3A%2212%22%2C%22vc%22%3A%220_2%22%2C%22vcInfo%22%3A%22Requires%252520Clause%252520of%252520Enqueue%252520in%252520Procedure%252520Append%253A%252520Iterative_Append_Realiz.rb%252812%2529%22%7D%2C%7B%22vcGivens%22%3A%221%253A%252520%2528Q%2527%2527%252520%253D%252520%2528%253CE%2527%253E%252520o%252520Q%2527%2529%2529%250A2%253A%252520%2528%257CQ%2527%257C%252520%253C%253D%252520Max_Length%2529%250A3%253A%252520%25281%252520%253C%253D%252520%257CQ%2527%2527%257C%2529%250A4%253A%252520%2528%2528%257CP%257C%252520%252B%252520%257CQ%257C%2529%252520%253C%253D%252520Max_Length%2529%250A5%253A%252520%2528%257CP%257C%252520%253C%253D%252520Max_Length%2529%250A6%253A%252520%2528%257CQ%257C%252520%253C%253D%252520Max_Length%2529%250A7%253A%252520%2528min_int%252520%253C%253D%252520Max_Length%2529%250A8%253A%252520%2528Max_Length%252520%253C%253D%252520max_int%2529%250A9%253A%252520%2528min_int%252520%253C%253D%2525200%2529%250A10%253A%252520%25281%252520%253C%253D%252520max_int%2529%250A11%253A%252520%25281%252520%253C%253D%252520Max_Length%2529%250A%22%2C%22sourceFile%22%3A%22Iterative_Append_Realiz.rb%22%2C%22vcGoal%22%3A%22%2528%25281%252520%252B%252520%257CQ%2527%257C%2529%252520%253C%253D%252520%257CQ%2527%2527%257C%2529%250A%22%2C%22lineNum%22%3A%229%22%2C%22vc%22%3A%220_3%22%2C%22vcInfo%22%3A%22Termination%252520of%252520While%252520Statement%253A%252520Iterative_Append_Realiz.rb%25289%2529%22%7D%2C%7B%22vcGivens%22%3A%221%253A%252520not%2528%25281%252520%253C%253D%252520%257CQ%2527%257C%2529%2529%250A2%253A%252520%2528%2528%257CP%257C%252520%252B%252520%257CQ%257C%2529%252520%253C%253D%252520Max_Length%2529%250A3%253A%252520%2528%257CP%257C%252520%253C%253D%252520Max_Length%2529%250A4%253A%252520%2528%257CQ%257C%252520%253C%253D%252520Max_Length%2529%250A5%253A%252520%2528min_int%252520%253C%253D%252520Max_Length%2529%250A6%253A%252520%2528Max_Length%252520%253C%253D%252520max_int%2529%250A7%253A%252520%2528min_int%252520%253C%253D%2525200%2529%250A8%253A%252520%25281%252520%253C%253D%252520max_int%2529%250A9%253A%252520%25281%252520%253C%253D%252520Max_Length%2529%250A%22%2C%22sourceFile%22%3A%22Iterative_Append_Realiz.rb%22%2C%22vcGoal%22%3A%22%2528P%2527%252520%253D%252520%2528P%252520o%252520Q%2529%2529%250A%22%2C%22lineNum%22%3A%223%22%2C%22vc%22%3A%221_1%22%2C%22vcInfo%22%3A%22Ensures%252520Clause%252520of%252520Append%253A%252520Iterative_Append_Realiz.rb%25283%2529%22%7D%2C%7B%22vcGivens%22%3A%221%253A%252520not%2528%25281%252520%253C%253D%252520%257CQ%2527%257C%2529%2529%250A%22%2C%22sourceFile%22%3A%22Iterative_Append_Realiz.rb%22%2C%22vcGoal%22%3A%22%2528Q%2527%252520%253D%252520Empty_String%2529%250A%22%2C%22lineNum%22%3A%223%22%2C%22vc%22%3A%221_2%22%2C%22vcInfo%22%3A%22Ensures%252520Clause%252520of%252520Append%253A%252520Iterative_Append_Realiz.rb%25283%2529%22%7D%5D%7D%3C%2FvcFile%3E";
}

/**
 * This function returns an array of VCs.
 */
function getVCs() {
    var vcResult = new FakeVCMessage();
    var vcArray = [];
    var result = decode(vcResult.result);
    var savedVCs = $(result).text();
    var vcJSON = jQuery.parseJSON(savedVCs);
    var jsonVCs = vcJSON.vcs;
    $.each(jsonVCs, function (index, obj) {
        var newVC = null;
        var vcID = obj.vc;
        if (typeof vcID !== "undefined") {
            var sf = obj.sourceFile;
            var vcLine = obj.lineNum - 1;
            var vcCase = obj.vcInfo;
            var vcGoal = htmlEncodeGTLT(decode(obj.vcGoal));
            var vcGiven = htmlEncodeGTLT(decode(obj.vcGivens));
            var vcReasons;
            if (typeof obj.vcReasons === "undefined") {
                vcReasons = "";
            } else {
                vcReasons = htmlEncodeGTLT(decode(obj.vcReasons));
            }
            var content = vcGoal + vcGiven + vcReasons;
            var temp = vcCase.split(":");
            var i;
            var vcStep = "";
            for (i = 2; i < temp.length; i++) {
                vcStep += temp[i] + ":";
            }
            newVC = new VC(vcID, content, vcCase, vcGoal, vcGiven, vcLine, sf);
        } else {
            newVC = obj;
        }
        vcArray.push(newVC);
    });

    return vcArray;
}

/**
 * This function encodes any greater/less than symbols.
 */
function htmlEncodeGTLT(content) {
    var lsRegExpLT = /</g;
    var lsRegExpGT = />/g;
    var cont = content.replace(lsRegExpLT, "&lt;");
    cont = cont.replace(lsRegExpGT, "&gt;");

    return cont;
}

/**
 * This function creates a VC object.
 */
function VC(vcID, content, step, goal, given, line, sf) {
    this.vcID = vcID;
    this.content = content;
    this.step = step;
    this.goal = goal;
    this.given = given;
    this.line = line;
    this.sourceFile = sf;
}
