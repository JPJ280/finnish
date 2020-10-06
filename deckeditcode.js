let deckFile;
let deck;
let deckNouns;
let deckVerbs;
let deckOtherWords;
const confirmUpload = document.getElementById('confirmUpload');
confirmUpload.addEventListener('click', uploadFile);
let uploaded = false;
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

async function uploadFile() {
    if(uploaded === true){
        alert('You have already uploaded a deck.');
    }
    else{
        uploaded = true;
        deckFile = document.getElementById('deckUpload').files;
        deckName = deckFile[0].name;
        let deckFileText = await deckFile[0].text();
        deck = JSON.parse(deckFileText);
        deckNouns = deck.nouns;
        deckVerbs = deck.verbs;
        deckOtherWords = deck.otherWords;
        deckConfig = deck.deckConfig;
        if(deckConfig !== undefined) {
           useSettings(deckConfig);
           numCardsField.value = deckConfig.numCards;
        }
        let numNouns = deckNouns.length;
        if(numNouns !== 0) {
            numNouns = numNouns -1;
        }
        let numVerbs = deckVerbs.length;
        if(numVerbs !== 0) {
            numVerbs = numVerbs -1;
        }
        let numOtherWords = deckOtherWords.length;
        if(numOtherWords !== 0) {
            numOtherWords = numOtherWords -1;
        }
        for(let i = 1; i <= numNouns; i++){
            let currentNoun = deckNouns[i];
            addNounTemplate();
            loadNounSubmitButton();
            document.getElementById('englishNoun' + i).value = currentNoun.englishWord;
            document.getElementById('finnishNoun' + i).value = currentNoun.finnishWord;
            document.getElementById('nomSing' + i).value = currentNoun.nomSing;
            document.getElementById('nomPlu' + i).value = currentNoun.nomPlu;
            document.getElementById('genSing' + i).value = currentNoun.genSing;
            document.getElementById('genPlu' + i).value = currentNoun.genPlu;
            document.getElementById('partSing' + i).value = currentNoun.partSing;
            document.getElementById('partPlu' + i).value = currentNoun.partPlu;
        }
        for(let i = 1; i <= numVerbs; i++){
            let currentVerb = deckVerbs[i];
            addVerbTemplate();
            loadVerbSubmitButton();
            document.getElementById('englishVerb' + i).value = currentVerb.englishWord;
            document.getElementById('finnishVerb' + i).value = currentVerb.finnishWord;
            document.getElementById('minaPresPos' + i).value = currentVerb.minaPresPos;
            document.getElementById('minaPresNeg' + i).value = currentVerb.minaPresNeg;
            document.getElementById('sinaPresPos' + i).value = currentVerb.sinaPresPos;
            document.getElementById('sinaPresNeg' + i).value = currentVerb.sinaPresNeg;
            document.getElementById('hanPresPos' + i).value = currentVerb.hanPresPos;
            document.getElementById('hanPresNeg' + i).value = currentVerb.hanPresNeg;
            document.getElementById('mePresPos' + i).value = currentVerb.mePresPos;
            document.getElementById('mePresNeg' + i).value = currentVerb.mePresNeg;
            document.getElementById('tePresPos' + i).value = currentVerb.tePresPos;
            document.getElementById('tePresNeg' + i).value = currentVerb.tePresNeg;
            document.getElementById('hePresPos' + i).value = currentVerb.hePresPos;
            document.getElementById('hePresNeg' + i).value = currentVerb.hePresNeg;
            document.getElementById('passPresPos' + i).value = currentVerb.passPresPos;
            document.getElementById('passPresNeg' + i).value = currentVerb.passPresNeg;
            if(currentVerb.minaImpPos !== undefined) { //checks if noun has imperfect tense (may be empty)
                document.getElementById('minaImpPos' + i).value = currentVerb.minaImpPos;
                document.getElementById('minaImpNeg' + i).value = currentVerb.minaImpNeg;
                document.getElementById('sinaImpPos' + i).value = currentVerb.sinaImpPos;
                document.getElementById('sinaImpNeg' + i).value = currentVerb.sinaImpNeg;
                document.getElementById('hanImpPos' + i).value = currentVerb.hanImpPos;
                document.getElementById('hanImpNeg' + i).value = currentVerb.hanImpNeg;
                document.getElementById('meImpPos' + i).value = currentVerb.meImpPos;
                document.getElementById('meImpNeg' + i).value = currentVerb.meImpNeg;
                document.getElementById('teImpPos' + i).value = currentVerb.teImpPos;
                document.getElementById('teImpNeg' + i).value = currentVerb.teImpNeg;
                document.getElementById('heImpPos' + i).value = currentVerb.heImpPos;
                document.getElementById('heImpNeg' + i).value = currentVerb.heImpNeg;
                document.getElementById('passImpPos' + i).value = currentVerb.passImpPos;
                document.getElementById('passImpNeg' + i).value = currentVerb.passImpNeg;            
            }
        }
        for(let i = 1; i <= numOtherWords; i++){
            let currentOtherWord = deckOtherWords[i];
            addOtherWordTemplate();
            loadOtherWordSubmitButton();
            document.getElementById('englishOtherWord' + i).value = currentOtherWord.englishWord;
            document.getElementById('finnishOtherWord' + i).value = currentOtherWord.finnishWord;
        }
    }
}

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
addNounButtonBottom.addEventListener('click', loadNounSubmitButton);
addVerbButtonBottom.addEventListener('click', loadVerbSubmitButton);
addOtherWordButtonBottom.addEventListener('click', loadOtherWordSubmitButton);


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

saveDeckSubmitButton.addEventListener('click', saveDeckToFile);

function saveDeckToFile() {
    saveAllWordsButton.click();
    let deckConfig = getDeckConfig();
    let fullDeck = {'nouns': nounList, 'verbs': verbList, 'otherWords': otherWordList, 'deckConfig':deckConfig};
    let fullDeckString = JSON.stringify(fullDeck);
    let link = document.createElement('a');
    link.download = deckName;
    link.href = 'data:application/json,' + encodeURIComponent(fullDeckString);
    link.click() 
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
    let numCardsFieldValue = Number(numCardsField.value);
    let numCards = (Number.isInteger(numCardsFieldValue) && numCardsFieldValue > 0) ? numCardsFieldValue : "";
    let deckConfig = {'nounChecks':deckNounChecks, 'nounDecChecks':deckDecChecks, 'verbChecks':deckVerbChecks, 'verbConjChecks': deckConjChecks, 'otherWordChecks':deckOtherWordChecks, 'numCards':numCards};
    return deckConfig;
}
