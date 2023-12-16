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

        // Automatically Update Character Statistics UI
        const characterAutoUpdateUi = createAutoUpdateInitialStatsUI(uniqueId);
    
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
                checkCharacterItemsCompatibility(uniqueId);
            }
            if (isCurrentCharacter(characters, character)) {
                const storedCharacter = getStoredCharacter(uniqueId);
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
        equippedItemsSection.setAttribute('id', `character-${uniqueId}-equipped-items-section`);

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

        characterSheetDiv.append(CharacterNameTypeDiv, characterAutoUpdateUi, characterButtonsDiv, initialStatsDiv, currentStatsTrackerDiv, equippedItemsSection, WeaponsArmorItemsContainer);
        
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

    function getEquippedItems(characterId) {
        return `character-${characterId}-equipped-items-section`
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
        const equippedItemsImages = document.getElementById(getEquippedItems(uniqueId)).querySelectorAll('.item-image');
        const autoUpdateBtnStatus = getAutoUpdateButtonStatus(uniqueId);

        this.name = nameInput.value;
        this.type = typeSelect.value;
        this.attackDice = attDice.value;
        this.defendDice = defDice.value;
        this.startBodyPts = startBodyPtsInput.value;
        this.startMindPts = startMindPtsInput.value;
        this.weaponsAndArmor = createCharacterItemsList(weaponsAndArmorList);
        this.bodyPts = curBodyPts.value;
        this.goldCoins = curGoldCoins.value;
        this.potionsAndItems = createCharacterItemsList(potionsItemsList);
        this.equippedItems = createEquippedItemsList(equippedItemsImages);
        this.autoUpdateStatus = autoUpdateBtnStatus;

        return({characterId, name, type, attackDice, defendDice, startBodyPts, startMindPts, bodyPts, goldCoins, weaponsAndArmor, potionsAndItems, equippedItems, autoUpdateStatus});
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
        addItemsListToCharacter(weaponsAndArmorList, character.weaponsAndArmor);
        curBodyPtsInput.value = character.bodyPts;
        curGoldCoins.value = character.goldCoins;
        addItemsListToCharacter(potionsItemsList, character.potionsAndItems);
        displayEquippedItems(character.equippedItems, uniqueId);
        updateAutoUpdateBtnStatus(character.characterId, character.autoUpdateStatus);
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
        const equippedItemsImages = document.getElementById(getEquippedItems(uniqueId)).querySelectorAll('.item-image');
        const autoUpdateBtnStatus = getAutoUpdateButtonStatus(uniqueId);

        storedCharacter.type = typeSelect.value;
        storedCharacter.attackDice = attDiceSel.value;
        storedCharacter.defendDice = defDiceSel.value;
        storedCharacter.startBodyPts = startBodyPtsInput.value;
        storedCharacter.startMindPts = startMindPtsInput.value;
        storedCharacter.weaponsAndArmor = createCharacterItemsList(weaponsAndArmorList);
        storedCharacter.bodyPts = curBodyPtsInput.value;
        storedCharacter.goldCoins = curGoldCoins.value;
        storedCharacter.potionsAndItems = createCharacterItemsList(potionsItemsList);
        storedCharacter.name = nameInput.value;
        storedCharacter.equippedItems = createEquippedItemsList(equippedItemsImages);
        storedCharacter.autoUpdateStatus = autoUpdateBtnStatus;

        storeCharacter(storedCharacter);
    }
}

