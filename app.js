const addCharacterButton = document.getElementById('add-character-button');

addCharacterButton.addEventListener('click', () => {
    characterSheet();
});

const characterSheet = (character) => {
    if (character) {
        uniqueId = character.characterId;
    } else {
        uniqueId = Date.now();
    }

    const characterSheetDiv = document.createElement('div');
    characterSheetDiv.setAttribute('class', 'character-sheet');

    //Character name & type container
    const CharacterNameTypeDiv = document.createElement('div');
    CharacterNameTypeDiv.setAttribute('class', 'characterNameTypeContainer');

    //Character name input field
    const characterNameDiv = document.createElement('div');
    const characterNameLabel = document.createElement('label');
    characterNameLabel.setAttribute('for', `character-name-${uniqueId}`);
    characterNameLabel.append('Name');
    const characterNameInput = document.createElement('input');
    setAttributes(characterNameInput, {'type': 'text', 'id': `character-name-${uniqueId}`, 'name': 'character-name', 'required': ''});
    characterNameDiv.append(characterNameLabel, characterNameInput);
    
    //Character type select
    const characterTypeDiv = document.createElement('div');
    const characterTypeLabel = document.createElement('label');
    characterTypeLabel.setAttribute('for', `character-type-${uniqueId}`);
    characterTypeLabel.append('Character');
    const characterTypeSelect = document.createElement('select');
    setAttributes(characterTypeSelect, {'id': `character-type-${uniqueId}`, 'name': 'character-type', 'required': ''});
    addTypeOptions(characterTypeSelect, {'default': '- Select Option -', 'barabarian': 'Barbarian', 'wizard': 'Wizard', 'elf': 'Elf', 'dwarf': 'Dwarf'});

    characterTypeDiv.append(characterTypeLabel, characterTypeSelect);

    //Character buttons div
    const characterButtonsDiv = document.createElement('div');
    characterButtonsDiv.setAttribute('class', 'char-btns');

    //Save button
    const characterSaveBtn = document.createElement('button');
    characterSaveBtn.setAttribute('class', 'save-button');
    const characterSaveSpan = document.createElement('span');
    characterSaveSpan.append('Save');
    characterSaveBtn.append(characterSaveSpan);
    characterSaveBtn.addEventListener('click', (event) => {
        const character = createCharacter();
        isCurrentCharacter(characters, character.characterId);
        addCharacter(character);
    });

    //Killed button
    const characterKilledBtn = document.createElement('button');
    characterKilledBtn.setAttribute('class', 'killed-button');
    const characterKilledSpan = document.createElement('span');
    characterKilledSpan.setAttribute('class', 'material-symbols-outlined');
    characterKilledSpan.append('skull');
    characterKilledBtn.append(characterKilledSpan);
    characterKilledBtn.addEventListener('click', characterDied);

    characterButtonsDiv.append(characterSaveBtn, characterKilledBtn);

    //Initial attack dice, defend dice and starting body and mind points
    const initialStatsDiv = document.createElement('div');
    initialStatsDiv.setAttribute('class', 'initial-stats');

    //Attack dice select
    const attackDiceDiv = document.createElement('div');
    const attackDiceP = document.createElement('p');
    attackDiceP.append('Attack Dice');
    attackDiceDiv.append(attackDiceP);
    const attackDiceSelect = document.createElement('select');
    setAttributes(attackDiceSelect, {'id': `attack-dice-${uniqueId}`, 'class': 'numeric-tracker'});
    const attackDiceOption = document.createElement('option');
    addNumOptions(attackDiceSelect, 6);
    attackDiceDiv.append(attackDiceP, attackDiceSelect)

    //Defend dice select
    const defendDiceDiv = document.createElement('div');
    const defendDiceP = document.createElement('p');
    defendDiceP.append('Defend');
    defendDiceDiv.append(defendDiceP);
    const defendDiceSelect = document.createElement('select');
    setAttributes(defendDiceSelect, {'name': 'defend-dice-number', 'id': `defend-dice-number-${uniqueId}`});
    addNumOptions(defendDiceSelect, 6);
    defendDiceDiv.append(defendDiceP, defendDiceSelect);

    //Starting body and mind points div
    const startingPointsDiv = document.createElement('div');
    startingPointsDiv.setAttribute('class', 'starting-points');
    const startingPointsP = document.createElement('p');
    startingPointsP.append('Starting Points');

    //Body points select
    const startingBodyPointsDiv = document.createElement('div');
    setAttributes(startingBodyPointsDiv, {'id': `starting-body-points-${uniqueId}`, 'class': 'numeric-tracker'});
    const startingBodyPointsP = document.createElement('p');
    startingBodyPointsP.append('Body');
    const startingBodyPointsSelect = document.createElement('select');
    setAttributes(startingBodyPointsSelect, {'name': 'starting-body-points-number', 'id': `starting-body-points-number-${uniqueId}`});
    addNumOptions(startingBodyPointsSelect, 8);
    startingBodyPointsDiv.append(startingBodyPointsP, startingBodyPointsSelect);    

    //Mind points select
    const startingMindPointsDiv = document.createElement('div');
    setAttributes(startingMindPointsDiv, {'id': 'starting-mind-points', 'class': 'starting-mind-points'});
    const startingMindPointsP = document.createElement('p');
    startingMindPointsP.append('Mind');
    const startingMindPointsSelect = document.createElement('select');
    setAttributes(startingMindPointsSelect, {'name': 'starting-mind-points-number', 'id': `starting-mind-points-number-${uniqueId}`});
    addNumOptions(startingMindPointsSelect, 6);
    startingMindPointsDiv.append(startingMindPointsP, startingMindPointsSelect);
    startingPointsDiv.append(startingPointsP, startingBodyPointsDiv, startingMindPointsDiv);

    //Character weapons and armor container
    const characterWeaponsArmorDiv = document.createElement('div');
    characterWeaponsArmorDiv.setAttribute('class', 'character-weapons-armor-container');

    //Character weapons input
    const characterWeaponsDiv = document.createElement('div');
    const characterWeaponsLabel = document.createElement('label');
    characterWeaponsLabel.append('Weapons');
    characterWeaponsLabel.setAttribute('for', `character-weapons-${uniqueId}`)
    const characterWeaponsInput = document.createElement('input');
    setAttributes(characterWeaponsInput, {'type': 'text', 'id': `character-weapons-${uniqueId}`, 'name': 'character-weapons'});
    characterWeaponsDiv.append(characterWeaponsLabel, characterWeaponsInput);

    //Character armor input
    const characterArmorDiv = document. createElement('div');
    const characterArmorLabel = document.createElement('label');
    characterArmorLabel.append('Character Armor');
    characterArmorLabel.setAttribute('for', `character-armor-${uniqueId}`);
    const characterArmorInput = document.createElement('input');
    setAttributes(characterArmorInput, {'type': 'text', 'id': `character-armor-${uniqueId}`, 'name': 'character-armor'});
    characterArmorDiv.append(characterArmorLabel, characterArmorInput);

    //Current stats tracker div
    const currentStatsTrackerDiv = document.createElement('div');
    currentStatsTrackerDiv.setAttribute('class', 'current-stats-tracker');

    //Current body points div
    const currentBodyPointsDiv = document.createElement('div');
    setAttributes(currentBodyPointsDiv, {'id': `current-body-points-${uniqueId}`, 'class': 'numeric-tracker'});
    const currentBodyPointsP = document.createElement('p');
    currentBodyPointsP.append('Body Points');
    const currentBodyPointsNumDiv = document.createElement('div');
    const currentBodyPointsNumP = document.createElement('p');
    currentBodyPointsNumP.append('0');
    const currentBodyPointsNegBtn = document.createElement('button');
    currentBodyPointsNegBtn.append('-');
    currentBodyPointsNegBtn.addEventListener('click',  () => {
        decreaseNumber(currentBodyPointsNumP, currentBodyPointsNumP.textContent);
    });
    const currentBodyPointsPosBtn = document.createElement('button');
    currentBodyPointsPosBtn.append('+');
    currentBodyPointsPosBtn.addEventListener('click', () => {
        increaseNumber(currentBodyPointsNumP, currentBodyPointsNumP.textContent, 12);
    });
    currentBodyPointsNumDiv.append(currentBodyPointsNegBtn, currentBodyPointsNumP, currentBodyPointsPosBtn);
    currentBodyPointsDiv.append(currentBodyPointsP, currentBodyPointsNumDiv);

    //Current gold coins div
    const currentGoldCoinsDiv = document.createElement('div');
    setAttributes(currentGoldCoinsDiv, {'id': `current-gold-coins-${uniqueId}`, 'class': 'numeric-tracker'});
    const currentGoldCoinsP = document.createElement('p');
    currentGoldCoinsP.append('Gold Coins');
    const currentGoldCoinsNumDiv = document.createElement('div');
    const currentGoldCoinsNegBtn = document.createElement('button');
    currentGoldCoinsNegBtn.append('-');
    currentGoldCoinsNegBtn.addEventListener('click', () => {
        decreaseNumber(currentGoldCoinsNumP, currentGoldCoinsNumP.textContent);
    });
    const currentGoldCoinsNumP = document.createElement('p');
    currentGoldCoinsNumP.append('0');
    const currentGoldCoinsPosBtn = document.createElement('button');
    currentGoldCoinsPosBtn.append('+');
    currentGoldCoinsPosBtn.addEventListener('click', () => {
        increaseNumber(currentGoldCoinsNumP, currentGoldCoinsNumP.textContent);
    });
    currentGoldCoinsNumDiv.append(currentGoldCoinsNegBtn, currentGoldCoinsNumP, currentGoldCoinsPosBtn);
    currentBodyPointsDiv.append(currentGoldCoinsP, currentGoldCoinsNumDiv);

    //Potions Items Div
    const potionsItemsDiv = document.createElement('div');
    potionsItemsDiv.setAttribute('class', 'potions-items');
    const potionsItemsLabel = document.createElement('label');
    potionsItemsLabel.setAttribute('for', `potions-items-${uniqueId}`);
    potionsItemsLabel.append('Potions & Other Items');
    const potionsItemsText = document.createElement('textarea');
    setAttributes(potionsItemsText, {'name': 'potions-items', 'id': `potions-items-${uniqueId}`, 'cols': '30', 'rows': '10', 'placeholder': 'Healing, invisible, etc.'});
    potionsItemsDiv.append(potionsItemsLabel, potionsItemsText);

    //Append elements to character sheet
    currentStatsTrackerDiv.append(currentBodyPointsDiv, currentGoldCoinsDiv);
    CharacterNameTypeDiv.append(characterNameDiv, characterTypeDiv);
    initialStatsDiv.append(attackDiceDiv, defendDiceDiv, startingPointsDiv);
    characterWeaponsArmorDiv.append(characterWeaponsDiv, characterArmorDiv);
    characterSheetDiv.append(CharacterNameTypeDiv, characterButtonsDiv, initialStatsDiv, characterWeaponsArmorDiv, currentStatsTrackerDiv, potionsItemsDiv);

    const createCharacterSheetDiv = document.getElementById('create-character-sheet');
    createCharacterSheetDiv.before(characterSheetDiv);

    if (character) {
        characterNameInput.value = character.name;
        characterTypeSelect.value = character.type;
        attackDiceSelect.value = character.attackDice;
        defendDiceSelect.value = character.defendDice;
        startingBodyPointsSelect.value = character.startBodyPts;
        startingMindPointsSelect.value = character.startMindPts;
        characterWeaponsInput.value = character.weapons;
        characterArmorInput.value = character.armor;
        currentBodyPointsNumP.textContent = character.curBodyPts;
        currentGoldCoinsNumP.textContent = character.goldCoins;
        potionsItemsText.value = character.potionsAndItems;
    }

    const createCharacter = () => {
        this.characterId = uniqueId;
        this.name = characterNameInput.value;
        this.type = characterTypeSelect.value;
        this.attackDice = attackDiceSelect.value;
        this.defendDice = defendDiceSelect.value;
        this.startBodyPts = startingBodyPointsSelect.value;
        this.startMindPts = startingMindPointsSelect.value;
        this.weapons = characterWeaponsInput.value;
        this.armor = characterArmorInput.value;
        this.curBodyPts = currentBodyPointsNumP.textContent;
        this.goldCoins = currentGoldCoinsNumP.textContent;
        this.potionsAndItems = potionsItemsText.value;
        return({characterId, name, type, attackDice, defendDice, startBodyPts, startMindPts, weapons, armor, curBodyPts, goldCoins, potionsAndItems});
    }
}

