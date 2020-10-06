let substantive = {
}

let verb = {
}

let otherWord = {
}

const saveAllWordsButton = document.getElementById('saveAllWordsButton');

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
    verbToSave.minaImpPos = document.getElementById("minaImpPos" + verbSaveIndex).value;
    verbToSave.minaImpNeg = document.getElementById("minaImpNeg" + verbSaveIndex).value;
    verbToSave.sinaImpPos = document.getElementById("sinaImpPos" + verbSaveIndex).value;
    verbToSave.sinaImpNeg = document.getElementById("sinaImpNeg" + verbSaveIndex).value;
    verbToSave.hanImpPos = document.getElementById("hanImpPos" + verbSaveIndex).value;
    verbToSave.hanImpNeg = document.getElementById("hanImpNeg" + verbSaveIndex).value;
    verbToSave.meImpPos = document.getElementById("meImpPos" + verbSaveIndex).value;
    verbToSave.meImpNeg = document.getElementById("meImpNeg" + verbSaveIndex).value;
    verbToSave.teImpPos = document.getElementById("teImpPos" + verbSaveIndex).value;
    verbToSave.teImpNeg = document.getElementById("teImpNeg" + verbSaveIndex).value;
    verbToSave.heImpPos = document.getElementById("heImpPos" + verbSaveIndex).value;
    verbToSave.heImpNeg = document.getElementById("heImpNeg" + verbSaveIndex).value;
    verbToSave.passImpPos = document.getElementById("passImpPos" + verbSaveIndex).value;
    verbToSave.passImpNeg = document.getElementById("passImpNeg" + verbSaveIndex).value;



    verbList[verbSaveIndex] = verbToSave;
}

function saveOtherWord(otherWordSaveIndex) {
    let otherWordToSave = Object.create(otherWord);
    let englishField = document.getElementById("englishOtherWord" + otherWordSaveIndex);
    otherWordToSave.englishWord = englishField.value;
    let finnishField = document.getElementById("finnishOtherWord" + otherWordSaveIndex);
    otherWordToSave.finnishWord = finnishField.value;
    otherWordList[otherWordSaveIndex] = otherWordToSave;
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

saveAllWordsButton.addEventListener('click', saveAllWords);
function saveAllWords() {
    for(let saveAllNounsIndex = 1; saveAllNounsIndex <= nounIndex; saveAllNounsIndex++) {
        nounSubmitButtons[saveAllNounsIndex].click();
    }
    for(let saveAllVerbsIndex = 1; saveAllVerbsIndex <= verbIndex; saveAllVerbsIndex++) {
        verbSubmitButtons[saveAllVerbsIndex].click();
    }
    for(let saveAllOtherWordsIndex = 1; saveAllOtherWordsIndex <= otherWordIndex; saveAllOtherWordsIndex++) {
        otherWordSubmitButtons[saveAllOtherWordsIndex].click();
    }
}

function saveDeckToFile() {
    if(deckName === '') {
        alert('Please input a valid name for the deck')
    }
    else {
        saveAllWordsButton.click();
        let deckConfig = getDeckConfig();
        let fullDeck = {'nouns': nounList, 'verbs': verbList, 'otherWords': otherWordList, 'deckConfig':deckConfig};
        let fullDeckString = JSON.stringify(fullDeck);
        let link = document.createElement('a');
        link.download = deckName + ".json";
        link.href = 'data:application/json,' + encodeURIComponent(fullDeckString);
        link.click() 

    }
}

function getDeckConfig() {
    let deckNounChecks = [document.getElementById("nounCheck0").checked, document.getElementById("nounCheck1").checked, document.getElementById("nounCheck2").checked];
    let deckDecChecks = [];
    for(let i = 0; i < currentMaxNounForms; i++) {
        deckDecChecks[i] = document.getElementById("nounDecCheck" + i).checked;    
    }
    let deckVerbChecks = [document.getElementById("verbCheck0").checked, document.getElementById("verbCheck1").checked, document.getElementById("verbCheck2").checked,];
    let deckConjChecks = [];
    for(let i = 0; i < currentMaxVerbForms; i++) {
        deckConjChecks[i] = document.getElementById("verbConjCheck" + i).checked;
    }
    let deckOtherWordChecks = [document.getElementById("otherWordCheck0").checked, document.getElementById("otherWordCheck1").checked];
    let numCardsFieldValue = Number.numCardsField.value;
    let numCards = (Number.isInteger(numCardsFieldValue) && numCardsFieldValue > 0) ? numCardsFieldValue : "";
    let deckConfig = {'nounChecks':deckNounChecks, 'nounDecChecks':deckDecChecks, 'verbChecks':deckVerbChecks, 'verbConjChecks': deckConjChecks, 'otherWordChecks':deckOtherWordChecks, 'numCards':numCards};
    return deckConfig;
}

