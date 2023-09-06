const addCharacterButton = document.getElementById('add-character-button');

addCharacterButton.addEventListener('click', () => {
    newCharacterSheet();
})

const newCharacterSheet = () => {
    const characterSheetDiv = document.createElement('div');
    characterSheetDiv.setAttribute('class', 'character-sheet');

    //Character name input field
    const characterNameDiv = document.createElement('div');
    const characterNameLabel = document.createElement('label');
    characterNameLabel.setAttribute('for', 'character-name');
    characterNameLabel.append('Name');
    const characterNameInput = document.createElement('input');
    setAttributes(characterNameInput, {'type': 'text', 'id': 'character-name', 'name': 'character-name', 'required': ''});
    characterNameDiv.append(characterNameLabel, characterNameInput);
    
    //Character type input field
    const characterTypeDiv = document.createElement('div');
    const characterTypeLabel = document.createElement('label');
    characterTypeLabel.setAttribute('for', 'character-type');
    characterTypeLabel.append('Character');
    const characterTypeInput = document.createElement('input');
    setAttributes(characterTypeInput, {'type': 'text', 'id': 'character-type', 'name': 'character-type', 'required': ''});
    characterTypeDiv.append(characterTypeLabel, characterTypeInput);

    //Character killed button
    const characterKilledBtnDiv = document.createElement('div');
    const characterKilledBtn = document.createElement('button');
    characterKilledBtn.setAttribute('class', 'killed-button');
    const characterKilledSpan = document.createElement('span');
    characterKilledSpan.setAttribute('class', 'material-symbols-outlined');
    characterKilledSpan.append('skull');
    characterKilledBtn.append(characterKilledSpan);
    characterKilledBtnDiv.append(characterKilledBtn);

    //Initial attack dice, defend dice and starting body and mind points
    const initialStatsDiv = document.createElement('div');
    initialStatsDiv.setAttribute('class', 'initial-stats');

    //Attack dice select
    const attackDiceDiv = document.createElement('div');
    const attackDiceP = document.createElement('p');
    attackDiceP.append('Attack Dice');
    attackDiceDiv.append(attackDiceP);
    const attackDiceSelect = document.createElement('select');
    setAttributes(attackDiceSelect, {'id': 'attack-dice', 'class': 'numeric-tracker'});
    const attackDiceOption = document.createElement('option');
    addOptions(attackDiceSelect, 6);
    attackDiceDiv.append(attackDiceP, attackDiceSelect)

    //Defend dice select
    const defendDiceDiv = document.createElement('div');
    const defendDiceP = document.createElement('p');
    defendDiceP.append('Defend');
    defendDiceDiv.append(defendDiceP);
    const defendDiceSelect = document.createElement('select');
    setAttributes(defendDiceSelect, {'name': 'defend-dice-number', 'id': 'defend-dice-number'});
    addOptions(defendDiceSelect, 6);
    defendDiceDiv.append(defendDiceP, defendDiceSelect);

    //Starting body and mind points div
    const startingPointsDiv = document.createElement('div');
    startingPointsDiv.setAttribute('class', 'starting-points');
    const startingPointsP = document.createElement('p');
    startingPointsP.append('Starting Points');

    //Body points select
    const startingBodyPointsDiv = document.createElement('div');
    setAttributes(startingBodyPointsDiv, {'id': 'starting-body-points', 'class': 'numeric-tracker'});
    const startingBodyPointsP = document.createElement('p');
    startingBodyPointsP.append('Body');
    const startingBodyPointsSelect = document.createElement('select');
    setAttributes(startingBodyPointsSelect, {'name': 'starting-body-points-number', 'id': 'starting-body-points-number'});
    addOptions(startingBodyPointsSelect, 8);
    startingBodyPointsDiv.append(startingBodyPointsP, startingBodyPointsSelect)    

    //Mind points select
    const startingMindPointsDiv = document.createElement('div');
    setAttributes(startingMindPointsDiv, {'id': 'starting-mind-points', 'class': 'starting-mind-points'});
    const startingMindPointsP = document.createElement('p');
    startingMindPointsP.append('Mind');
    const startingMindPointsSelect = document.createElement('select');
    setAttributes(startingMindPointsSelect, {'name': 'starting-mind-points-number', 'id': 'starting-mind-points-number'});
    addOptions(startingMindPointsSelect, 6);
    startingMindPointsDiv.append(startingMindPointsP, startingMindPointsSelect);

    startingPointsDiv.append(startingPointsP, startingBodyPointsDiv, startingMindPointsDiv);

    //Append elements to each section and then to character sheet
    initialStatsDiv.append(attackDiceDiv, defendDiceDiv);
    characterSheetDiv.append(characterNameDiv, characterTypeDiv, characterKilledBtnDiv, initialStatsDiv, startingPointsDiv);

    const createCharacterSheetDiv = document.getElementById('create-character-sheet');
    createCharacterSheetDiv.before(characterSheetDiv);
}

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function addOptions(element, maxValue) {
    for (let i = 0; i <= maxValue; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.append(`${i}`);
        element.appendChild(option);
    }
}