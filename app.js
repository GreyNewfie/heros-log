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
        CharacterNameTypeDiv.setAttribute('class', 'character-name-type-container');
    
        //Character name input field
        const characterNameDiv = document.createElement('div');
        const characterNameLabel = document.createElement('label');
        characterNameLabel.setAttribute('for', `character-name-${uniqueId}`);
        characterNameLabel.append('Name');
        const characterNameInput = document.createElement('input');
        setAttributes(characterNameInput, {type: 'text', id: `character-name-${uniqueId}`, name: 'character-name', required: ''});
        characterNameDiv.append(characterNameLabel, characterNameInput);
        
        //Character type select
        const characterTypeDiv = document.createElement('div');
        createCharacterTypeUi(characterTypeDiv, uniqueId);
    
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
            if (isCurrentCharacter(characters, character)) {
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
    
        // Initial attack dice, defend dice and starting body and mind points
        const initialStatsDiv = document.createElement('div');
        initialStatsDiv.setAttribute('class', 'initial-stats');
    
        // Attack dice UI
        const attackDiceUi = createDiceUi('Attack Dice' ,uniqueId, 6);
    
        // Defend dice UI
        const defendDiceUi = createDiceUi('Defend Dice', uniqueId, 6);
    
        // Starting body and mind points div
        const startingPointsDiv = document.createElement('div');
        startingPointsDiv.setAttribute('class', 'starting-points');

        const startingPointsHeader = document.createElement('h4');
        startingPointsHeader.textContent = 'Starting Points';
        startingPointsDiv.appendChild(startingPointsHeader);
    
        // Starting body points UI
        const startBodyPtsUi = createDiceUi('Body', uniqueId, 12);
        startingPointsDiv.appendChild(startBodyPtsUi);
    
        // Starting Mind points UI
        const startMindPtsUi = createDiceUi('Mind', uniqueId, 8);
        startingPointsDiv.appendChild(startMindPtsUi);

        // Current stats tracker div
        const currentStatsTrackerDiv = document.createElement('div');
        currentStatsTrackerDiv.setAttribute('class', 'body-points-gold-tracker');
    
        // Current body points div
        const bodyPtsUi = createStatTrackerUi('Body Points', uniqueId);
    
        // Current gold coins div
        const goldCoinsUi = createStatTrackerUi('Gold Coins', uniqueId); 
        
        // Equipped Items container
        const equippedItemsSection = document.createElement('div');
        equippedItemsSection.setAttribute('class', 'character-equipped-items-section');

        // Equipped items UI
        const equippedItemsUi = createEquippedItemsUi(uniqueId);

        equippedItemsSection.appendChild(equippedItemsUi);

        // Character weapons & armor and potions & items container
        const WeaponsArmorItemsContainer = document.createElement('div');
        WeaponsArmorItemsContainer.setAttribute('class', 'weapons-armor-items-container');

        // Character Weapons and Armor UI
        const weaponsAndArmorUi = createWeaponsAndArmorUi(uniqueId);
            
        // Potions and Items UI
        const potionsAndItems = createPotionsItemsUi(uniqueId);

        WeaponsArmorItemsContainer.append(weaponsAndArmorUi, potionsAndItems);
    
        //Append elements to character sheet
        CharacterNameTypeDiv.append(characterNameDiv, characterTypeDiv);
        initialStatsDiv.append(attackDiceUi, defendDiceUi, startingPointsDiv);
        currentStatsTrackerDiv.append(bodyPtsUi, goldCoinsUi);

        characterSheetDiv.append(CharacterNameTypeDiv, characterButtonsDiv, initialStatsDiv, currentStatsTrackerDiv, equippedItemsSection, WeaponsArmorItemsContainer);
        
        // Postions the Add Character sheet after character Sheets
        const createCharacterSheet = document.getElementById('create-character-sheet');
        createCharacterSheet.before(characterSheetDiv);
    }

    function getCharacterName(characterId) {
        return `character-name-${characterId}`;
    }

    function getCharacterType(characterId) {
        return `character-${characterId}-type`;
    }

    function getAttackDice(characterId) {
        return `attack-dice-${characterId}`;
    }

    function getDefendDice(characterId) {
        return `defend-dice-${characterId}`;
    }

    function getStartBodyPoints(characterId) {
        return `body-${characterId}`;
    }

    function getStartMindPoints(characterId) {
        return `mind-${characterId}`;
    }

    function getWeaponsAndArmor(characterId) {
        return `character-${characterId}-weapons-armor`
    }

    function getWeapons(characterId) {
        return `character-${characterId}-weapons`;
    }

    function getArmor(characterId) {
        return `character-${characterId}-armor`;
    }

    function getCurrentBodyPoints(characterId) {
        return `body-points-${characterId}`;
    }

    function getCurrentGoldCoins(characterId) {
        return `gold-coins-${characterId}`
    }

    function getPotionsAndItems(characterId) {
        return `character-${characterId}-potions-items`;
    }

    const createNewCharacter = () => {
        this.characterId = uniqueId;

        const nameInput = document.getElementById(getCharacterName(uniqueId));
        const typeSelect = document.getElementById(getCharacterType(uniqueId));
        const attDice = document.getElementById(getAttackDice(uniqueId));
        const defDice = document.getElementById(getDefendDice(uniqueId));
        const startBodyPtsInput = document.getElementById(getStartBodyPoints(uniqueId));
        const startMindPtsInput = document.getElementById(getStartMindPoints(uniqueId));
        const weaponsAndArmorList = document.getElementById(getWeaponsAndArmor(uniqueId)).querySelectorAll('li');
        const curBodyPts = document.getElementById(getCurrentBodyPoints(uniqueId));
        const curGoldCoins = document.getElementById(getCurrentGoldCoins(uniqueId));
        const potionsItemsList = document.getElementById(getPotionsAndItems(uniqueId)).querySelectorAll('li');

        this.name = nameInput.value;
        this.type = typeSelect.value;
        this.attackDice = attDice.value;
        this.defendDice = defDice.value;
        this.startBodyPts = startBodyPtsInput.value;
        this.startMindPts = startMindPtsInput.value;
        this.weaponsAndArmor = createCharacterList(weaponsAndArmorList);
        this.bodyPts = curBodyPts.value;
        this.goldCoins = curGoldCoins.value;
        this.potionsAndItems = createCharacterList(potionsItemsList);
        return({characterId, name, type, attackDice, defendDice, startBodyPts, startMindPts, bodyPts, goldCoins, weaponsAndArmor, potionsAndItems});
    }

    function createExistingCharacter(character) {
        const nameInput = document.getElementById(getCharacterName(character.characterId));
        const typeSelect = document.getElementById(getCharacterType(character.characterId));
        const attDice = document.getElementById(getAttackDice(character.characterId));
        const defDice = document.getElementById(getDefendDice(character.characterId));
        const startBodyPts = document.getElementById(getStartBodyPoints(character.characterId));
        const startMindPts = document.getElementById(getStartMindPoints(character.characterId));
        const weaponsAndArmorList = document.getElementById(getWeaponsAndArmor(uniqueId));
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(character.characterId));
        const curGoldCoins = document.getElementById(getCurrentGoldCoins(character.characterId));
        const potionsItemsList= document.getElementById(getPotionsAndItems(character.characterId));

        nameInput.value = character.name;
        typeSelect.value = character.type;
        attDice.value = character.attackDice;
        defDice.value = character.defendDice;
        startBodyPts.value = character.startBodyPts;
        startMindPts.value = character.startMindPts;
        addItemsToCharacter(weaponsAndArmorList, character.weaponsAndArmor);
        curBodyPtsInput.value = character.bodyPts;
        curGoldCoins.value = character.goldCoins;
        addItemsToCharacter(potionsItemsList, character.potionsAndItems);
    }

    function updateCharacter(storedCharacter, characterId) {
        const typeSelect = document.getElementById(getCharacterType(characterId));
        const attDiceSel = document.getElementById(getAttackDice(characterId));
        const defDiceSel = document.getElementById(getDefendDice(characterId));
        const startBodyPtsInput = document.getElementById(getStartBodyPoints(characterId));
        const startMindPtsInput = document.getElementById(getStartMindPoints(characterId));
        const weaponsAndArmorList = document. getElementById(getWeaponsAndArmor(characterId)).querySelectorAll('li');
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(characterId));
        const curGoldCoins = document.getElementById(getCurrentGoldCoins(characterId));
        const potionsItemsList = document.getElementById(getPotionsAndItems(characterId)).querySelectorAll('li');
        const nameInput = document.getElementById(getCharacterName(characterId));

        storedCharacter.type = typeSelect.value;
        storedCharacter.attackDice = attDiceSel.value;
        storedCharacter.defendDice = defDiceSel.value;
        storedCharacter.startBodyPts = startBodyPtsInput.value;
        storedCharacter.startMindPts = startMindPtsInput.value;
        storedCharacter.weaponsAndArmor = createCharacterList(weaponsAndArmorList);
        storedCharacter.bodyPts = curBodyPtsInput.value;
        storedCharacter.goldCoins = curGoldCoins.value;
        storedCharacter.potionsAndItems = createCharacterList(potionsItemsList);
        storedCharacter.name = nameInput.value;

        storeCharacters(characters);
    }
}

