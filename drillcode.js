startButton.addEventListener('click', initializeDeck);

/**
 * Generates a random integer between 0 (inclusive) and max (exclusive)
 * 
 * @param {number} max Function will not return this integer or anything greater
 * @returns Integer between 0 (inclusive) and max (exclusive)
 */
function getRandomInt(max) {
    returnInt = Math.floor(Math.random() * max);
    return(returnInt);
}

const currentMaxPronounForms = 0;
let instruction = document.getElementById('instruction');
let feedback = document.getElementById('feedback');
let userAnswerField = document.getElementById('userAnswerField');
let userCheckButton = document.getElementById('userAnswerSubmit');
let answer = [];
let instructions = [];
let wordPicked;
let typePicked;
let nounCase;
let userAnswer;
let answerIndex;
let quizFunctions = [];
const testingPara = document.getElementById('testing');

/**
 * Reads the user's answer, compares it to the correct answer, tells the user whether they were correct, and 
 * empties the answer field.
 */
function checkAnswer() {
    userAnswer = userAnswerField.value;
    if(userAnswer === answer[answerIndex]){
        feedback.textContent = "Correct. ";
    }
    else {
        feedback.textContent = "Incorrect. ";
    }
    feedback.textContent += "The answer is \"" + answer[answerIndex] + "\"";
    userAnswerField.value = '';
}

let nounChooseArray = [];
let nounDeclineChooseArray = [];
let verbChooseArray = [];
let verbConjChooseArray = [];
let otherWordChooseArray = [];
/**
 * Gets the number of each type of word in the deck. Generates an array for each type of word to indicate which type of questions
 * the user would like to get. If the user indicates they want inflections for a word type that supports them, but want no forms
 * of the inflections, goes forward as if the user indicated they didn't want inflections. If the user indicated they wanted no
 * questions for a type of word, the program acts as if there are none of that type of word in the deck (assigns the number of cards
 * of that type to 0). If total number of words is 0, quits the program and returns an error message. (This could be because the user
 * has no words in the deck, but also could be because for any type of word in the deck, all settings are off; in other words, invalid
 * settings rather than invalid deck. The error message should be more dynamic in the future to tell the user exactly what is wrong.)
 * Starts generating the questions with the number of each type of word and the boolean choose arrays (global variables).
 * 
 * This code may need to be refactored.
 */
function initializeDeck() {
    let numNouns = deckNouns.length;
    if(numNouns !== 0) {
        numNouns = numNouns -1;
    }
    let nounPromptArray = [document.getElementById("nounCheck0").checked, document.getElementById("nounCheck1").checked, document.getElementById("nounCheck2").checked];
    if(nounPromptArray[2]) {
        nounDeclinePromptArray = createNounDeclinePromptArray();
        if(nounDeclinePromptArray.includes(true)) {
            nounDeclineChooseArray = createNounDeclineChooseArray(nounDeclinePromptArray);
        }
        else {
            nounPromptArray[2] = false;
        }
    }
    //let usesNouns;
    nounChooseArray = [];
    if(nounPromptArray.includes(true)) {
        nounChooseArray = createNounChooseArray(nounPromptArray);
        usesNouns = true;
    }
    else {
        numNouns = 0;
        usesNouns = false;
    }
    let numVerbs = deckVerbs.length;
    if(numVerbs !== 0) {
        numVerbs = numVerbs -1;
    }
    let verbPromptArray = [document.getElementById("verbCheck0").checked, document.getElementById("verbCheck1").checked, document.getElementById("verbCheck2").checked];
    if(verbPromptArray[2]) {
        verbConjPromptArray = createVerbConjPromptArray();
        if(verbConjPromptArray.includes(true)) {
            verbConjChooseArray = createVerbConjChooseArray(verbConjPromptArray);
        }
        else {
            verbPromptArray[2] = false;
        }
    }
    //let usesVerbs;
    verbChooseArray = [];
    if(verbPromptArray.includes(true)) {
        verbChooseArray = createVerbChooseArray(verbPromptArray);
        usesVerbs = true;
    }
    else {
        numVerbs = 0;
        usesVerbs = false;
    }
    let numOtherWords = deckOtherWords.length;
    if(numOtherWords !== 0) {
        numOtherWords = numOtherWords -1;
    }
    let otherWordPromptArray = [document.getElementById("otherWordCheck0").checked, document.getElementById("otherWordCheck1").checked];
    //let usesOtherWords;
    otherWordChooseArray = [];
    if(otherWordPromptArray.includes(true)) {
        otherWordChooseArray = createOtherWordChooseArray(otherWordPromptArray);
        usesOtherWords = true;
    }
    else {
        numOtherWords = 0;
        usesOtherWords = false;
    }
    let totalWords = numNouns + numVerbs + numOtherWords; //+numPronouns;
    if(totalWords === 0) {
        alert('Invalid deck')
        return;
    }
    getQuestions(numNouns, numVerbs, numOtherWords)
}