function createAutoUpdateInitialStatsUI(characterId) {
    const autoUpdateUiContainer = document.createElement('div');
    autoUpdateUiContainer.setAttribute('class', 'auto-update-ui-container')

    const autoUpdateBtnLabel = document.createElement('label');
    autoUpdateBtnLabel.setAttribute('for', `character-${characterId}-auto-update-btn`);
    autoUpdateBtnLabel.textContent = 'Automatically Update Dice & Points';
    autoUpdateUiContainer.appendChild(autoUpdateBtnLabel);

    const autoUpdateCheckbox = document.createElement('input');
    autoUpdateCheckbox.setAttribute('type', 'checkbox');
    autoUpdateCheckbox.setAttribute('id', `character-${characterId}-auto-update-btn`);
    autoUpdateCheckbox.setAttribute('class', 'toggle');
    autoUpdateBtnLabel.appendChild(autoUpdateCheckbox);

    const autoUpdateSlider = document.createElement('span');
    autoUpdateSlider.setAttribute('class', 'slider');
    autoUpdateBtnLabel.appendChild(autoUpdateSlider);

    return autoUpdateUiContainer;
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

    const rightHandItemContainer = createEquippedItemContainer('right-hand', uniqueId);
    equippedItemsContainer.appendChild(rightHandItemContainer);

    const leftHandItemContainer = createEquippedItemContainer('left-hand', uniqueId);
    equippedItemsContainer.appendChild(leftHandItemContainer);

    const extra1ItemContainer = createEquippedItemContainer('extra-1', uniqueId);
    equippedItemsContainer.appendChild(extra1ItemContainer);

    const extra2ItemContainer = createEquippedItemContainer('extra-2', uniqueId);
    equippedItemsContainer.appendChild(extra2ItemContainer);

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
        createSelectItemsModalUi(weaponsArmorList, ['weapon', 'armor']);
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
        createSelectItemsModalUi(potionsItemsList, ['item', 'potion']);
        dialog.showModal();
    });

    return potionsItemsContainer;
}

function createSelectItemsModalUi(listElement, itemFilters) {
    const modal = document.getElementById('modal');

    createCancelModalUi(modal);

    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('id', 'choose-items');
    const legend = document.createElement('legend');

    if (itemFilters.includes('weapon') && itemFilters.includes('armor')) {
        legend.textContent = 'Choose your weapons and armor:';
    }

    if (itemFilters.includes('potion') && itemFilters.includes('item')) {
        legend.textContent = 'Choose your potions and items:';
    }

    fieldset.appendChild(legend);


    function addItemsToList(itemFilters) {
        const itemsToAdd = items.filter(item => itemFilters.includes(item.classification));

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

    if (itemFilters) {
        addItemsToList(itemFilters);
    }

    const submitItems = document.createElement('button');
    submitItems.textContent = 'Done';
    submitItems.setAttribute('id', 'close-modal');
    fieldset.appendChild(submitItems);

    submitItems.addEventListener('click', event => {
        modal.close();
        const selectedItemNames = getSelectedItemNames();
        addItemsListToCharacter(listElement, selectedItemNames);
        clearModal(modal);
    });

    modal.appendChild(fieldset);
}

function createCancelModalUi(modal) {
    const cancelModal = document.createElement('button');
    cancelModal.setAttribute('id', 'cancel-modal');
    cancelModal.textContent = 'X';
    modal.appendChild(cancelModal);

    cancelModal.addEventListener('click', () => {
        modal.close();
        clearModal(modal);
    }); 
}

function createItemModal(itemName, characterId) {
    const modal = document.getElementById('modal');
    createCancelModalUi(modal);

    const item = findItemWithName(itemName);
    // const itemContainer = document.getElementById(`character-${characterId}-${item.equippedLocation}-container`);

    const itemCard = createItemCard(item);
    modal.appendChild(itemCard);

    const equipOrUnequipBtn = createEquipUnequipOrConsumeBtn(characterId, item);
    modal.appendChild(equipOrUnequipBtn);

    modal.showModal();
}

function addCharacter(character) {
    characters.push(character);
    storeCharacters(characters);
}

function addItemToCharacterList(characterId, list, item) {
    const li = document.createElement('li');
    li.setAttribute('data-character-item-id', (item.id));
    
    const itemSpan = document.createElement('span');
    itemSpan.setAttribute('class', 'equippable-item');
    itemSpan.setAttribute('id', `character-${characterId}-${item.id}`);
    itemSpan.textContent = item.name;
    li.appendChild(itemSpan);

    // Can I pass item instead of event and it still be accessible when click event is executed?
    itemSpan.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        if (modal.querySelector('.item-card')) {
            return
        }
        const itemName = event.target.textContent;
        createItemModal(itemName, characterId);
    });

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'remove-item');
    removeBtn.textContent = 'x';
    li.appendChild(removeBtn);
    removeBtn.addEventListener('click', (event) => removeItemFromCharacter(characterId, item));

    list.appendChild(li);
}

function addItemsListToCharacter(element, itemsListByName) {
    if (!itemsListByName) {
        return
    }
    
    const characterId = ((element.id).split('-'))[1];

    itemsListByName.forEach(itemToAddByName => {
        const foundItem = items.find(item => item.id === itemToAddByName.id || item.name === itemToAddByName);
        addItemToCharacterList(characterId, element, foundItem);
        checkItemCompatibility(characterId, foundItem);
    });    
}

