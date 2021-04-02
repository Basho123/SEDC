//mainMenu.js for sketch.js TANKS

let level = localStorage.getItem('level');
let detailsStorage = localStorage.getItem('details');
let difficultyStorage = localStorage.getItem('difficulty');

detailsStorage == null ? localStorage.setItem('details', 1) : null;
difficultyStorage == null ? localStorage.setItem('difficulty', 1) : null;

let menu = {
    mainMenu: document.getElementById('mainMenu'),
    firstMenu: document.getElementById('mainMenuButtonsContainer'),
    optionsMenu: document.getElementById('optionsContainer'),

    newGameButton: document.getElementById('newGame'),
    continueGameButton: document.getElementById('continueGame'),
    optionsButton: document.getElementById('options'),

    detailLevelButton: document.getElementById('detailLevel'),
    detailLevelSpan: document.getElementById('detailSpan'),
    detailLevelAmmount: detailsStorage,
    setDetail: (number) => localStorage.setItem('details', number),
    getDetail: () => +localStorage.getItem('details'),

    difficultyButton: document.getElementById('difficulty'),
    difficultySpan: document.getElementById('difficultySpan'),
    difficultyAmmount: difficultyStorage,
    setDifficulty: (number) => localStorage.setItem('difficulty', number),
    getDifficulty: () => +localStorage.getItem('difficulty'),

    backButton: document.getElementById('back'),
}

level > 0 ? menu.mainMenu.style.display = 'none' : menu.mainMenu.style.display = 'flex';

menu.optionsMenu.style.display = 'none';


//NEW GAME
menu.newGameButton.addEventListener('click', () => {
    localStorage.setItem('level', 1);
    localStorage.setItem('save', 1);
    window.location.reload();
})

//CONTINUE GAME
menu.continueGameButton.addEventListener('click', () => {
    let saveValue = +localStorage.getItem('save');
    localStorage.setItem('level', saveValue);
    window.location.reload();
})

//OPTIONS
menu.optionsButton.addEventListener('click', () => {
    menu.firstMenu.style.display = 'none';
    menu.optionsMenu.style.display = 'block';
})


//DETAIL BUTTON
switch (+detailsStorage) {
    case 0:
        menu.detailLevelSpan.innerHTML = `LOW`
        break;
    case 1:
        menu.detailLevelSpan.innerHTML = `MEDIUM`
        break;
    case 2:
        menu.detailLevelSpan.innerHTML = `HIGH`
        break;
    default:
        break;
}
menu.detailLevelButton.addEventListener('click', () => {
    // CYCLE THROUGH DETAIL LEVEL
    let intermediateNumber = menu.getDetail();
    intermediateNumber++;
    intermediateNumber > 2 ? intermediateNumber = 0 : null;
    menu.setDetail(intermediateNumber);

    //TEXT WRAPPER ON THE BUTTON
    switch (intermediateNumber) {
        case 0:
            menu.detailLevelSpan.innerHTML = `LOW`
            break;
        case 1:
            menu.detailLevelSpan.innerHTML = `MEDIUM`
            break;
        case 2:
            menu.detailLevelSpan.innerHTML = `HIGH`
            break;
        default:
            break;
    }
})

//DIFFICULTY BUTTON
switch (+difficultyStorage) {
    case 0:
        menu.difficultySpan.innerHTML = `EASY`
        break;
    case null:
    case 1:
        menu.difficultySpan.innerHTML = `MEDIUM`
        break;
    case 2:
        menu.difficultySpan.innerHTML = `HARD`
        break;
    default:
        break;
}
menu.difficultyButton.addEventListener('click', () => {
    // CYCLE THROUGH DETAIL LEVEL
    let intermediateNumber = menu.getDifficulty();
    intermediateNumber++;
    intermediateNumber > 2 ? intermediateNumber = 0 : null;
    menu.setDifficulty(intermediateNumber);

    //TEXT WRAPPER ON THE BUTTON
    switch (intermediateNumber) {
        case 0:
            menu.difficultySpan.innerHTML = `EASY`
            break;

        case null:
        case 1:
            menu.difficultySpan.innerHTML = `MEDIUM`
            break;
        case 2:
            menu.difficultySpan.innerHTML = `HARD`
            break;
        default:
            break;
    }
})

//BACK
menu.backButton.addEventListener('click', () => {
    menu.firstMenu.style.display = 'block';
    menu.optionsMenu.style.display = 'none';
})