/**
 * Uses a random number to pick a word from the deck, and then, depending on the type of word and what types of questions the
 * user wants for that word, uses more random numbers to generate the question, the instructions passed to the user, and the
 * correct answer. Repeats this until it has generated the number of questions the user has indicated they want (default 20).
 * Then, starts asking the user questions.
 * 
 * Likely needs significant refactoring.
 * 
 * @param {number} numNouns The number of substantives in the deck (or 0 if the user indicates they want no substantive questions)
 * @param {number} numVerbs The number of verbs in the deck (or 0 if the user indicates they want no verb questions)
 * @param {number} numOtherWords The number of other words in the deck (or 0 if the user indicates they want no other word questions)
 */
function getQuestions(numNouns, numVerbs, numOtherWords) {
    let totalWords = numNouns + numVerbs + numOtherWords;
    let numCardsFieldValue = Number(numCardsField.value);
    let numCards = (Number.isInteger(numCardsFieldValue) && numCardsFieldValue > 0) ? numCardsFieldValue : 20;
    for (let wordIndex = 0; wordIndex < numCards; wordIndex++) {
        let pickWord = getRandomInt(totalWords) + 1;
        if(pickWord <= numNouns) {
            wordPicked = deckNouns[pickWord];
            typePicked = 'noun';
        }
        else if(pickWord <= (numNouns + numVerbs)) {
            wordPicked = deckVerbs[pickWord - numNouns];
            typePicked = 'verb';
        }
        else if(pickWord <= (numNouns + numVerbs + numOtherWords)) {
            wordPicked = deckOtherWords[pickWord - (numNouns + numVerbs)];
            typePicked = 'otherWord';
        }
/*        else if(pickWord <= totalWords) {
            let wordPicked = deckPronouns[pickWord - (numNouns + numVerbs + numOtherWords)];
            let typePicked = 'pronoun';
        }     */
        else {
            alert('Invalid deck.');
            break;
        }
        let questionType;

        if(typePicked === 'noun') {
            questionRand = getRandomInt(nounChooseArray.length);
            questionType = nounChooseArray[questionRand];
            switch (questionType) {
                case 0:
                    instructions[wordIndex] = "Translate \"" + wordPicked.englishWord + "\" into Finnish";
                    answer[wordIndex] = wordPicked.finnishWord;
                    break;
                case 1:
                    instructions[wordIndex] = "Translate \"" + wordPicked.finnishWord + "\" into English";
                    answer[wordIndex] = wordPicked.englishWord;
                    break;
                case 2:
                    let nounCaseRand = getRandomInt(nounDeclineChooseArray.length);
                    let nounCaseNum = nounDeclineChooseArray[nounCaseRand];
                    let nounCase;
                    switch (nounCaseNum) {
                        case 1:
                            nounCase = 'yksikön genetiivi'; 
                            answer[wordIndex] = wordPicked.genSing;
                            break;
                        case 3:
                            nounCase = 'yksikön partitiivi';
                            answer[wordIndex] = wordPicked.partSing;
                            break;
                        case 0:
                            nounCase = 'monikon nominatiivi';
                            answer[wordIndex] = wordPicked.nomPlu;
                            break;
                        case 2:
                            nounCase = 'monikon genetiivi';
                            answer[wordIndex] = wordPicked.genPlu;
                            break;
                        case 4:
                            nounCase = 'monikon partitiivi';
                            answer[wordIndex] = wordPicked.partPlu;
                            break;
                        case 5:
                            nounCase = 'yksikön inessiivi';
                            answer[wordIndex] = wordPicked.ineSing;
                            break;
                        case 6:
                            nounCase = 'monikon inessiivi';
                            answer[wordIndex] = wordPicked.inePlu;
                            break;
                        case 7:
                            nounCase = 'yksikön elatiivi';
                            answer[wordIndex] = wordPicked.elaSing;
                            break;
                        case 8:
                            nounCase = 'monikon elatiivi';
                            answer[wordIndex] = wordPicked.elaPlu;
                            break;
                        case 9:
                            nounCase = 'yksikön illatiivi';
                            answer[wordIndex] = wordPicked.illSing;
                            break;
                        case 10:
                            nounCase = 'monikon illatiivi';
                            answer[wordIndex] = wordPicked.illPlu;
                            break;
                        case 11:
                            nounCase = 'yksikön adessiivi';
                            answer[wordIndex] = wordPicked.adeSing;
                            break;
                        case 12:
                            nounCase = 'monikon adessiivi';
                            answer[wordIndex] = wordPicked.adePlu;
                            break;
                        case 13:
                            nounCase = 'yksikön ablatiivi';
                            answer[wordIndex] = wordPicked.ablSing;
                            break;
                        case 14:
                            nounCase = 'monikon ablatiivi';
                            answer[wordIndex] = wordPicked.ablPlu;
                            break;
                        case 15:
                            nounCase = 'yksikön allatiivi';
                            answer[wordIndex] = wordPicked.allSing;
                            break;
                        case 16:
                            nounCase = 'monikon allatiivi';
                            answer[wordIndex] = wordPicked.allPlu;
                            break;
                        case 17:
                            nounCase = 'yksikön essiivi';
                            answer[wordIndex] = wordPicked.essSing;
                            break;
                        case 18:
                            nounCase = 'monikon essiivi';
                            answer[wordIndex] = wordPicked.essPlu;
                            break;
                        case 19:
                            nounCase = 'yksikön translatiivi';
                            answer[wordIndex] = wordPicked.traSing;
                            break;
                        case 20:
                            nounCase = 'monikon translatiivi';
                            answer[wordIndex] = wordPicked.traPlu;
                            break;
                        case 21:
                        case 22:
                            nounCase = 'monikon instruktiivi';
                            answer[wordIndex] = wordPicked.intPlu;
                            break;
                        case 23:
                            nounCase = 'yksikön abessiivi';
                            answer[wordIndex] = wordPicked.abeSing;
                            break;
                        case 24:
                            nounCase = 'monikon abessiivi';
                            answer[wordIndex] = wordPicked.abePlu;
                            break;
                        case 25:
                        case 26:
                            nounCase = 'monikon komitatiivi';
                            answer[wordIndex] = wordPicked.comPlu;
                            break;

                    }
                    instructions[wordIndex] = "Decline: \"" + wordPicked.nomSing + "\", " + nounCase;
                    if(answer[wordIndex] === '' || answer[wordIndex] === undefined) {
                        instructions[wordIndex] = 'skip';
                    }
                    break;
                
            
            }
        }
        else if(typePicked === 'verb') { //verb
            questionRand = getRandomInt(verbChooseArray.length);
            questionType = verbChooseArray[questionRand];
            switch (questionType) {
                case 0:
                    instructions[wordIndex] = "Translate \"" + wordPicked.englishWord + "\" into Finnish";
                    answer[wordIndex] = wordPicked.finnishWord;
                    break;
                case 1:
                    instructions[wordIndex] = "Translate \"" + wordPicked.finnishWord + "\" into English";
                    answer[wordIndex] = wordPicked.englishWord;
                    break;
                case 2:
                    let verbCaseRand = getRandomInt(verbConjChooseArray.length);
                    let verbCaseNum = verbConjChooseArray[verbCaseRand];
                    let verbCase;
                    switch(verbCaseNum) {
                        case 0:
                            verbCase = 'minä preesens positiivinen';
                            answer[wordIndex] = wordPicked.minaPresPos;
                            break;
                        case 1:
                            verbCase = 'sinä preesens positiivinen';
                            answer[wordIndex] = wordPicked.sinaPresPos;
                            break;
                        case 2:
                            verbCase = 'hän preesens positiivinen';
                            answer[wordIndex] = wordPicked.hanPresPos;
                            break;  
                        case 3:
                            verbCase = 'me preesens positiivinen';
                            answer[wordIndex] = wordPicked.mePresPos;
                            break;
                        case 4:
                            verbCase = 'te preesens positiivinen';
                            answer[wordIndex] = wordPicked.tePresPos;
                            break;
                        case 5:
                            verbCase = 'he preesens positiivinen';
                            answer[wordIndex] = wordPicked.hePresPos;
                            break;
                        case 6:
                            verbCase = 'passiivi preesens positiivinen';
                            answer[wordIndex] = wordPicked.passPresPos;
                            break;
                        case 7:
                            verbCase = 'minä preesens negatiivinen';
                            answer[wordIndex] = wordPicked.minaPresNeg;
                            break;
                        case 8:
                            verbCase = 'sinä preesens negatiivinen';
                            answer[wordIndex] = wordPicked.sanPresNeg;
                            break;  
                        case 9:
                            verbCase = 'hän preesens negatiivinen';
                            answer[wordIndex] = wordPicked.hanPresNeg;
                            break;
                        case 10:
                            verbCase = 'me preesens negatiivinen';
                            answer[wordIndex] = wordPicked.mePresNeg;
                            break;
                        case 11:
                            verbCase = 'te preesens negatiivinen';
                            answer[wordIndex] = wordPicked.tePresNeg;
                            break;
                        case 12: 
                            verbCase = 'he preesens negatiivinen';
                            answer[wordIndex] = wordPicked.hePresPos;
                            break;
                        case 13:
                            verbCase = 'passiivi preesens negatiivinen';
                            answer[wordIndex] = wordPicked.passPresNeg;
                            break;
                        case 14:
                            verbCase = 'minä imperfekti positiivinen';
                            answer[wordIndex] = wordPicked.minaImpPos;
                            break;
                        case 15:
                            verbCase = 'minä imperfekti negatiivinen';
                            answer[wordIndex] = wordPicked.minaImpNeg;
                            break;
                        case 16:
                            verbCase = 'sinä imperfekti positiivinen';
                            answer[wordIndex] = wordPicked.sinaImpPos;
                            break;
                        case 17:
                            verbCase = 'sinä imperfekti negatiivinen';
                            answer[wordIndex] = wordPicked.sinaImpNeg;
                            break;
                        case 18:
                            verbCase = 'hän imperfekti positiivinen';
                            answer[wordIndex] = wordPicked.hanImpPos;
                            break;
                        case 19:
                            verbCase = 'hän imperfekti negatiivinen';
                            answer[wordIndex] = wordPicked.hanImpNeg;
                            break;     
                        case 20:
                            verbCase = 'me imperfekti positiivinen';
                            answer[wordIndex] = wordPicked.meImpPos;
                            break;
                        case 21:
                            verbCase = 'me imperfekti negatiivinen';
                            answer[wordIndex] = wordPicked.meImpNeg;
                            break;                            
                        case 22:
                            verbCase = 'te imperfekti positiivinen';
                            answer[wordIndex] = wordPicked.teImpPos;
                            break;
                        case 23:
                            verbCase = 'te imperfekti negatiivinen';
                            answer[wordIndex] = wordPicked.teImpNeg;
                            break;                            
                        case 24:
                            verbCase = 'he imperfekti positiivinen';
                            answer[wordIndex] = wordPicked.heImpPos;
                            break;
                        case 25:
                            verbCase = 'he imperfekti negatiivinen';
                            answer[wordIndex] = wordPicked.heImpNeg;
                            break;                            
                        case 26:
                            verbCase = 'passiivi imperfekti positiivinen';
                            answer[wordIndex] = wordPicked.passImpPos;
                            break;
                        case 27:
                            verbCase = 'passiivi imperfekti negatiivinen';
                            answer[wordIndex] = wordPicked.passImpNeg;
                            break;
                    }
                    instructions[wordIndex] = "Conjugate: \"" + wordPicked.finnishWord + "\", " + verbCase;
                    if(answer[wordIndex] === '' || answer[wordIndex] === undefined) {
                        instructions[wordIndex] = 'skip';
                    }
            }
        }
        else if(typePicked === 'otherWord') { //other word
            questionRand = getRandomInt(otherWordChooseArray.length);
            questionType = otherWordChooseArray[questionRand];
            switch (questionType) {
                case 0:
                    instructions[wordIndex] = "Translate \"" + wordPicked.englishWord + "\" into Finnish";
                    answer[wordIndex] = wordPicked.finnishWord;
                    break;
                case 1:
                    instructions[wordIndex] = "Translate \"" + wordPicked.finnishWord + "\" into English";
                    answer[wordIndex] = wordPicked.englishWord;
                    break;
            }
        }
        /*else if() { //pronoun

        }*/
    }
    
    getAnswers();
}