function characterDeath(event, characters, character) {
    if (confirm("Are you sure you want to kill your character?")){
        const targetCharSheet = event.target.parentNode.parentNode.parentNode;
        targetCharSheet.remove();
        const index = getCharacterIndex(character.characterId);
        characters.splice(index, 1);
        storeCharacters(characters);
    }
}

function checkItemCompatibility(characterId, item) {
    const characterType = document.getElementById(`character-${characterId}-type`).value;
    const equippedItems = getCharacterEquippedItems(characterId);
    const equippedItemsById = equippedItems?.map(equippedItem => equippedItem.id);

    if (item.incompatibilities?.includes(characterType) || item.incompatibilities?.some(incompatibility => equippedItemsById?.includes(incompatibility))) {
        const element = document.getElementById(`character-${characterId}-${item.id}`);
        element.classList.add('incompatible');
        // element.setAttribute('data-hover', `${item.name} can't be equipped. Please check the ${item.name} card for why.`);
        const incompatibleMessage = createIncompatibleItemMessageBox(item);
        element.after(incompatibleMessage);
        return 'incompatible';
    }
}

function checkAndAddItemModifiers(characterId, item) {
    if(checkItemCompatibility(characterId, item) === 'incompatible') {
        console.log('Item modifiers weren\'t added because item is incompatible.');
        return;
    }

    const autoUpdateChecked = document.getElementById(`character-${characterId}-auto-update-btn`).checked;
    
    if (!autoUpdateChecked || !item.modifiers) {
        return;
    }

    for (const modifier in item.modifiers) {
        switch (modifier) {
            case 'attackDice':
                // Update attack dice input
                // Update character's stored attack dice
                addToAttackDiceBucket(characterId, item);
                console.log(`${modifier}: ${item.modifiers[modifier]}`);
                break;
            case 'defendDice':
                addToDefendDiceBucket(characterId, item);
                console.log(`${modifier}: ${item.modifiers[modifier]}`);
                break;
            case 'bodyPoints':
                console.log(`${modifier}: ${item.modifiers[modifier]}`);
                break;
            case 'mindPoints':
                console.log(`${modifier}: ${item.modifiers[modifier]}`);
                break;
            case 'redDice':
                console.log(`${modifier}: ${item.modifiers[modifier]}`);
                break;

            }

    }
}

function checkAndRemoveItemModifiers(characterId, item) {
    if (!item.modifiers) {
        return;
    }

    const character = getStoredCharacter(characterId);
    const characterPrototype = heroTypes.find(type => type.id === character.type); 

    for (const modifier in item.modifiers) {
        switch (modifier) {
            case 'attackDice':
                const attackDice = document.getElementById(`attack-dice-${characterId}`);
                attackDice.value = characterPrototype.attackDice
                character.attackDice = characterPrototype.attackDice;
                removeItemFromBucket(characterId, item);
                break;
            case 'defendDice':
                const defendDice = document.getElementById(`defend-dice-${characterId}`);
                defendDice.value = characterPrototype.defendDice
                character.defendDice = characterPrototype.defendDice;
                break;
            case 'bodyPoints':
                const bodyPoints = document.getElementById(`body-${characterId}`);
                bodyPoints.value = characterPrototype.startBodyPts;
                character.startBodyPts = characterPrototype.startBodyPts;
                break;
            case 'mindPoints':
                const mindPoints = document.getElementById(`mind-${characterId}`);
                mindPoints.value = characterPrototype.startMindPts;
                character.startBodyPts = characterPrototype.startBodyPts;
                break;
            case 'redDice':
                console.log(`${modifier}: ${item.modifiers[modifier]}`);
                break;
        }
    }
}

function addToAttackDiceBucket(characterId, item) {
    const attackDiceModifier = {
        'origin': item.name,
        'attackDice': item.modifiers.attackDice
    }

    const character = getStoredCharacter(characterId);
    
    if (!character) {
        console.log("Unable to get character to add a to attackDiceBucket");
        return;
    }

    character['attackDiceBucket'] = [attackDiceModifier];

    const attackDice = document.getElementById(`attack-dice-${characterId}`);
    attackDice.value = attackDiceModifier['attackDice'];

    storeCharacter(character);
}