function createCharacterTypeUi(container, uniqueId) {
    const characterTypeLabel = document.createElement('label');
    characterTypeLabel.setAttribute('for', `character-${uniqueId}-type`);
    characterTypeLabel.textContent = 'Character';

    const characterTypeSelect = document.createElement('select');
    setAttributes(characterTypeSelect, {id: `character-${uniqueId}-type`, name: 'character-type', required: ''});
    addTypeOptions(characterTypeSelect, {default: '- Select Option -', barbarian: 'Barbarian', wizard: 'Wizard', elf: 'Elf', dwarf: 'Dwarf'});

    container.append(characterTypeLabel, characterTypeSelect);

    characterTypeSelect.addEventListener('change', (event) => {
        const heroTypeId = event.target.value;
        const characterId = uniqueId;
        setInitialStats(heroTypeId, characterId);
    });
}

function createDiceUi(typeOfDice, uniqueId, maxNum) {
    if (!maxNum) {
        const maxNum = 999;
    }

    const typeOfDiceArray = (typeOfDice.toLowerCase()).split(' ');
    // Setting ID attribute for multiple word descriptions & single word descriptions, ex. 'Attack Dice' & 'Body' (starting body pts)
    const diceId = typeOfDiceArray[1] ? `${typeOfDiceArray[0]}-${typeOfDiceArray[1]}-${uniqueId}` : `${typeOfDiceArray[0]}-${uniqueId}`;

    const diceContainer = document.createElement('div');

    const title = document.createElement('h4');
    title.textContent = typeOfDice;
    diceContainer.appendChild(title);

    const diceDiv = document.createElement('div');

    const dice = document.createElement('input');
    setAttributes(dice, {type: 'number', id: diceId, class: 'hero-number-input'});
    dice.value = 0;
    
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', () => increaseNumber(dice, maxNum));

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.addEventListener('click', () => decreaseNumber(dice));

    diceDiv.append(minusBtn, dice, plusBtn);
    diceContainer.appendChild(diceDiv);

    return diceContainer;
}

