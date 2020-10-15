const standardPresetButton = document.getElementById("standardPresetButton");
const basicPresetButton = document.getElementById("basicPresetButton");
const deckDefaultButton = document.getElementById("deckDefaultButton");
const allPresetButton = document.getElementById("allPresetButton")

const currentMaxNounForms = 27;
const currentMaxVerbForms = 28;

const t = true;
const f = false;

function deckPreset(nounChecks, nounDecChecks, verbChecks, verbConjChecks, otherWordChecks) {
    this.nounChecks = nounChecks;
    this.nounDecChecks = nounDecChecks;
    this.verbChecks = verbChecks;
    this.verbConjChecks = verbConjChecks;
    this.otherWordChecks = otherWordChecks;
}

deckDefaultButton.addEventListener('click', useDeckDefault);
function useDeckDefault() {
    if(deckConfig !== undefined) {
        useSettings(deckConfig);
    }
}

const standardNounChecks = [t, t, t];
const standardNounDecChecks = [t, t, f, t, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f];
const standardVerbChecks = [t, t, t];
const standardVerbConjChecks = [t, f, f, f, f, f, f, t, f, f, f, f, f, f, t, f, f, f, f, f, f, t, f, f, f, f, f, f];
const standardOtherWordChecks = [t, t];
const standardPreset = new deckPreset(standardNounChecks, standardNounDecChecks, standardVerbChecks, standardVerbConjChecks, standardOtherWordChecks);

standardPresetButton.addEventListener('click', () => useSettings(standardPreset));

const basicNounChecks = [t, t, t];
const basicNounDecChecks = [t, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f];
const basicVerbChecks = [t, t, t];
const basicVerbConjChecks = [t, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f];
const basicOtherWordChecks = [t, t];
const basicPreset = new deckPreset(basicNounChecks, basicNounDecChecks, basicVerbChecks, basicVerbConjChecks, basicOtherWordChecks);

basicPresetButton.addEventListener('click', () => useSettings(basicPreset));

const allNounChecks = [t, t, t];
const allNounDecChecks = [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, f, t, t, t, f, t];
const allVerbChecks = [t, t, t];
const allVerbConjChecks = [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t];
const allOtherWordchecks = [t, t];
const allPreset = new deckPreset(allNounChecks, allNounDecChecks, allVerbChecks, allVerbConjChecks, allOtherWordchecks);

allPresetButton.addEventListener('click', () => useSettings(allPreset));

function generateNounChecksArray(nounChecksPreset) {
    document.getElementById("nounCheck0").checked = nounChecksPreset[0];
    document.getElementById("nounCheck1").checked = nounChecksPreset[1];
    document.getElementById("nounCheck2").checked = nounChecksPreset[2];
}

function generateDecChecksArray(nounDecsPreset) {
    for(let i = 0; i < currentMaxNounForms; i++) {
        document.getElementById("nounDecCheck" + i).checked = nounDecsPreset[i];
    }
}

function generateVerbChecksArray(verbChecksPreset) {
    document.getElementById("verbCheck0").checked = verbChecksPreset[0];
    document.getElementById("verbCheck1").checked = verbChecksPreset[1];
    document.getElementById("verbCheck2").checked = verbChecksPreset[2];
}

function generateConjChecksArray(verbConjPreset) {
    for(let i = 0; i < currentMaxVerbForms; i++) {
        document.getElementById("verbConjCheck" + i).checked = verbConjPreset[i];
    }
}

function generateOtherWordChecksArray(otherWordChecksPreset) {
    document.getElementById("otherWordCheck0").checked = otherWordChecksPreset[0];
    document.getElementById("otherWordCheck1").checked = otherWordChecksPreset[1];
}

function useSettings(deckSettings) {
    generateNounChecksArray(deckSettings.nounChecks);
    generateDecChecksArray(deckSettings.nounDecChecks);
    generateVerbChecksArray(deckSettings.verbChecks);
    generateConjChecksArray(deckSettings.verbConjChecks);
    generateOtherWordChecksArray(deckSettings.otherWordChecks);
}