/**
 * Creates an array of integers indicating which types of questions the user wants for substantives. If the user wants 
 * question types 0 (translate to Finnish) and 2 (inflect), the returned array will be [0, 2]. This is useful for 
 * calling a random number to randomly get one of the elements of the array, getting one of those two question types.
 * 
 * @param {boolean[]} nounPromptArray 
 * @returns {number[]} 
 */
function createNounChooseArray(nounPromptArray) {
    let j = 0;
    let nounChooseArray = [];
    for(let i = 0; i < nounPromptArray.length; i++) {
        if(nounPromptArray[i]) {
            nounChooseArray[j] = i;
            j++;
        }
    }
    return nounChooseArray;
}

/**
 * Reads checkboxes for inflection forms the user wants for substantives and creates an array of boolean
 * values to indicate whether the user wants each form.
 *  
 * @returns {boolean[]}
 */
function createNounDeclinePromptArray() {
    let nounDeclinePromptArray = [];
    for(let i = 0; i < currentMaxNounForms; i++) {
        nounDeclinePromptArray[i] = document.getElementById("nounDecCheck" + i).checked;
    }
    return nounDeclinePromptArray;
}

/**
 * Creates an array of integers indicating the types of noun declensions the user wants to be tested on. 
 * Works similarly to {@link createNounChooseArray}.
 * 
 * @param {boolean[]} nounDeclinePromptArray 
 */
