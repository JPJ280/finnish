let substantive = {
}

let nounList = [];

let nounSubmitButtons = [];
let submitButtonDetectors = [];

function loadNounSubmitButton() {
    nounSubmitButtons[nounIndex] = document.querySelector('#noun' + nounIndex + 'Submit');
    for (let i = 1; i < nounIndex + 1; i++) {
    nounSubmitButtons[nounIndex].addEventListener('click', () => saveNoun(nounIndex));
    }  
}

function saveNoun(nounSaveIndex) {
    //alert('placeholder');
    let nounToSave = nounList[nounSaveIndex];
    let englishIndex = "english" + nounSaveIndex;
    let englishField = document.getElementById(englishIndex);
    nounToSave.englishWord = englishField.value;

    nounList[nounSaveIndex] = nounToSave;
}

addNounButton.addEventListener('click', loadNounSubmitButton);

{   noun1 = Object.create(substantive); //no need to look at this
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