function createEquippedItemsUi(uniqueId) {
    const equippedItemsContainer = document.createElement('div');
    equippedItemsContainer.setAttribute('class', 'equipped-items-container');

    const characterOutlineContainer = document.createElement('div');

    const characterOutline = document.createElement('img');
    characterOutline.setAttribute('class', 'character-outline');
    characterOutline.setAttribute('src', 'images/character-outline-blk.png');
    characterOutline.setAttribute('alt', 'Simple outline of a person\'s upper body');
    characterOutlineContainer.appendChild(characterOutline);
    equippedItemsContainer.appendChild(characterOutline);

    const headItemContainer = createEquippedItemContainer('head', uniqueId);
    equippedItemsContainer.appendChild(headItemContainer);
    
    const bodyItemContainer = createEquippedItemContainer('body', uniqueId);
    equippedItemsContainer.appendChild(bodyItemContainer);

    const leftHandItemContainer = createEquippedItemContainer('left-hand', uniqueId);
    equippedItemsContainer.appendChild(leftHandItemContainer);

    const rightHandItemContainer = createEquippedItemContainer('right-hand', uniqueId);
    equippedItemsContainer.appendChild(rightHandItemContainer);

    return equippedItemsContainer;
}

function createWeaponsAndArmorUi(uniqueId) {
    const weaponsArmorContainer = document.createElement('div');
    weaponsArmorContainer.setAttribute('class', 'weapons-armor-container');

    const headerContainer = document.createElement('div');
    headerContainer.setAttribute('class', 'weapons-armor-items-header');

    const header = document.createElement('h4');
    header.textContent = 'Weapons & Armor:';
    headerContainer.appendChild(header);

    const addBtn = document.createElement('button');
    addBtn.textContent = '+';
    headerContainer.appendChild(addBtn);

    weaponsArmorContainer.appendChild(headerContainer);

    const characterWeaponsAndArmor = document.createElement('div');
    characterWeaponsAndArmor.setAttribute('class', `character-weapons-armor`);
  
    const weaponsArmorList = document.createElement('ul');
    weaponsArmorList.setAttribute('id', `character-${uniqueId}-weapons-armor`);
    characterWeaponsAndArmor.appendChild(weaponsArmorList);

    weaponsArmorContainer.appendChild(characterWeaponsAndArmor);

    addBtn.addEventListener('click', () => {
        const dialog = document.querySelector('dialog');
        createModalUi(weaponsArmorList, 'weapon', 'armor');
        dialog.showModal();
    });

    return weaponsArmorContainer;
}