function createNounDeclineChooseArray(nounDeclinePromptArray) {
    let nounDeclineChooseArray = [];
    let j = 0;
    for(let i = 0; i < nounDeclinePromptArray.length; i++) {
        if(nounDeclinePromptArray[i]) {
            nounDeclineChooseArray[j] = i;
            j++;
        }
    }
    return nounDeclineChooseArray;
}

/**
 * @see createNounChooseArray
 * 
 * @param {number[]} verbPromptArray 
 */
function createVerbChooseArray(verbPromptArray) {
    let j = 0;
    let verbChooseArray = [];
    for(let i = 0; i < verbPromptArray.length; i++) {
        if(verbPromptArray[i]) {
            verbChooseArray[j] = i;
            j++;
        }
    }
    return verbChooseArray;
}

/**
 * @see createNounDeclinePromptArray
 * 
 * @returns {boolean[]}
 */
function createVerbConjPromptArray() {
    let verbConjPromptArray = [];
    for(let i = 0; i < currentMaxVerbForms; i++) {
        verbConjPromptArray[i] = document.getElementById("verbConjCheck" + i).checked;
    }
    return verbConjPromptArray;
}

/**
 * @see createNounChooseArray and {@link createNounDeclineChooseArray}
 * 
 * @param {number[]} verbConjPromptArray 
 */
