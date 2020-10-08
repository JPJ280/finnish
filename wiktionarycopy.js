let nounFromWikButtons = [];
let verbFromWikButtons = [];
let otherWordFromWikButtons = [];
let nounFromWikHTMLButtons = [];
let verbFromWikHTMLButtons = [];
let otherWordFromWikHTMLButtons = [];

function loadNounWikButtons() {
    nounFromWikButtons[nounIndex] = document.querySelector('#nounWikLink' + nounIndex + 'Button');
    for (let i = nounIndex; i < nounIndex + 1; i++) {
        //nounSubmitButtons[i].removeEventListener('click', () => saveNoun(i));
        nounFromWikButtons[i].addEventListener('click', () => nounFromWikLink(i));
    }  
    //nounSubmitButtons[nounIndex].addEventListener('click', () => saveNoun(nounIndex));
}

function loadVerbWikButtons() {
    verbFromWikButtons[verbIndex] = document.querySelector('#verbWikLink' + verbIndex + 'Button');
    for (let j = verbIndex; j < verbIndex + 1; j++) {
        verbFromWikButtons[j].addEventListener('click', () => verbFromWikLink(j));
    }  
}

function loadOtherWordWikButtons() {
    otherWordFromWikButtons[otherWordIndex] = document.querySelector('#otherWordWikLink' + otherWordIndex + 'Button');
    for (let k = otherWordIndex; k < otherWordIndex + 1; k++) {
        otherWordFromWikButtons[k].addEventListener('click', () => otherWordFromWikLink(k));
    }  
}

function loadNounWikHTMLButtons() {
    nounFromWikHTMLButtons[nounIndex] = document.querySelector('#nounFromWik' + nounIndex + 'Button');
    for (let i = nounIndex; i < nounIndex + 1; i++) {
        //nounSubmitButtons[i].removeEventListener('click', () => saveNoun(i));
        nounFromWikHTMLButtons[i].addEventListener('click', () => nounFromWikHTML(i));
    }  
    //nounSubmitButtons[nounIndex].addEventListener('click', () => saveNoun(nounIndex));
}

function loadVerbWikHTMLButtons() {
    verbFromWikHTMLButtons[verbIndex] = document.querySelector('#verbFromWik' + verbIndex + 'Button');
    for (let j = verbIndex; j < verbIndex + 1; j++) {
        verbFromWikHTMLButtons[j].addEventListener('click', () => verbFromWikHTML(j));
    }  
}

function loadOtherWordWikHTMLButtons() {
    otherWordFromWikHTMLButtons[otherWordIndex] = document.querySelector('#otherWordFromWik' + otherWordIndex + 'Button');
    for (let k = otherWordIndex; k < otherWordIndex + 1; k++) {
        otherWordFromWikHTMLButtons[k].addEventListener('click', () => otherWordFromWikHTML(k));
    }  
}

async function nounFromWikLink(nounWikIndex) {
    let nounValue = document.getElementById("nounWikLink" + nounWikIndex).value;
    let nounWikLink = "https://en.wiktionary.org/api/rest_v1/page/html/" + nounValue;
    let nounToLoadInput = await fetch(nounWikLink).then(function(response) {return response.text()});
    //let nounToLoadInput = response.text();
    loadNounFromWik(nounWikIndex, nounToLoadInput);
}

async function verbFromWikLink(verbWikIndex) {
    let verbValue = document.getElementById("verbWikLink" + verbWikIndex).value;
    let verbWikLink = "https://en.wiktionary.org/api/rest_v1/page/html/" + verbValue;
    let verbToLoadInput = await fetch(verbWikLink).then(function(response) {return response.text()});
    //let nounToLoadInput = response.text();
    loadVerbFromWik(verbWikIndex, verbToLoadInput);
}

function nounFromWikHTML(nounWikIndex) {
    let nounToLoadInput;
    nounToLoadInput = document.getElementById("nounFromWik" + nounWikIndex).value;
    loadNounFromWik(nounWikIndex, nounToLoadInput);
}

function verbFromWikHTML(verbWikIndex) {
    let verbToLoadInput;
    verbToLoadInput = document.getElementById("verbFromWik" + verbWikIndex).value;

}

let nounToLoad;
let nounHTML;
function loadNounFromWik(nounWikIndex, nounToLoadInput) {
    nounHTML = document.createElement('div');
    nounHTML.innerHTML = nounToLoadInput;
    document.getElementById("nomSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("selflink")[0]);
    document.getElementById("nomPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi nom//acc|p-form-of")[0]);
    document.getElementById("genSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi gen|s-form-of")[0]);
    document.getElementById("genPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi gen|p-form-of")[0]);
    document.getElementById("partSing" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi par|s-form-of")[0]);
    document.getElementById("partPlu" + nounWikIndex).value = formFixer(nounHTML.getElementsByClassName("Latn form-of lang-fi par|p-form-of")[0]);

}

let verbHTML;
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

function formFixer(field) {
    let fieldValue = (field !== undefined) ? field.textContent : "";
    return fieldValue;
}