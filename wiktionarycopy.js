let nounFromWikButtons = [];
let verbFromWikButtons = [];
let otherWordFromWikButtons = [];
let nounFromWikHTMLButtons = [];
let verbFromWikHTMLButtons = [];
let otherWordFromWikHTMLButtons = [];

/**
 * Called when a new substantive is added. Saves the submit with Wiktionary link button and adds
 * an event listener to call the nounFromWikLink function.
 */
function loadNounWikButtons() {
    nounFromWikButtons[nounIndex] = document.querySelector('#nounWikLink' + nounIndex + 'Button');
    for (let i = nounIndex; i < nounIndex + 1; i++) {
        //nounSubmitButtons[i].removeEventListener('click', () => saveNoun(i));
        nounFromWikButtons[i].addEventListener('click', () => nounFromWikLink(i));
    }  
    //nounSubmitButtons[nounIndex].addEventListener('click', () => saveNoun(nounIndex));
}

/**
 * Called when a new verb is added. Saves the submit with Wiktionary link button and adds
 * an event listener to call the verbFromWikLink function.
 */
function loadVerbWikButtons() {
    verbFromWikButtons[verbIndex] = document.querySelector('#verbWikLink' + verbIndex + 'Button');
    for (let j = verbIndex; j < verbIndex + 1; j++) {
        verbFromWikButtons[j].addEventListener('click', () => verbFromWikLink(j));
    }  
}

/**
 * Currently unused
 */
function loadOtherWordWikButtons() {
    otherWordFromWikButtons[otherWordIndex] = document.querySelector('#otherWordWikLink' + otherWordIndex + 'Button');
    for (let k = otherWordIndex; k < otherWordIndex + 1; k++) {
        otherWordFromWikButtons[k].addEventListener('click', () => otherWordFromWikLink(k));
    }  
}

/**
 * Called when a new substantive is added. Saves the submit with Wiktionary HTML button and adds
 * an event listener to call the nounFromWikHTML function.
 */
function loadNounWikHTMLButtons() {
    nounFromWikHTMLButtons[nounIndex] = document.querySelector('#nounFromWik' + nounIndex + 'Button');
    for (let i = nounIndex; i < nounIndex + 1; i++) {
        //nounSubmitButtons[i].removeEventListener('click', () => saveNoun(i));
        nounFromWikHTMLButtons[i].addEventListener('click', () => nounFromWikHTML(i));
    }  
    //nounSubmitButtons[nounIndex].addEventListener('click', () => saveNoun(nounIndex));
}

/**
 * Called when a new verb is added. Saves the submit with Wiktionary link button and adds
 * an event listener to call the verbFromWikHTML function.
 */
function loadVerbWikHTMLButtons() {
    verbFromWikHTMLButtons[verbIndex] = document.querySelector('#verbFromWik' + verbIndex + 'Button');
    for (let j = verbIndex; j < verbIndex + 1; j++) {
        verbFromWikHTMLButtons[j].addEventListener('click', () => verbFromWikHTML(j));
    }  
}

/**
 * Currently unused
 */
function loadOtherWordWikHTMLButtons() {
    otherWordFromWikHTMLButtons[otherWordIndex] = document.querySelector('#otherWordFromWik' + otherWordIndex + 'Button');
    for (let k = otherWordIndex; k < otherWordIndex + 1; k++) {
        otherWordFromWikHTMLButtons[k].addEventListener('click', () => otherWordFromWikHTML(k));
    }  
}

/**
 * Called when the "Submit from Wiktionary" button is clicked. Reads the word the user input, then
 * gets the link for the Wiktionary API for that word. Takes the HTML from the Wiktionary page as
 * a string, then calls loadNounFromWik with the index and the string.
 * 
 * @param {number} nounWikIndex The index of the substantive template to be copied to.
 */
async function nounFromWikLink(nounWikIndex) {
    let nounValue = document.getElementById("nounWikLink" + nounWikIndex).value;
    let nounWikLink = "https://en.wiktionary.org/api/rest_v1/page/html/" + nounValue;
    let nounToLoadInput = await fetch(nounWikLink).then(function(response) {return response.text()});
    //let nounToLoadInput = response.text();
    loadNounFromWik(nounWikIndex, nounToLoadInput);
}