function createVerbConjChooseArray(verbConjPromptArray) {
    let verbConjChooseArray = [];
    let j = 0;
    for(let i = 0; i < verbConjPromptArray.length; i++) {
        if(verbConjPromptArray[i]) {
            verbConjChooseArray[j] = i;
            j++;
        }
    }
    return verbConjChooseArray;
}

/**
 * @see createNounChooseArray
 * 
 * @param {number[]} otherWordPromptArray 
 */
function createOtherWordChooseArray(otherWordPromptArray) {
    let j = 0;
    let otherWordChooseArray = [];
    for(let i = 0; i < otherWordPromptArray.length; i++) {
        if(otherWordPromptArray[i]) {
            otherWordChooseArray[j] = i;
            j++;
        }
    }
    return otherWordChooseArray;
}

/**
 * Sets answerIndex to 0 (indicating the question should relate to instructions[0] and answers[0]). If the instruction
 * for that index is 'skip', it will increment answerIndex, and repeat that until the instruction is not 'skip'. 
 * It then prints the instruction for the first question to the screen, then adds an event listener to the check 
 * answer button that calls the callAnswers function.
 */
function getAnswers() {
    answerIndex = 0;
    while(instructions[answerIndex] === 'skip') {
        answerIndex += 1;
    }
    instruction.textContent = instructions[answerIndex]
    userCheckButton.addEventListener('click', callAnswers);
}

/**
 * Function is called every time the check answer button is clicked. Calls the checkAnswer function on the user's guess,
 * then increments answerIndex. If the instruction for that index is 'skip', it will increment answerIndex again, and
 * repeat that until the instruction is not skip. It then prints the instruction for the next question to the screen.
 */
function callAnswers() {
    checkAnswer();
    answerIndex += 1;
    while(instructions[answerIndex] === 'skip') {
        answerIndex += 1;
    }
    instruction.textContent = instructions[answerIndex]
}

//userCheckButton.addEventListener('click', checkAnswer, once = true);
