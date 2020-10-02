const standardPresetButton = document.getElementById("standardPresetButton");
const basicPresetButton = document.getElementById("basicPresetButton");

const t = true;
const f = false;

function deckPreset(nounChecks, nounDecChecks, verbChecks, verbConjChecks, otherWordChecks) {
    this.nounChecks = nounChecks;
    this.nounDecChecks = nounDecChecks;
    this.verbChecks = verbChecks;
    this.verbConjChecks = verbConjChecks;
    this.otherWordChecks = otherWordChecks;
}

const standardNounChecks = [t, t, t];
const standardNounDecChecks = [t, t, f, t, f];
const standardVerbChecks = [t, t, t];
const standardVerbConjChecks = [t, f, f, f, f, f, f, t, f, f, f, f, f, f, t, f, f, f, f, f, f, t, f, f, f, f, f, f];
const standardOtherWordChecks = [t, t];
const standardPreset = new deckPreset(standardNounChecks, standardNounDecChecks, standardVerbChecks, standardVerbConjChecks, standardOtherWordChecks);

standardPresetButton.addEventListener('click', () => useSettings(standardPreset));

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