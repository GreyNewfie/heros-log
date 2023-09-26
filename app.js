const addCharacterButton = document.getElementById('add-character-button');

addCharacterButton.addEventListener('click', () => {
    characterSheet();
});

const characterSheet = (character) => {
    if (character) {
        uniqueId = character.characterId;
        createCharacterSheet(uniqueId);
        createExistingCharacter(character);
    } else {
        uniqueId = Date.now();
        createCharacterSheet(uniqueId);
    }

    function createCharacterSheet(uniqueId) {
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
            if (!character) {
                character = createNewCharacter();
            }
            if (isCurrentCharacter(characters, character.characterId)) {
                const storedCharacter = getExistingCharacter(characters, character);
                updateCharacter(storedCharacter, character.characterId);

            } else {
                addCharacter(character);
            }
        });
    
        //Killed button
        const characterKilledBtn = document.createElement('button');
        characterKilledBtn.setAttribute('class', 'killed-button');
        const characterKilledSpan = document.createElement('span');
        characterKilledSpan.setAttribute('class', 'material-symbols-outlined');
        characterKilledSpan.append('skull');
        characterKilledBtn.append(characterKilledSpan);
        characterKilledBtn.addEventListener('click', (event) => characterDeath(event, characters, character));
    
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
        setAttributes(attackDiceSelect, {'name': 'attack-dice', 'id': `attack-dice-${uniqueId}`});
        const attackDiceOption = document.createElement('option');
        addNumOptions(attackDiceSelect, 6);
        attackDiceDiv.append(attackDiceP, attackDiceSelect)
    
        //Defend dice select
        const defendDiceDiv = document.createElement('div');
        const defendDiceP = document.createElement('p');
        defendDiceP.append('Defend Dice');
        defendDiceDiv.append(defendDiceP);
        const defendDiceSelect = document.createElement('select');
        setAttributes(defendDiceSelect, {'name': 'defend-dice', 'id': `defend-dice-${uniqueId}`});
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
        setAttributes(startingBodyPointsSelect, {'name': 'starting-body-points-number', 'id': `starting-body-pts-${uniqueId}`});
        addNumOptions(startingBodyPointsSelect, 8);
        startingBodyPointsDiv.append(startingBodyPointsP, startingBodyPointsSelect);    
    
        //Mind points select
        const startingMindPointsDiv = document.createElement('div');
        setAttributes(startingMindPointsDiv, {'id': 'starting-mind-points', 'class': 'starting-mind-points'});
        const startingMindPointsP = document.createElement('p');
        startingMindPointsP.append('Mind');
        const startingMindPointsSelect = document.createElement('select');
        setAttributes(startingMindPointsSelect, {'name': 'starting-mind-points-number', 'id': `starting-mind-pts-${uniqueId}`});
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
        characterArmorLabel.append('Armor');
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
        currentBodyPointsNumP.setAttribute('id', `current-body-pts-num-${uniqueId}`);
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
        currentGoldCoinsNumP.setAttribute('id', `current-gold-coins-num-${uniqueId}`);
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
        const potionsItemsTextarea = document.createElement('textarea');
        setAttributes(potionsItemsTextarea, {'name': 'potions-items', 'id': `potions-items-${uniqueId}`, 'cols': '30', 'rows': '10', 'placeholder': 'Healing, invisible, etc.'});
        potionsItemsDiv.append(potionsItemsLabel, potionsItemsTextarea);
    
        //Append elements to character sheet
        currentStatsTrackerDiv.append(currentBodyPointsDiv, currentGoldCoinsDiv);
        CharacterNameTypeDiv.append(characterNameDiv, characterTypeDiv);
        initialStatsDiv.append(attackDiceDiv, defendDiceDiv, startingPointsDiv);
        characterWeaponsArmorDiv.append(characterWeaponsDiv, characterArmorDiv);
        characterSheetDiv.append(CharacterNameTypeDiv, characterButtonsDiv, initialStatsDiv, characterWeaponsArmorDiv, currentStatsTrackerDiv, potionsItemsDiv);
    
        const createCharacterSheetDiv = document.getElementById('create-character-sheet');
        createCharacterSheetDiv.before(characterSheetDiv);
    }

    function getCharacterName(characterId) {
        return `character-name-${characterId}`;
    }

    function getCharacterType(characterId) {
        return `character-type-${characterId}`;
    }

    function getAttackDice(characterId) {
        return `attack-dice-${characterId}`;
    }

    function getDefendDice(characterId) {
        return `defend-dice-${characterId}`;
    }

    function getStartBodyPoints(characterId) {
        return `starting-body-pts-${characterId}`;
    }

    function getStartMindPoints(characterId) {
        return `starting-mind-pts-${characterId}`;
    }

    function getWeapons(characterId) {
        return `character-weapons-${characterId}`;
    }

    function getArmor(characterId) {
        return `character-armor-${characterId}`;
    }

    function getCurrentBodyPoints(characterId) {
        return `current-body-pts-num-${characterId}`;
    }

    function getCurrentGoldCoins(characterId) {
        return `current-gold-coins-num-${characterId}`
    }

    function getPotionsAndItems(characterId) {
        return `potions-items-${characterId}`;
    }

    const createNewCharacter = () => {
        this.characterId = uniqueId;

        const nameInput = document.getElementById(getCharacterName(uniqueId));
        const typeSelect = document.getElementById(getCharacterType(uniqueId));
        const attDiceSel = document.getElementById(getAttackDice(uniqueId));
        const defDiceSel = document.getElementById(getDefendDice(uniqueId));
        const startBodyPtsSel = document.getElementById(getStartBodyPoints(uniqueId));
        const startMindPtsSel = document.getElementById(getStartMindPoints(uniqueId));
        const weaponsInput = document.getElementById(getWeapons(uniqueId));
        const armorInput = document.getElementById(getArmor(uniqueId));
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(uniqueId));
        const curGoldCoinsNum = document.getElementById(getCurrentGoldCoins(uniqueId));
        const potionsItemsText = document.getElementById(getPotionsAndItems(uniqueId));

        this.name = nameInput.value;
        this.type = typeSelect.value;
        this.attackDice = attDiceSel.value;
        this.defendDice = defDiceSel.value;
        this.startBodyPts = startBodyPtsSel.value;
        this.startMindPts = startMindPtsSel.value;
        this.weapons = weaponsInput.value;
        this.armor = armorInput.value;
        this.curBodyPts = curBodyPtsInput.textContent;
        this.goldCoins = curGoldCoinsNum.textContent;
        this.potionsAndItems = potionsItemsText.value;
        return({characterId, name, type, attackDice, defendDice, startBodyPts, startMindPts, weapons, armor, curBodyPts, goldCoins, potionsAndItems});
    }

    function createExistingCharacter(character) {
        const nameInput = document.getElementById(getCharacterName(character.characterId));
        const typeSelect = document.getElementById(getCharacterType(character.characterId));
        const attDiceSel = document.getElementById(getAttackDice(character.characterId));
        const defDiceSel = document.getElementById(getDefendDice(character.characterId));
        const startBodyPtsSel = document.getElementById(getStartBodyPoints(character.characterId));
        const startMindPtsSel = document.getElementById(getStartMindPoints(character.characterId));
        const weaponsInput = document.getElementById(getWeapons(character.characterId));
        const armorInput = document.getElementById(getArmor(character.characterId));
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(character.characterId));
        const curGoldCoinsNum = document.getElementById(getCurrentGoldCoins(character.characterId));
        const potionsItemsText = document.getElementById(getPotionsAndItems(character.characterId));

        nameInput.value = character.name;
        typeSelect.value = character.type;
        attDiceSel.value = character.attackDice;
        defDiceSel.value = character.defendDice;
        startBodyPtsSel.value = character.startBodyPts;
        startMindPtsSel.value = character.startMindPts;
        weaponsInput.value = character.weapons;
        armorInput.value = character.armor;
        curBodyPtsInput.textContent = character.curBodyPts;
        curGoldCoinsNum.textContent = character.goldCoins;
        potionsItemsText.textContent = character.potionsAndItems;
    }

    function updateCharacter(storedCharacter, characterId) {
        const typeSelect = document.getElementById(getCharacterType(characterId));
        const attDiceSel = document.getElementById(getAttackDice(characterId));
        const defDiceSel = document.getElementById(getDefendDice(characterId));
        const startBodyPtsSel = document.getElementById(getStartBodyPoints(characterId));
        const startMindPtsSel = document.getElementById(getStartMindPoints(characterId));
        const weaponsInput = document.getElementById(getWeapons(characterId));
        const armorInput = document.getElementById(getArmor(characterId));
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(characterId));
        const curGoldCoinsNum = document.getElementById(getCurrentGoldCoins(characterId));
        const potionsItemsText = document.getElementById(getPotionsAndItems(characterId));
        const nameInput = document.getElementById(getCharacterName(characterId));

        storedCharacter.type = typeSelect.value;
        storedCharacter.attackDice = attDiceSel.value;
        storedCharacter.defendDice = defDiceSel.value;
        storedCharacter.startBodyPts = startBodyPtsSel.value;
        storedCharacter.startMindPts = startMindPtsSel.value;
        storedCharacter.weapons = weaponsInput.value;
        storedCharacter.armor = armorInput.value;
        storedCharacter.curBodyPts = curBodyPtsInput.textContent;
        storedCharacter.goldCoins = curGoldCoinsNum.textContent;
        storedCharacter.potionsAndItems = potionsItemsText.value;
        storedCharacter.name = nameInput.value;

        storeCharacters(characters);
    }
}

if (localStorage.getItem('characterList') === null) {
    characters = [];
} else {
    characters = JSON.parse(localStorage.getItem('characterList'));
    characters.forEach(character => {
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

function isCurrentCharacter(characters, characterId) {
    return characters.some(character => character.characterId === characterId);
}

function getExistingCharacter(characters, character) {
    const characterId = character.characterId;
    return foundCharacter = characters.find(character => {
        return character.characterId === characterId;
    });
}

function getCharacterIndex(characters, characterId) {
    return characters.findIndex((character) => {
        return character.characterId === characterId
    });
}

function characterDeath(event, characters, character) {
    const targetCharSheet = event.target.parentNode.parentNode.parentNode;
    targetCharSheet.remove();
    const index = getCharacterIndex(characters, character.characterId);
    characters.splice(index, 1);
    storeCharacters(characters);
}

function decreaseNumber(element, currentNum) {
    const testNum = parseInt(currentNum);
    return element.textContent = testNum === 0 ? testNum : testNum - 1;
}

function increaseNumber(element, currentNum, maxNum) {
    const testNum = parseInt(currentNum);
    return element.textContent = testNum < maxNum || !maxNum ? testNum + 1 : testNum;
}

