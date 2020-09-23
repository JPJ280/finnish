let substantive = {
}

let verb = {
}

let otherWord = {
}

let deckName = '';

let nounList = [];
let verbList = [];
let otherWordList = [];

let nounSubmitButtons = [];
let verbSubmitButtons = [];
let otherWordSubmitButtons = [];

function loadNounSubmitButton() {
    nounSubmitButtons[nounIndex] = document.querySelector('#noun' + nounIndex + 'Submit');
    for (let i = nounIndex; i < nounIndex + 1; i++) {
        //nounSubmitButtons[i].removeEventListener('click', () => saveNoun(i));
        nounSubmitButtons[i].addEventListener('click', () => saveNoun(i));
    }  
    //nounSubmitButtons[nounIndex].addEventListener('click', () => saveNoun(nounIndex));
}

function loadVerbSubmitButton() {
    verbSubmitButtons[verbIndex] = document.querySelector('#verb' + verbIndex + 'Submit');
    for (let j = verbIndex; j < verbIndex + 1; j++) {
        verbSubmitButtons[j].addEventListener('click', () => saveVerb(j));
    }  
}

function loadOtherWordSubmitButton() {
    otherWordSubmitButtons[otherWordIndex] = document.querySelector('#otherWord' + otherWordIndex + 'Submit');
    for (let k = otherWordIndex; k < otherWordIndex + 1; k++) {
        otherWordSubmitButtons[k].addEventListener('click', () => saveOtherWord(k));
    }  
}

function saveNoun(nounSaveIndex) {
    alert('placeholder');
    let nounToSave = Object.create(substantive);
    //let englishIndex = "english" + nounSaveIndex;
    let englishField = document.getElementById("englishNoun" + nounSaveIndex);
    nounToSave.englishWord = englishField.value;
    let finnishField = document.getElementById("finnishNoun" + nounSaveIndex);
    nounToSave.finnishWord = finnishField.value;
    let nomSingField = document.getElementById("nomSing" + nounSaveIndex);
    nounToSave.nomSing = nomSingField.value;
    let nomPluField = document.getElementById("nomPlu" + nounSaveIndex);
    nounToSave.nomPlu = nomPluField.value;
    let genSingField = document.getElementById("genSing" + nounSaveIndex);
    nounToSave.genSing = genSingField.value;
    let genPluField = document.getElementById("genPlu" + nounSaveIndex);
    nounToSave.genPlu = genPluField.value;
    let partSingField = document.getElementById("partSing" + nounSaveIndex);
    nounToSave.partSing = partSingField.value;
    let partPluField = document.getElementById("partPlu" + nounSaveIndex);
    nounToSave.partPlu = partPluField.value;


    nounList[nounSaveIndex] = nounToSave;
}

function saveVerb(verbSaveIndex) {
    alert('placeholder');
    let verbToSave = Object.create(verb);
    let englishField = document.getElementById("englishVerb" + verbSaveIndex);
    verbToSave.englishWord = englishField.value;
    let finnishField = document.getElementById("finnishVerb" + verbSaveIndex);
    verbToSave.finnishWord = finnishField.value;
    let minaPresPosField = document.getElementById("minaPresPos" + verbSaveIndex);
    verbToSave.minaPresPos = minaPresPosField.value;
    let minaPresNegField = document.getElementById("minaPresNeg" + verbSaveIndex);
    verbToSave.minaPresNeg = minaPresNegField.value;
    let sinaPresPosField = document.getElementById("sinaPresPos" + verbSaveIndex);
    verbToSave.sinaPresPos = sinaPresPosField.value;
    let sinaPresNegField = document.getElementById("sinaPresNeg" + verbSaveIndex);
    verbToSave.sinaPresNeg = sinaPresNegField.value;
    let hanPresPosField = document.getElementById("hanPresPos" + verbSaveIndex);
    verbToSave.hanPresPos = hanPresPosField.value;
    let hanPresNegField = document.getElementById("hanPresNeg" + verbSaveIndex);
    verbToSave.hanPresNeg = hanPresNegField.value;
    let mePresPosField = document.getElementById("mePresPos" + verbSaveIndex);
    verbToSave.mePresPos = mePresPosField.value;
    let mePresNegField = document.getElementById("mePresNeg" + verbSaveIndex);
    verbToSave.mePresNeg = mePresNegField.value;
    let tePresPosField = document.getElementById("tePresPos" + verbSaveIndex);
    verbToSave.tePresPos = tePresPosField.value;
    let tePresNegField = document.getElementById("tePresNeg" + verbSaveIndex);
    verbToSave.tePresNeg = tePresNegField.value;
    let hePresPosField = document.getElementById("hePresPos" + verbSaveIndex);
    verbToSave.hePresPos = hePresPosField.value;
    let hePresNegField = document.getElementById("hePresNeg" + verbSaveIndex);
    verbToSave.hePresNeg = hePresNegField.value;
    let passPresPosField = document.getElementById("passPresPos" + verbSaveIndex);
    verbToSave.passPresPos = passPresPosField.value;
    let passPresNegField = document.getElementById("passPresNeg" + verbSaveIndex);
    verbToSave.passPresNeg = passPresNegField.value;



    verbList[verbSaveIndex] = verbToSave;
}

