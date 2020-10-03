startButton.addEventListener('click', questionsStart);

function getRandomInt(max) {
    returnInt = Math.floor(Math.random() * max);
    return(returnInt);
}

const currentMaxNounForms = 5;
const currentMaxVerbForms = 28;
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

function checkAnswer() {
    userAnswer = userAnswerField.value;
    if(userAnswer === answer[answerIndex]){
        feedback.textContent = "Correct. ";
    }
    else {
        feedback.textContent = "Incorrect. ";
    }
    feedback.textContent += "The answer is " + answer[answerIndex];
    userAnswerField.value = '';
}

function questionsStart() {
    let questionType;
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
    if(nounPromptArray.includes(true)) {
        nounChooseArray = createNounChooseArray(nounPromptArray);
    }
    else {
        numNouns = 0;
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
    if(verbPromptArray.includes(true)) {
        verbChooseArray = createVerbChooseArray(verbPromptArray);
    }
    else {
        numVerbs = 0;
    }

    let numOtherWords = deckOtherWords.length;
    if(numOtherWords !== 0) {
        numOtherWords = numOtherWords -1;
    }
    let otherWordPromptArray = [document.getElementById("otherWordCheck0").checked, document.getElementById("otherWordCheck1").checked];
    if(otherWordPromptArray.includes(true)) {
        otherWordChooseArray = createOtherWordChooseArray(otherWordPromptArray);
    }
    else {
        numOtherWords = 0;
    }
    let totalWords = numNouns + numVerbs + numOtherWords; //+numPronouns;
    if(totalWords === 0) {
        alert('Invalid deck')
        return;
    }
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

        if(typePicked === 'noun') {
            questionRand = getRandomInt(nounChooseArray.length);
            questionType = nounChooseArray[questionRand];
            switch (questionType) {
                case 0:
                    instructions[wordIndex] = "Translate " + wordPicked.englishWord + " into Finnish";
                    answer[wordIndex] = wordPicked.finnishWord;
                    break;
                case 1:
                    instructions[wordIndex] = "Translate " + wordPicked.finnishWord + " into English";
                    answer[wordIndex] = wordPicked.englishWord;
                    break;
                case 2:
                    let nounCaseRand = getRandomInt(nounDeclineChooseArray.length);
                    let nounCaseNum = nounDeclineChooseArray[nounCaseRand];
                    let nounCase;
                    switch (nounCaseNum) {
                        case 1:
                            nounCase = 'genetiivi yksikkö'; 
                            answer[wordIndex] = wordPicked.genSing;
                            break;
                        case 3:
                            nounCase = 'partitiivi yksikkö';
                            answer[wordIndex] = wordPicked.partSing;
                            break;
                        case 0:
                            nounCase = 'nominatiivi monikko';
                            answer[wordIndex] = wordPicked.nomPlu;
                            break;
                        case 2:
                            nounCase = 'genetiivi monikko';
                            answer[wordIndex] = wordPicked.genPlu;
                            break;
                        case 4:
                            nounCase = 'partitiivi monikko';
                            answer[wordIndex] = wordPicked.partPlu;
                            break;
                    }
                    instructions[wordIndex] = "Decline: " + wordPicked.nomSing + ", " + nounCase;
                    if(answer[wordIndex] === '') {
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
                    instructions[wordIndex] = "Translate " + wordPicked.englishWord + " into Finnish";
                    answer[wordIndex] = wordPicked.finnishWord;
                    break;
                case 1:
                    instructions[wordIndex] = "Translate " + wordPicked.finnishWord + " into English";
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
                    instructions[wordIndex] = "Conjugate: " + wordPicked.finnishWord + ", " + verbCase;
                    if(answer[wordIndex] === '' || answer[wordIndex] === undefined) {
                        instructions[wordIndex] = 'skip';
                    }
            }
        }
        else if(typePicked === 'otherWord') { //other word
            questionType = getRandomInt(2);
            switch (questionType) {
                case 0:
                    instructions[wordIndex] = "Translate " + wordPicked.englishWord + " into Finnish";
                    answer[wordIndex] = wordPicked.finnishWord;
                    break;
                case 1:
                    instructions[wordIndex] = "Translate " + wordPicked.finnishWord + " into English";
                    answer[wordIndex] = wordPicked.englishWord;
                    break;
            }
        }
        /*else if() { //pronoun

        }*/
    }
    
    getAnswers();
}

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

function createNounDeclinePromptArray() {
    let nounDeclinePromptArray = [];
    for(let i = 0; i < currentMaxNounForms; i++) {
        nounDeclinePromptArray[i] = document.getElementById("nounDecCheck" + i).checked;
    }
    if(document.getElementById("nounDecCheck" + currentMaxNounForms) !== null) {
        alert("If this is JP: \nYou forgot to update current max noun forms \n" +
        "If this isn't JP: \nPlease email JP at @jepaulson2@wisc.edu and tell them they forgot to update current max noun forms");
    }
    return nounDeclinePromptArray;
}

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

function createVerbConjPromptArray() {
    let verbConjPromptArray = [];
    for(let i = 0; i < currentMaxVerbForms; i++) {
        verbConjPromptArray[i] = document.getElementById("verbConjCheck" + i).checked;
    }
    if(document.getElementById("verbConjCheck" + currentMaxVerbForms) !== null) {
        alert("If this is JP: \nYou forgot to update current max verb forms \n" +
        "If this isn't JP: \nPlease email JP at @jepaulson2@wisc.edu and tell them they forgot to update current max noun forms");
    }
    return verbConjPromptArray;
}

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

function createOtherWordChooseArray(otherWordPromptArray) {
    let j = 0;
    let otherWordChooseArray = [];
    for(let i = 0; i < otherWordPromptArray.length; i++) {
        if(otherWordPromptArray[i]) {
            otherWordChooseArray[j] = i;
            j++;
        }
    }
    return nounChooseArray;
}

function getAnswers() {
    answerIndex = 0;
    while(instructions[answerIndex] === 'skip') {
        answerIndex += 1;
    }
    instruction.textContent = instructions[answerIndex]
    userCheckButton.addEventListener('click', callAnswers);
}

function callAnswers() {
    checkAnswer();
    answerIndex += 1;
    while(instructions[answerIndex] === 'skip') {
        answerIndex += 1;
    }
    instruction.textContent = instructions[answerIndex]
}

//userCheckButton.addEventListener('click', checkAnswer, once = true);