function checkCharacterItemsCompatibility(characterId) {
    const storedCharacter = getStoredCharacter(characterId);

    if (storedCharacter) {
        characterType = storedCharacter.type;
        weaponsAndArmor = storedCharacter.weaponsAndArmor;
        potionsAndItems = storedCharacter.potionsAndItems;
    } else {
        characterType = document.getElementById(`character-${characterId}-type`).value;
        weaponsAndArmor = getWeaponsAndArmor(characterId);
        potionsAndItems = getPotionsAndItems(characterId);
    }

    const equippedItems = getCharacterEquippedItems(characterId);
    // const characterItems = items.filter(item => itemsByName.includes(item.name));
    // const equippedItemsById = equippedItems.map(equippedItem => equippedItem.id);
    const characterItems = weaponsAndArmor.concat(potionsAndItems); 
    const incompatibleItems = [];

    characterItems.forEach(item => {
        const element = document.getElementById(`character-${characterId}-${item.id}`);
        // Would this work? item.incompatibilities.includes(...[item.id])
        if (item.incompatibilities?.includes(characterType) || item.incompatibilities?.some(incompatibility => equippedItems.some(equippedItem => equippedItem.id === incompatibility))) {
            element.classList.add('incompatible');
            incompatibleItems.push(item);
            // element.setAttribute('data-hover', `${item.name} can't be equipped. Please check the ${item.name} card for why.`);
            const incompatibleMessage = createIncompatibleItemMessageBox(item);
            element.after(incompatibleMessage);
        } else {
            if (!equippedItems.includes(item)){
                element.classList.remove('incompatible');
            }

            if (incompatibleItems.indexOf(item) != -1) {
                incompatibleItems.splice(incompatibleItems.indexOf(item), 1);  
            }
        }
    })
}

function createCharacterItemsList(nodeList) {
    const characterItems = [];
    nodeList.forEach(li => {
        const itemId = li.dataset.characterItemId;
        const foundItem = findItemWithId(itemId);
        if (foundItem) {
            characterItems.push(foundItem);
        }
    });
    return characterItems;
}

function checkIfEquippedLocationTaken(characterId, item) {
    const containerToCheck = document.getElementById(`character-${characterId}-${item.equippedLocation}-container`);
    return containerToCheck?.querySelector('.item-image');
}

function createEquipUnequipOrConsumeBtn(characterId, item) {
    const currentCharacter = getStoredCharacter(characterId);
    const equippedItem = currentCharacter?.equippedItems?.find(equippedItem => equippedItem.id === item.id); 

    if (!equippedItem && !isEquippedItemDisplayed(characterId, item) && item.equippedLocation) {
        const equipItemBtn = document.createElement('button');
        // Is this ID being utilized? Remove if not
        equipItemBtn.setAttribute('id', `character-${characterId}-equip-${item.name}`);
        equipItemBtn.textContent = 'Equip';
    
        equipItemBtn.addEventListener('click', () => {
            if (!checkIfEquippedLocationTaken(characterId, item)) {
                equipItem(characterId, item);
                checkAndAddItemModifiers(characterId, item);
                checkCharacterItemsCompatibility(characterId);
                modal.close();
                clearModal(modal);    
            } else {
                alert('You must unequip your existing item before you can equip another one in the same location');
                modal.close();
                clearModal(modal);
            }
        });
        
        return equipItemBtn;

    } else if (!item.equippedLocation) {
        const consumeItemBtn = document.createElement('button');

        switch (item.name) {
            case 'Holy Water':
                consumeItemBtn.textContent = 'Use';
                break;
            case 'Tool Kit':
                consumeItemBtn.textContent = 'Disarm a Trap';
                break;
            case 'Rod of Telekinesis':
                consumeItemBtn.textContent = 'Use';
                break;
            default:
                consumeItemBtn.textContent = 'Consume';
        }

        consumeItemBtn.addEventListener('click', () => {
            removeItemFromCharacter(characterId, item);
            modal.close();
            clearModal(modal);
            checkCharacterItemsCompatibility(characterId);
        })
        return consumeItemBtn;
    } else {
        const unequipItemBtn = document.createElement('button');
        unequipItemBtn.setAttribute('id', `character-${characterId}-unequip-${item.name}`);
        unequipItemBtn.textContent = 'Unequip';

        unequipItemBtn.addEventListener('click', () => {
            unequipItem(characterId, item);
            modal.close();
            clearModal(modal);
            checkCharacterItemsCompatibility(characterId);
        });

        return unequipItemBtn;
    }
}