/**
 * Called when the "Submit from Wiktionary" button is clicked. Reads the word the user input, then
 * gets the link for the Wiktionary API for that word. Takes the HTML from the Wiktionary page as
 * a string, then calls loadVerbFromWik with the index and the string.
 * 
 * @param {number} verbWikIndex The index of the verb template to be copied to.
 */
async function verbFromWikLink(verbWikIndex) {
    let verbValue = document.getElementById("verbWikLink" + verbWikIndex).value;
    let verbWikLink = "https://en.wiktionary.org/api/rest_v1/page/html/" + verbValue;
    let verbToLoadInput = await fetch(verbWikLink).then(function(response) {return response.text()});
    //let nounToLoadInput = response.text();
    loadVerbFromWik(verbWikIndex, verbToLoadInput);
}

/**
 * Called when the "Submit from Wiktionary HTML" button is clicked. Reads from the HTML the
 * user input as a string, then calls loadNounFromWik with the index and the string.
 * 
 * @param {number} nounWikIndex The index of the substantive template to be copied to.
 */
function nounFromWikHTML(nounWikIndex) {
    let nounToLoadInput;
    nounToLoadInput = document.getElementById("nounFromWik" + nounWikIndex).value;
    loadNounFromWik(nounWikIndex, nounToLoadInput);
}

/**
 * Called when the "Submit fromWiktionary HTML" button is clicked. Reads from the HTML the
 * user input as a string, then calls loadVerbFromWik with the index and the string.
 * 
 * @param {number} verbWikIndex The index of the verb template to be copied to.
 */
function verbFromWikHTML(verbWikIndex) {
    let verbToLoadInput;
    verbToLoadInput = document.getElementById("verbFromWik" + verbWikIndex).value;
    loadVerbFromWik(verbWikIndex, verbToLoadInput)
}

let nounToLoad;
let nounHTML;
/**
 * Creates an element that has the same HTML as the Wiktionary page, then finds each form of the word within the HTML
 * (through the class) and pastes it into the correct spot in the substantive template. If no element of the correct
 * class can be found in the HTML (and so the text content is undefined), leaves the place blank (does this by calling
 * the formFixer function on each form of the word).
 * 
 * @param {number} nounWikIndex The index of the substantive template the function will copy to.
 * @param {string} nounToLoadInput The HTML from theWiktionary page.
 */
function loadNounFromWik(nounWikIndex, nounToLoadInput) {
    nounHTML = document.createElement('div');
    nounHTML.innerHTML = nounToLoadInput;
    document.getElementById("nomSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("selflink")[0]);
    document.getElementById("nomPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi nom//acc|p-form-of")[0]);
    document.getElementById("genSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi gen|s-form-of")[0]);
    document.getElementById("genPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi gen|p-form-of")[0]);
    document.getElementById("partSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi par|s-form-of")[0]);
    document.getElementById("partPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi par|p-form-of")[0]);
    document.getElementById("ineSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ine|s-form-of")[0]);
    document.getElementById("inePlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ine|p-form-of")[0]);
    document.getElementById("elaSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ela|s-form-of")[0]);
    document.getElementById("elaPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ela|p-form-of")[0]);
    document.getElementById("illSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ill|s-form-of")[0]);
    document.getElementById("illPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ill|p-form-of")[0]);
    document.getElementById("adeSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ade|s-form-of")[0]);
    document.getElementById("adePlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ade|p-form-of")[0]);
    document.getElementById("ablSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi abl|s-form-of")[0]);
    document.getElementById("ablPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi abl|p-form-of")[0]);
    document.getElementById("allSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi all|s-form-of")[0]);
    document.getElementById("allPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi all|p-form-of")[0]);
    document.getElementById("essSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ess|s-form-of")[0]);
    document.getElementById("essPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ess|p-form-of")[0]);
    document.getElementById("traSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi tra|s-form-of")[0]);
    document.getElementById("traPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi tra|p-form-of")[0]);
    document.getElementById("istSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ist|s-form-of")[0]);
    document.getElementById("istPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi ist|p-form-of")[0]);
    document.getElementById("abeSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi abe|s-form-of")[0]);
    document.getElementById("abePlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi abe|p-form-of")[0]);
    document.getElementById("comSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi com-sing-a-form-of")[0]);
    document.getElementById("comPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi com-pl-a-form-of")[0]);

}

