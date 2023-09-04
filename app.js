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

    initialStatsDiv.append(attackDiceDiv);
    
    characterSheetDiv.append(characterNameDiv, characterTypeDiv, initialStatsDiv);

    const createCharacterSheetDiv = document.getElementById('create-character-sheet');
    createCharacterSheetDiv.before(characterSheetDiv);
}

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function addOptions(element, numOfOptions) {
    for (let i = 0; i <= numOfOptions; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.append(`${i}`);
        element.appendChild(option);
        console.log(option);
    }
}