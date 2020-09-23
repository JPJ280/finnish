startButton.addEventListener('click', questionsStart);

function getRandomInt(max) {
    returnInt = Math.floor(Math.random() * max);
    return(returnInt);
}

function holdingIt() {
    if(holdIt === 1) {
        setTimeout(holdingIt, 100);
    }
}

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
    let numVerbs = deckVerbs.length;
    if(numVerbs !== 0) {
        numVerbs = numVerbs -1;
    }
    let numOtherWords = deckOtherWords.length;
    if(numOtherWords !== 0) {
        numOtherWords = numOtherWords -1;
    }
    let totalWords = numNouns + numVerbs + numOtherWords; //+numPronouns;
    if(totalWords === 0) {
        alert('Invalid deck')
        return;
    }
    for (let wordIndex = 0; wordIndex < 10; wordIndex++) {
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
            wordPicked = deckOtherwords[pickWord - (numNouns + numVerbs)];
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
            questionType = getRandomInt(3);
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
                    let nounCaseNum = getRandomInt(5) + 1;
                    let nounCase;
                    switch (nounCaseNum) {
                        case 1:
                            nounCase = 'genetiivi yksikkö'; 
                            answer[wordIndex] = wordPicked.genSing;
                            break;
                        case 2:
                            nounCase = 'partitiivi yksikkö';
                            answer[wordIndex] = wordPicked.partSing;
                            break;
                        case 3:
                            nounCase = 'nominatiivi monikko';
                            answer[wordIndex] = wordPicked.nomPlu;
                            break;
                        case 4:
                            nounCase = 'genetiivi monikko';
                            answer[wordIndex] = wordPicked.genPlu;
                            break;
                        case 5:
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
            questionType = getRandomInt(3);
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
                    let verbCaseNum = getRandomInt(12) + 1;
                    let verbCase;
                    switch(verbCaseNum) {
                        case 1:
                            verbCase = 'minä preesens positiivinen';
                            answer[wordIndex] = wordPicked.minaPresPos;
                            break;
                        case 2:
                            verbCase = 'sinä preesens positiivinen';
                            answer[wordIndex] = wordPicked.sinaPresPos;
                            break;
                        case 3:
                            verbCase = 'hän preesens positiivinen';
                            answer[wordIndex] = wordPicked.hanPresPos;
                            break;  
                        case 4:
                            verbCase = 'me preesens positiivinen';
                            answer[wordIndex] = wordPicked.mePresPos;
                            break;
                        case 5:
                            verbCase = 'te preesens positiivinen';
                            answer[wordIndex] = wordPicked.tePresPos;
                            break;
                        case 6:
                            verbCase = 'he preesens positiivinen';
                            answer[wordIndex] = wordPicked.hePresPos;
                            break;
                        case 7:
                            verbCase = 'minä preesens negatiivinen';
                            answer[wordIndex] = wordPicked.minaPresNeg;
                            break;
                        case 8:
                            verbCase = 'sinä preesens negatiivinen';
                            answer[wordIndex] = wordPicked.sinaPresNeg;
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
                            answer[wordIndex] = wordPicked.hePresNeg;
                            break;
                        case 13: 
                            verbCase = 'pasiivi positiivinen';
                            answer[wordIndex] = wordPicked.passPresPos;
                            break;
                        case 14:
                            verbCase = 'passiivi negatiivinen';
                            answer[wordIndex] = wordPicked.passPresNeg;
                            break;
                    }
                    instructions[wordIndex] = "Conjugate: " + wordPicked.finnishWord + ", " + verbCase;
                    if(answer[wordIndex] === '') {
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

function getAnswers() {
    answerIndex = 0;
    instruction.textContent = instructions[answerIndex]
    userCheckButton.addEventListener('click', callAnswers);
}

function callAnswers() {
    while(instructions[answerIndex] === 'skip') {
        answerIndex += 1;
    }
    checkAnswer();
    answerIndex += 1;
    instruction.textContent = instructions[answerIndex]
}

//userCheckButton.addEventListener('click', checkAnswer, once = true);
