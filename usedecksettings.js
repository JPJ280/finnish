const standardPresetButton = document.getElementById("standardPresetButton");
const basicPresetButton = document.getElementById("basicPresetButton");
const deckDefaultButton = document.getElementById("deckDefaultButton");
const allPresetButton = document.getElementById("allPresetButton")

const currentMaxNounForms = 27;
const currentMaxVerbForms = 28;

const t = true; //honestly this is just lazy
const f = false;

/**
 * Creates a group of settings that tell the program what type of questions to give the user
 * @constructor
 * 
 * @param {boolean[]} nounChecks Array of boolean values indicating what types of questions the user wants for substantives
 * @param {boolean[]} nounDecChecks Array of boolean values indicating the declensions the user wants to practice
 * @param {boolean[]} verbChecks Array of boolean values indicating what types of questions the user wants for verbs
 * @param {boolean[]} verbConjChecks Array of boolean values indicating the conjugations the user wants to practice
 * @param {boolean[]} otherWordChecks Array of boolean values indicating what types of questions the user wants for other words
 */
function deckPreset(nounChecks, nounDecChecks, verbChecks, verbConjChecks, otherWordChecks) {
    /* [English to Finnish, Finnish to English, Declensions] */
    this.nounChecks = nounChecks;
    /* [nominative plural, genitive singular, genitive plural, partitive singular, partitive plural,
    inessive singular, inessive plural, elative singular, elative plural, illative singular, illative plural,
    adessive singular, adessive plural, ablative singular, ablative plural, allative singular, allative plural,
    essive singular, essive plural, translative singular, translative plural,
    instructive singular**, instructive plural, abessive singular, abessive plural, comitative singular**, comitative plural]
    **instructive and comitative singular will default to the plural of these forms
    */
    this.nounDecChecks = nounDecChecks;
    /* [English to Finnish, Finnish to English, Conjugations] */
    this.verbChecks = verbChecks;
    /* Each group of 7 follows:
    [1p sing, 2p sing, 3p sing, 1p plu, 2p plu, 3p plu, passive]
    1st group is present positive, 2nd is present negative, 3rd is imperfect positive, 4th is imperfect negative
    */
    this.verbConjChecks = verbConjChecks;
    /* [English to Finnish, Finnish to English] */
    this.otherWordChecks = otherWordChecks;
}

/* If the deck has a default setting, this preset button sets the settings for this instance to those */
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

standardPresetButton.addEventListener('click', () => useSettings(standardPreset)); //standard preset

const basicNounChecks = [t, t, t];
const basicNounDecChecks = [t, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f];
const basicVerbChecks = [t, t, t];
const basicVerbConjChecks = [t, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f];
const basicOtherWordChecks = [t, t];
const basicPreset = new deckPreset(basicNounChecks, basicNounDecChecks, basicVerbChecks, basicVerbConjChecks, basicOtherWordChecks);

basicPresetButton.addEventListener('click', () => useSettings(basicPreset)); //basic preset

const allNounChecks = [t, t, t];
//does not select instructive and comitative singular
const allNounDecChecks = [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, f, t, t, t, f, t]; 
const allVerbChecks = [t, t, t];
const allVerbConjChecks = [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t];
const allOtherWordchecks = [t, t];
const allPreset = new deckPreset(allNounChecks, allNounDecChecks, allVerbChecks, allVerbConjChecks, allOtherWordchecks);

allPresetButton.addEventListener('click', () => useSettings(allPreset)); //(almost) all options selected

/**
 * Automatically checks the boxes for substantive question types indicated by array
 * 
 * @param {boolean[]} nounChecksPreset Preset or deck array
 */
function generateNounChecksArray(nounChecksPreset) {
    document.getElementById("nounCheck0").checked = nounChecksPreset[0];
    document.getElementById("nounCheck1").checked = nounChecksPreset[1];
    document.getElementById("nounCheck2").checked = nounChecksPreset[2];
}

/**
 * Automatically checks the boxes for substantive declensions indicated by array
 * 
 * @param {boolean[]} nounDecChecks Preset or deck array 
 */
function generateDecChecksArray(nounDecsPreset) {
    for(let i = 0; i < currentMaxNounForms; i++) {
        document.getElementById("nounDecCheck" + i).checked = nounDecsPreset[i];
    }
}

/**
 * Automatically checks the boxes for verb question types indicated by array
 * 
 * @param {boolean[]} verbChecksPreset Preset or deck array
 */
function generateVerbChecksArray(verbChecksPreset) {
    document.getElementById("verbCheck0").checked = verbChecksPreset[0];
    document.getElementById("verbCheck1").checked = verbChecksPreset[1];
    document.getElementById("verbCheck2").checked = verbChecksPreset[2];
}

/**
 * Automatically checks the boxes for verb conjugations indicated by array
 * 
 * @param {boolean[]} verbConjPreset Preset or deck array
 */
function generateConjChecksArray(verbConjPreset) {
    for(let i = 0; i < currentMaxVerbForms; i++) {
        document.getElementById("verbConjCheck" + i).checked = verbConjPreset[i];
    }
}

/**
 * Automatically checks the boxes for other word question types indicated by array
 * 
 * @param {boolean[]} otherWordChecksPreset Preset or deck array
 */
function generateOtherWordChecksArray(otherWordChecksPreset) {
    document.getElementById("otherWordCheck0").checked = otherWordChecksPreset[0];
    document.getElementById("otherWordCheck1").checked = otherWordChecksPreset[1];
}

/**
 * Checks and unchecks settings boxes to match a preset or deck default 
 * 
 * @param {deckPreset} deckSettings Collection of boolean arrays representing the deck settings to implement
 */
function useSettings(deckSettings) {
    generateNounChecksArray(deckSettings.nounChecks);
    generateDecChecksArray(deckSettings.nounDecChecks);
    generateVerbChecksArray(deckSettings.verbChecks);
    generateConjChecksArray(deckSettings.verbConjChecks);
    generateOtherWordChecksArray(deckSettings.otherWordChecks);
}