function createStatTrackerUi(trackerLabel, uniqueId) {
    const labelArray = trackerLabel.toLowerCase().split(' ');

    const currentStatContainer = document.createElement('div');

    const trackerHeader = document.createElement('h4');
    trackerHeader.textContent = trackerLabel;
    currentStatContainer.appendChild(trackerHeader);

    const tracker = document.createElement('div');

    const trackerInput = document.createElement('input');
    setAttributes(trackerInput, {type: 'number', id: `${labelArray[0]}-${labelArray[1]}-${uniqueId}`, class: 'hero-number-input'});
    trackerInput.value = 0;

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.addEventListener('click', () => increaseNumber(trackerInput));

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.addEventListener('click', () => decreaseNumber(trackerInput));

    tracker.append(minusBtn, trackerInput, plusBtn);
    currentStatContainer.appendChild(tracker);

    return currentStatContainer;
}

function createPotionsItemsUi(uniqueId) {
    const potionsItemsContainer = document.createElement('div');
    potionsItemsContainer.setAttribute('class', 'potions-items-container');

    const headerContainer = document.createElement('div');
    headerContainer.setAttribute('class', 'weapons-armor-items-header');

    const potionsItemsHeader = document.createElement('h4');
    potionsItemsHeader.textContent = 'Potions & Items';
    headerContainer.appendChild(potionsItemsHeader);

    const addPotionsItemsBtn = document.createElement('button');
    addPotionsItemsBtn.textContent = '+';
    headerContainer.appendChild(addPotionsItemsBtn);

    potionsItemsContainer.appendChild(headerContainer);

    const potionsItemsListContainer = document.createElement('div');
    potionsItemsListContainer.setAttribute('class', `potions-items-list`);
  
    const potionsItemsList = document.createElement('ul');
    potionsItemsList.setAttribute('id', `character-${uniqueId}-potions-items`);
    potionsItemsListContainer.appendChild(potionsItemsList);

    potionsItemsContainer.appendChild(potionsItemsListContainer);

    addPotionsItemsBtn.addEventListener('click', () => {
        const dialog = document.querySelector('dialog');
        createModalUi(potionsItemsList, 'item', 'potion');
        dialog.showModal();
    });

    return potionsItemsContainer;
}

function createModalUi(listElement, classification, classification2) {
    const modal = document.getElementById('modal');

    const cancelModal = document.createElement('button');
    cancelModal.setAttribute('id', 'cancel-modal');
    cancelModal.textContent = 'X';
    modal.appendChild(cancelModal);

    cancelModal.addEventListener('click', () => {
        modal.close();
        clearModal();
    });

    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', 'choose-items');
    const legend = document.createElement('legend');
    classification === 'weapon' ? legend.textContent = 'Choose your weapon(s):' : legend.textContent = 'Chose your armor:';
    fieldset.appendChild(legend);

    function addItemsToList(classification) {
        const itemsToAdd = items.filter(item => item.classification === classification);

        itemsToAdd.forEach(item => {
            const inputContainer = document.createElement('div');
    
            const label = document.createElement('label');
            label.setAttribute('for', item.id);
            label.textContent = item.name;
    
            const input = document.createElement('input');
            setAttributes(input, {type: 'checkbox', id: `${item.id}`, name: `${item.id}`});
    
            inputContainer.append(input, label);
            fieldset.appendChild(inputContainer);
        });    
    }

    if (classification) {
        addItemsToList(classification);
    }

    if (classification2) {
        addItemsToList(classification2);
    }

    const submitItems = document.createElement('button');
    submitItems.textContent = 'Done';
    submitItems.setAttribute('id', 'close-modal');
    fieldset.appendChild(submitItems);

    submitItems.addEventListener('click', event => {
        modal.close();
        const selectedItems = getSelectedItems();
        addItemsToCharacter(listElement, selectedItems);
        clearModal();
    });

    modal.appendChild(fieldset);
}

function addCharacter(character) {
    characters.push(character);
    storeCharacters(characters);
}

function decreaseNumber(element) {
    const currentNum = parseInt(element.value);
    return element.value = currentNum === 0 ? currentNum : currentNum - 1;
}

function increaseNumber(element, maxNum) {
    const currentNum = parseInt(element.value);
    return element.value = currentNum < maxNum || !maxNum ? currentNum + 1 : currentNum;
}