if (localStorage.getItem('characterList') === null) {
    characters = [];
} else {
    characters = JSON.parse(localStorage.getItem('characterList'));
    console.log('Characters are ' + characters);
    characters.forEach(character => {
        console.log(character);
        characterSheet(character);
    });
}

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function addNumOptions(element, maxValue) {
    for (let i = 0; i <= maxValue; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', i);
        option.append(`${i}`);
        element.appendChild(option);
    }
}

function addTypeOptions(parent, types) {
    for (let type in types) {
        const typeOption = document.createElement('option');
        typeOption.setAttribute('value', type);
        typeOption.append(`${types[type]}`);
        parent.appendChild(typeOption);
    }
}

function addCharacter(character) {
    characters.push(character);
    storeCharacters(characters);
}

function storeCharacters(characters) {
    localStorage.setItem('characterList', JSON.stringify(characters));
    console.log(JSON.stringify(characters));
}

function isCurrentCharacter(characters, characterId) {
    console.log('isCurrentCharacter Check');
    return characters.forEach(character => {
        console.log(`Checking ${characterId} and ${character.characterId}`);
        return characterId === character.name;
    });
}

function characterDied(event) {
    const firstParent = event.target.parentNode;
    const secondParent = firstParent.parentNode;
    const targetCharSheet = secondParent.parentNode;
    targetCharSheet.remove();
}

function decreaseNumber(element, currentNum) {
    const testNum = parseInt(currentNum);
    return element.textContent = testNum === 0 ? testNum : testNum - 1;
}

function increaseNumber(element, currentNum, maxNum) {
    const testNum = parseInt(currentNum);
    return element.textContent = testNum < maxNum || !maxNum ? testNum + 1 : testNum;
}