let verbHTML;
/**
 * Creates an element that has the same HTML as the Wiktionary page, then finds each form of the word within the HTML
 * (through the class) and pastes it into the correct spot in the verb template. If no element of the correct
 * class can be found in the HTML (and so the text content is undefined), leaves the place blank (does this by calling
 * the formFixer function on each form of the word).
 * 
 * @param {number} verbWikIndex The index of the verb template the function will copy to.
 * @param {string} verbToLoadInput The HTML of the Wiktionary page.
 */
function loadVerbFromWik(verbWikIndex, verbToLoadInput) {
    verbHTML = document.createElement('div');
    verbHTML.innerHTML = verbToLoadInput;
    document.getElementById("minaPresPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 1|s|pres|indc-form-of")[0]);
    document.getElementById("sinaPresPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 2|s|pres|indc-form-of")[0]);
    document.getElementById("hanPresPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 3|s|pres|indc-form-of")[0]);
    document.getElementById("mePresPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 1|p|pres|indc-form-of")[0]);
    document.getElementById("tePresPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 2|p|pres|indc-form-of")[0]);
    document.getElementById("hePresPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 3|p|pres|indc-form-of")[0]);
    document.getElementById("passPresPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pasv|pres|indc-form-of")[0]);
    document.getElementById("minaPresNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pres|actv|indc|conn-form-of")[0]);
    document.getElementById("sinaPresNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pres|actv|indc|conn-form-of")[1]);
    document.getElementById("hanPresNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pres|actv|indc|conn-form-of")[2]);
    document.getElementById("mePresNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pres|actv|indc|conn-form-of")[3]);
    document.getElementById("tePresNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pres|actv|indc|conn-form-of")[4]);
    document.getElementById("hePresNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pres|actv|indc|conn-form-of")[5]);
    document.getElementById("passPresNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pres|pasv|indc|conn-form-of")[0]);
    document.getElementById("minaImpPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 1|s|past|indc-form-of")[0]);
    document.getElementById("sinaImpPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 2|s|past|indc-form-of")[0]);
    document.getElementById("hanImpPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 3|s|past|indc-form-of")[0]);
    document.getElementById("meImpPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 1|p|past|indc-form-of")[0]);
    document.getElementById("teImpPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 2|p|past|indc-form-of")[0]);
    document.getElementById("heImpPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi 3|p|past|indc-form-of")[0]);
    document.getElementById("passImpPos" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi pasv|past|indc-form-of")[0]);
    document.getElementById("minaImpNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi past|actv|indc|conn-form-of")[0]);
    document.getElementById("sinaImpNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi past|actv|indc|conn-form-of")[1]);
    document.getElementById("hanImpNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi past|actv|indc|conn-form-of")[2]);
    document.getElementById("meImpNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi past|actv|indc|conn-form-of")[3]);
    document.getElementById("teImpNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi past|actv|indc|conn-form-of")[4]);
    document.getElementById("heImpNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi past|actv|indc|conn-form-of")[5]);
    document.getElementById("passImpNeg" + verbWikIndex).value = formFixer(verbHTML.getElementsByClassName("Latn form-of lang-fi past|pasv|indc|conn-form-of")[0]);    


}

/**
 * If field is undefined, it will return en empty string. Otherwise, if field is an HTML element, returns the text content
 * of field; if field is a string, returns the value of field.
 * 
 * @param {*} field Either an element or a string.
 * @returns {string} The value of the string or the text content of the element if field is defined, otherwise an empty string.
 */
function formFixer(field) {
    let fieldValue;
    if (typeof(field) === 'string') {
        fieldValue = (field !== undefined) ? field : "";
    } 
    else {
        fieldValue = (field !== undefined) ? field.textContent : "";
    }
    return fieldValue;
}