function saveOtherWord(otherWordSaveIndex) {
    alert('placeholder');
    let otherWordToSave = Object.create(otherWord);
    let englishField = document.getElementById("englishOtherWord" + otherWordSaveIndex);
    otherWordToSave.englishWord = englishField.value;
    let finnishField = document.getElementById("finnishOtherWord" + otherWordSaveIndex);
    otherWordToSave.finnishWord = finnishField.value;
}

addNounButton.addEventListener('click', loadNounSubmitButton);
addVerbButton.addEventListener('click', loadVerbSubmitButton);
addOtherWordButton.addEventListener('click', loadOtherWordSubmitButton);

deckNameSubmitButton.addEventListener('click', saveDeckName);
saveDeckSubmitButton.addEventListener('click', saveDeckToFile);

function saveDeckName() {
    let deckNameField = document.getElementById("deckName");
    deckName = deckNameField.value;
}

function saveDeckToFile() {
    if(deckName === '') {
        alert('Please input a valid name for the deck')
    }
    else {
        /*let nouns = JSON.stringify(nounList);
        let verbs = JSON.stringify(verbList);
        let otherWords = JSON.stringify(otherWordList);*/
        let fullDeck = {'nouns': nounList, 'verbs': verbList, 'otherWords': otherWordList};
        let fullDeckString = JSON.stringify(fullDeck);
        let link = document.createElement('a');
        link.download = deckName + ".json";
        link.href = 'data:application/json,' + encodeURIComponent(fullDeckString);
        link.click() 

    }
}

/*{   noun1 = Object.create(substantive); //no need to look at this
    noun2 = Object.create(substantive);
    noun3 = Object.create(substantive);
    noun4 = Object.create(substantive);
    noun5 = Object.create(substantive);
    noun6 = Object.create(substantive);
    noun7 = Object.create(substantive);
    noun8 = Object.create(substantive);
    noun9 = Object.create(substantive);
    noun10 = Object.create(substantive);
    noun11 = Object.create(substantive);
    noun12 = Object.create(substantive);
    noun13 = Object.create(substantive);
    noun14 = Object.create(substantive);
    noun15 = Object.create(substantive);
    noun16 = Object.create(substantive);
    noun17 = Object.create(substantive);
    noun18 = Object.create(substantive);
    noun19 = Object.create(substantive);
    noun20 = Object.create(substantive);
    noun21 = Object.create(substantive);
    noun22 = Object.create(substantive);
    noun23 = Object.create(substantive);
    noun24 = Object.create(substantive);
    noun25 = Object.create(substantive); 

    nounList = ['the finnish language', noun1, noun2, noun3, noun4, noun5, noun6, noun7, noun8, noun9, noun10, noun11, noun12, noun13, noun14, noun15, noun16, noun17, noun18, noun19, noun20, noun21, noun22, noun23, noun24, noun25];

}

{   verb1 = Object.create(verb); //or this
    verb2 = Object.create(verb);
    verb3 = Object.create(verb);
    verb4 = Object.create(verb);
    verb5 = Object.create(verb);
    verb6 = Object.create(verb);
    verb7 = Object.create(verb);
    verb8 = Object.create(verb);
    verb9 = Object.create(verb);
    verb10 = Object.create(verb);
    verb11 = Object.create(verb);
    verb12 = Object.create(verb);
    verb13 = Object.create(verb);
    verb14 = Object.create(verb);
    verb15 = Object.create(verb);
    verb16 = Object.create(verb);
    verb17 = Object.create(verb);
    verb18 = Object.create(verb);
    verb19 = Object.create(verb);
    verb20 = Object.create(verb);
    verb21 = Object.create(verb);
    verb22 = Object.create(verb);
    verb23 = Object.create(verb);
    verb24 = Object.create(verb);
    verb25 = Object.create(verb); 

    verbList = ['the finnish language', verb1, verb2, verb3, verb4, verb5, verb6, verb7, verb8, verb9, verb10, verb11, verb12, verb13, verb14, verb15, verb16, verb17, verb18, verb19, verb20, verb21, verb22, verb23, verb24, verb25];
}

{
    otherWord1 = Object.create(otherWord);
    otherWord2 = Object.create(otherWord);
    otherWord3 = Object.create(otherWord);
    otherWord4 = Object.create(otherWord);
    otherWord5 = Object.create(otherWord);
    otherWord6 = Object.create(otherWord);
    otherWord7 = Object.create(otherWord);
    otherWord8 = Object.create(otherWord);
    otherWord9 = Object.create(otherWord);
    otherWord10 = Object.create(otherWord);

    otherWordList = ['the finnish language', otherWord1, otherWord2, otherWord3, otherWord4, otherWord5, otherWord6, otherWord7, otherWord8, otherWord9, otherWord10];
} */