function createEquippedItemsList(imagesNodeList) {
    const equippedItemsList = [];

    imagesNodeList.forEach(image => {
        const separatedFilePath = (image.src).split('/');
        const imageName = separatedFilePath[separatedFilePath.length - 1];
        const item = findItemWithImage(imageName);
        equippedItemsList.push(item);
    });

    return equippedItemsList;
}

function createEquippedItemContainer(equippedItemLocation, playerId) {
    const equippedItemContainer = document.createElement('div');
    equippedItemContainer.setAttribute('id', `character-${playerId}-${equippedItemLocation}-container`);
    equippedItemContainer.setAttribute('class', `equipped-${equippedItemLocation}-item`);
    return equippedItemContainer;
}

function createIncompatibleItemMessageBox(item) {
    const messageBox = document.createElement('div');
    messageBox.setAttribute('class', 'incompatible-message');
    messageBox.setAttribute('class', 'hide');

    const message = document.createElement('span');
    message.textContent = `${item.name} can't be equipped. Please check the ${item.name} card for why.`;
    
    messageBox.appendChild(message);

    return messageBox;
}

function createItemCard(item) {
    const itemCard = document.createElement('div');
    itemCard.setAttribute('class', 'item-card');

    const cardHeader = document.createElement('h3');
    cardHeader.textContent = item.name;
    itemCard.appendChild(cardHeader);

    const cardImage = document.createElement('img');
    cardImage.setAttribute('src', `images/${item.image}`);
    cardImage.setAttribute('alt', item.imageDescription);
    cardImage.setAttribute('class', 'item-card-image');
    itemCard.appendChild(cardImage);

    const cardDescription = document.createElement('p');
    cardDescription.textContent = item.description;
    itemCard.appendChild(cardDescription);

    if (!item.cost) {
        return itemCard;
    }

    const itemCost = document.createElement('span');
    itemCost.setAttribute('class', 'item-card-cost');
    const importantText = document.createElement('strong');
    importantText.textContent = 'Cost: ';
    itemCost.append(importantText, item.cost);
    itemCard.appendChild(itemCost);

    return itemCard;
}

function createItemImage(item, characterId) {
    const itemImage = document.createElement('img');
    itemImage.setAttribute('class', 'item-image');
    itemImage.setAttribute('id', `character-${characterId}-${item.id}`);
    itemImage.setAttribute('src', 'images/' + item.image);
    itemImage.setAttribute('alt', item.imageDescription);
    return itemImage;
}

function clearModal(modal) {
    modal.replaceChildren();
}

function decreaseNumber(element) {
    const currentNum = parseInt(element.value);
    return element.value = currentNum === 0 ? currentNum : currentNum - 1;
}

function displayEquippedItems(equippedItems, characterId) {
    equippedItems.forEach(equippedItem => {
        equipItem(characterId, equippedItem);
    });
}

function equipItem(characterId, item) {
    if (isEquippedItemDisplayed(characterId, item)) {
        return
    }

    if (checkItemCompatibility(characterId, item) === 'incompatible') {
        alert('This item can\'t be equipped. Please reference the item card to see why it can\'t be used.');
        return;
    }

    if (item.equippedLocation === 'extra' && !isExtraItemContainerAvailable(characterId, item)) {
        alert(`${item.name} can\'t be equipped. Please unequip one of your extra items to equip ${item.name}.`);
        return;
    }

    switch (item.equippedLocation) {
        case 'head':
            const headContainer = document.getElementById(`character-${characterId}-head-container`);
            const headItemImage = createItemImage(item, characterId);
            headItemImage.addEventListener('click', () => {
                createItemModal(item.name, characterId);
            });
            headContainer.appendChild(headItemImage);
            storeEquippedItemToCharacter(characterId, item);
            checkCharacterItemsCompatibility(characterId);
            break;
        case 'body':
            const bodyContainer = document.getElementById(`character-${characterId}-body-container`);
            const bodyItemImage = createItemImage(item, characterId);
            bodyItemImage.addEventListener('click', () => {
                createItemModal(item.name, characterId);
            });
            bodyContainer.appendChild(bodyItemImage);
            storeEquippedItemToCharacter(characterId, item);
            checkCharacterItemsCompatibility(characterId);
            break;
        case 'left-hand':
            const leftHandContainer = document.getElementById(`character-${characterId}-left-hand-container`);
            const leftHandItemImage = createItemImage(item, characterId);
            leftHandItemImage.addEventListener('click', () => {
                createItemModal(item.name, characterId);
            });
            leftHandContainer.appendChild(leftHandItemImage);
            storeEquippedItemToCharacter(characterId, item);
            checkCharacterItemsCompatibility(characterId);
            break;
        case 'right-hand':
            const rightHandContainer = document.getElementById(`character-${characterId}-right-hand-container`);
            const rightHandItemImage = createItemImage(item, characterId);
            rightHandItemImage.addEventListener('click', () => {
                createItemModal(item.name, characterId);
            });
            rightHandContainer.appendChild(rightHandItemImage);
            storeEquippedItemToCharacter(characterId, item);
            checkCharacterItemsCompatibility(characterId);
            break;
        case 'extra':
            if (!document.querySelector(`#character-${characterId}-extra-1-container img`)) {
                const extra1ItemContainer = document.getElementById(`character-${characterId}-extra-1-container`);
                const extra1ItemImage = createItemImage(item, characterId);
                extra1ItemImage.addEventListener('click', () => {
                    createItemModal(item.name, characterId);
                });
                extra1ItemContainer.appendChild(extra1ItemImage);
            } else {
                const extra2ItemContainer = document.getElementById(`character-${characterId}-extra-2-container`);
                const extra2ItemImage = createItemImage(item, characterId);
                extra2ItemImage.addEventListener('click', () => {
                    createItemModal(item.name, characterId);
                });
                extra2ItemContainer.appendChild(extra2ItemImage);
            }
    }
}