function addSpecificItemOptions(element, classification) {
    const itemsToAdd = items.filter(item => item.classification === classification);

    itemsToAdd.forEach(item => {
        if (item.classification === classification) {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            element.appendChild(option);    
        }
    });
}

function addItemToCharacter(list, itemId) {
    const li = document.createElement('li');
    const item = findItem(itemId);
    li.setAttribute('value', (item.id));
    li.textContent = item.name;

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'remove-item');
    removeBtn.textContent = 'x';
    li.appendChild(removeBtn);
    removeBtn.addEventListener('click', (event) => removeItem(list, itemId));

    list.appendChild(li);
}

function addItemsToCharacter(element, itemsList) {
    if (!itemsList) {
        return
    }
    
    itemsList.forEach(item => {
        const storedItem = items.find(itemStored => itemStored.id === item.id || itemStored.name === item);
        addItemToCharacter(element, (storedItem.id));        
    });    
}

function addPotionsItemsToCharacter(element, potionsItems) {
    if (!potionsItems) {
        return
    }

    potionsItems.forEach(potionItem => {
        const storedPotionItem = items.find(item => item.name === potionItem || item.name === potionItem || item.name === potionItem);
        addItemToCharacter(element, (storedPotionItem.id));
    });
}

function characterDeath(event, characters, character) {
    if (confirm("Are you sure you want to kill your character?")){
        const targetCharSheet = event.target.parentNode.parentNode.parentNode;
        targetCharSheet.remove();
        const index = getCharacterIndex(characters, character.characterId);
        characters.splice(index, 1);
        storeCharacters(characters);
    }
}

function createCharacterList(nodeList) {
    const characterList = [];
    nodeList.forEach(li => characterList.push((li.textContent).slice(0,-1)));
    return characterList;
}

function createEquippedItemContainer(equippedItemLocation, playerId) {
    const equippedItemContainer = document.createElement('div');
    equippedItemContainer.setAttribute('id', `character-${playerId}-${equippedItemLocation}-container`);
    equippedItemContainer.setAttribute('class', `equipped-${equippedItemLocation}-item`);
    return equippedItemContainer;
}

function clearModal() {
    const cancelBtn = document.getElementById('cancel-modal');
    cancelBtn.remove();

    const itemsList = document.getElementById('choose-items');
    itemsList.remove();
}

function findItem(itemId) {
    const foundItem = items.find((item) => item.id === itemId);
    return foundItem;
}

function getCharacterIndex(characters, characterId) {
    return characters.findIndex((character) => character.characterId === characterId);
}

function getExistingCharacter(characters, character) {
    const characterId = character.characterId;
    return foundCharacter = characters.find(character => {
        return character.characterId === characterId;
    });
}

function getSelectedItems() {
    const itemsList = document.querySelectorAll('input[type=checkbox]');
    const selectedItems = [];

    itemsList.forEach(item => {
        if (item.checked) {
            selectedItems.push(item);
        }
    });

    return selectedItems;
}

function isCurrentCharacter(characters, { characterId }) {
    return characters.some(character => character.characterId === characterId);
}

function removeItem(itemsList, itemId) {
    const [,characterId] = (itemsList.id).split('-');
    const characterItems = itemsList.childNodes;
    characterItems.forEach(item => {
        const characterItemId = item.attributes.value.value;
        const characterItemName = (item.textContent).slice(0,-1);
        if (characterItemId === itemId) {
            // Do I want the item removed from storage before user saves character?
            // removeStoredCharacterWeapon(characterId, characterItemName);
            item.remove();
        }
    });
}

function setInitialStats(heroTypeId, characterId) {
    const heroType = heroTypes.find(type => type.id === heroTypeId);

    const attackDice = document.getElementById(`attack-dice-${characterId}`);
    attackDice.value = heroType.attackDice;

    const defendDice = document.getElementById(`defend-dice-${characterId}`);
    defendDice.value = heroType.defendDice;

    const bodyPoints = document.getElementById(`body-${characterId}`);
    bodyPoints.value = heroType.startBodyPts;

    const mindPoints = document.getElementById(`mind-${characterId}`);
    mindPoints.value = heroType.startMindPts;
}

const displayCharacters = (function () {
    // Initializtion
    characters = getCharacters();
    characters.forEach(character => characterSheet(character));

    // characters.forEach(character => {
    //     const sheetDiv = createSheetDivUi(character)
    //     const charTitle = createTitleUi(character)
    //     const inventory = createInventoryUi(character);

    //     sheetDiv.append(charTitle);
    //     sheetDiv.append(inventory);

    //     bigList.append(sheetDiv)
    // })
})();