function findItemWithId(itemId) {
    const foundItem = items.find((item) => item.id === itemId);
    return foundItem;
}

function findItemWithImage(image) {
    const foundItem = items.find(item => item.image === image);
    return foundItem;
}

function findItemWithName(itemName) {
    const foundItem = items.find((item) => item.name === itemName);
    return foundItem;
}

function getCharacterIndex(characterId) {
    const characters = getCharacters();
    return characters.findIndex((character) => character.characterId === parseInt(characterId));
}

function getCharacterEquippedItems(characterId) {
    const character = getStoredCharacter(characterId);
    const storedEquippedItems = character?.equippedItems;

    const equippedItemsImages = document.getElementById(`character-${characterId}-equipped-items-section`).querySelectorAll('.item-image');
    const displayedEquippedItems = createEquippedItemsList(equippedItemsImages);

    if (storedEquippedItems) {
        return storedEquippedItems; 
    } else {
        return displayedEquippedItems.length > 0 ? displayedEquippedItems : [];
    }
}

function getAutoUpdateButtonStatus(characterId) {
    const autoUpdateBtn = document.getElementById(`character-${characterId}-auto-update-btn`);
    return autoUpdateBtn.checked;
}

function getPotionsAndItems(characterId) {
    const potionsAndItemsElements = document.getElementById(`character-${characterId}-potions-items`).querySelectorAll('li');
    const potionsAndItems = [...potionsAndItemsElements].map(element => findItemWithId(element.dataset.characterItemId));
    return potionsAndItems;
}

function getSelectedItemNames() {
    const itemsList = document.querySelectorAll('#choose-items input[type=checkbox]');
    const selectedItems = [];

    itemsList.forEach(item => {
        if (item.checked) {
            selectedItems.push(item.parentNode.textContent);
        }
    });

    return selectedItems;
}

function getWeaponsAndArmor(characterId) {
    const weaponsAndArmorElements = document.getElementById(`character-${characterId}-weapons-armor`).querySelectorAll('li');
    const weaponsAndArmor = [...weaponsAndArmorElements].map(element => findItemWithId(element.dataset.characterItemId));
    return weaponsAndArmor;
}

function increaseNumber(element, maxNum) {
    const currentNum = parseInt(element.value);
    return element.value = currentNum < maxNum || !maxNum ? currentNum + 1 : currentNum;
}

function isCurrentCharacter(characters, { characterId }) {
    return characters.some(character => character.characterId === characterId);
}

function isEquippedItemDisplayed(characterId, item) {
    if (item.equippedLocation === 'extra') {
        const extraLocation1 = document.getElementById(`character-${characterId}-extra-1-container`);
        const extraLocation2 = document.getElementById(`character-${characterId}-extra-2-container`);

        const foundItemInLocation1 = extraLocation1.querySelector(`#character-${characterId}-${item.id}`);
        const foundItemInLocation2 = extraLocation2.querySelector(`#character-${characterId}-${item.id}`);

        return foundItemInLocation1 || foundItemInLocation2 ? true : false;
    } else {
        const equippedItemContainer = document.getElementById(`character-${characterId}-${item.equippedLocation}-container`);
        foundItem = equippedItemContainer?.querySelector(`#character-${characterId}-${item.id}`); 
        return foundItem ? true : false;   
    }
}

function isExtraItemContainerAvailable(characterId, item) {
    const extra1Container = document.getElementById(`character-${characterId}-extra-1-container`);
    const extra2Container = document.getElementById(`character-${characterId}-extra-2-container`);

    if (extra1Container.hasChildNodes() && extra2Container.hasChildNodes()) {
        return false;
    } else {
        return true;
    }
}

function isItemEquipped(characterId, item) {
    const equippedItems = getCharacterEquippedItems(characterId);
    const itemIsEquipped = equippedItems.find(equippedItem => equippedItem.id === item.id);
    return itemIsEquipped ? true : false;
}

function removeItemFromBucket(characterId, item) {
    const character = getStoredCharacter(characterId);
    const modifiers = item.modifiers;

    for (const statToModify in modifiers) {
        switch (statToModify) {
            case 'attackDice':
                let modifierIndex = character.attackDiceBucket.findIndex(modifier => modifier.origin === item.name); 
                if (modifierIndex === -1) {
                    console.log('Can\'t find item to remove from attackDiceBucket.');
                    return;
                }
                character.attackDiceBucket.splice(modifierIndex, 1);
                break;
            case 'defendDice':
                modifierIndex = character.defendDiceBucket.findIndex(modifier => modifier.origin === item.name);
                if (modifierIndex === -1) {
                    console.log('Can\'t find item to remove from defend dice bucket.');
                    return;
                }
                character.defendDiceBucket.splice(itemIndex, 1);
                break;
            case 'bodyPoints':
                modifierIndex = character.bodyPointsBucket.findIndex(modifier => modifier.origin === item.name);
                if (modifierIndex === -1) {
                    console.log('Can\'t find item to remove from body points bucket.');
                    return;
                }
                character.bodyPointsBucket.splice(itemIndex, 1);
                break;
            case 'mindPoints':
                modifierIndex = character.mindPointsBucket.findIndex(modifier => modifier.origin === item.name);
                if (modifierIndex === -1) {
                    console.log('Can\'t find item to remove from mind points bucket.');
                    return;
                }
                character.mindPointsBucket.splice(itemIndex, 1);
                break;
            case 'redDice':
                console.log('Player can only use 2 red dice to move.');
                break;
        }
    }

    storeCharacter(character);
}

function removeItemFromCharacter(characterId, item) {
    if(isItemEquipped(characterId, item)) {
        alert(`${item.name} must be unequipped before you can remove it.`);
        return;
    }

    // Remove item from list of items
    const itemElementToRemove = document.querySelector(`.equippable-item#character-${characterId}-${item.id}`).parentNode;
    itemElementToRemove.remove();
    
    // Get character
    const characters = getCharacters();
    const character = characters.find(character => character.characterId === parseInt(characterId));
    if (!character) {
        console.log('Function removeItemFromCharacter didn\'t find a character to remove item from.');
        return;
    }
    // Remove item from stored items
    if (character.weaponsAndArmor.find(weaponOrArmor => weaponOrArmor.name === item.name)) {
        const index = character.weaponsAndArmor.indexOf(item);
        character.weaponsAndArmor.splice(index, 1);
    } else if (character.potionsAndItems.find(potionOrItem => potionOrItem.name === item.name)) {
        const index = character.potionsAndItems.findIndex(potionOrItem => potionOrItem.id === item.id);
        if (index != -1) {
            character.potionsAndItems.splice(index, 1);
        }
    }
    storeCharacters(characters);
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

function unequipItem(characterId, item) {
    const imageToRemove = document.getElementById(`character-${characterId}-${item.id}`);
    imageToRemove.remove();
    removeItemFromEquippedItems(characterId, item);
    checkAndRemoveItemModifiers(characterId, item);
    checkCharacterItemsCompatibility(characterId);
}

function updateAutoUpdateBtnStatus(characterId, boolean) {
    const autoUpdateBtn = document.getElementById(`character-${characterId}-auto-update-btn`);
    autoUpdateBtn.checked = boolean;
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