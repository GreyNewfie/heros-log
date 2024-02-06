const addCharacterButton = document.getElementById('add-character-button');

addCharacterButton.addEventListener('click', () => {
    const uniqueId = Date.now();
    createEnterCharacterNameUi(uniqueId);
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
        characterSheetDiv.setAttribute('id', `character-${uniqueId}`);

        // Character Header
        const characterHeader = createCharacterSheetHeader();
        characterSheetDiv.appendChild(characterHeader);
    
        //Character name & type container
        const CharacterNameTypeDiv = document.createElement('div');
        CharacterNameTypeDiv.setAttribute('class', 'character-name-type-container');
    
        //Character name input field
        const characterNameDiv = document.createElement('div');
        createCharacterNameUi(characterNameDiv, character);
        
        //Character type 
        const characterTypeDiv = document.createElement('div');
        createCharacterTypeUi(characterTypeDiv, character);

        // Automatically Update Character Statistics UI
        const characterAutoUpdateUi = createAutoUpdateInitialStatsUI(uniqueId);
    
        // Character buttons div
        const characterButtonsDiv = document.createElement('div');
        characterButtonsDiv.setAttribute('class', 'char-btns');
        
        // Killed button
        const characterKilledBtn = document.createElement('button');
        characterKilledBtn.setAttribute('class', 'killed-button');
        const characterKilledSpan = document.createElement('span');
        characterKilledSpan.setAttribute('class', 'material-symbols-outlined');
        characterKilledSpan.append('skull');
        characterKilledBtn.append(characterKilledSpan);
        characterKilledBtn.addEventListener('click', (event) => characterDeath(event, character));
    
        characterButtonsDiv.append(characterKilledBtn);
    
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
        return `character-${characterId}-name`;
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
        return `character-${characterId}-weapons-armor`;
    }

    function getCurrentBodyPoints(characterId) {
        return `body-points-${characterId}`;
    }

    function getCurrentGoldCoins(characterId) {
        return `gold-coins-${characterId}`;
    }

    function getPotionsAndItems(characterId) {
        return `character-${characterId}-potions-items`;
    }

    function getEquippedItems(characterId) {
        return `character-${characterId}-equipped-items-section`;
    }

    const createNewCharacter = () => {
        this.characterId = uniqueId;

        const nameSpan = document.getElementById(getCharacterName(uniqueId));
        const typeSpan = document.getElementById(getCharacterType(uniqueId));
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

        this.name = nameSpan.value;
        this.type = typeSpan.value;
        this.attackDice = attDice.value;
        this.attackDiceBucket = [];
        this.defendDice = defDice.value;
        this.defendDiceBucket = [];
        this.startBodyPts = startBodyPtsInput.value;
        this.bodyPointsBucket = [];
        this.startMindPts = startMindPtsInput.value;
        this.mindPointsBucket = [];
        this.weaponsAndArmor = createCharacterItemsList(weaponsAndArmorList);
        this.bodyPts = curBodyPts.value;
        this.goldCoins = curGoldCoins.value;
        this.potionsAndItems = createCharacterItemsList(potionsItemsList);
        this.equippedItems = createEquippedItemsList(equippedItemsImages);
        this.autoUpdateStatus = autoUpdateBtnStatus;
    
        return({characterId, name, type, attackDice, attackDiceBucket, defendDice, defendDiceBucket, startBodyPts, bodyPointsBucket, startMindPts, mindPointsBucket, bodyPts, goldCoins, weaponsAndArmor, potionsAndItems, equippedItems, autoUpdateStatus});
    }

    function createExistingCharacter(character) {
        const nameSpan = document.getElementById(getCharacterName(character.characterId));
        const typeSpan = document.getElementById(getCharacterType(character.characterId));
        const attDice = document.getElementById(getAttackDice(character.characterId));
        const defDice = document.getElementById(getDefendDice(character.characterId));
        const startBodyPts = document.getElementById(getStartBodyPoints(character.characterId));
        const startMindPts = document.getElementById(getStartMindPoints(character.characterId));
        const weaponsAndArmorList = document.getElementById(getWeaponsAndArmor(uniqueId));
        const curBodyPtsInput = document.getElementById(getCurrentBodyPoints(character.characterId));
        const curGoldCoins = document.getElementById(getCurrentGoldCoins(character.characterId));
        const potionsItemsList= document.getElementById(getPotionsAndItems(character.characterId));

        nameSpan.value = character.name;
        typeSpan.value = character.heroPrototype.id;
        attDice.value = character.attackDice;
        defDice.value = character.defendDice;
        startBodyPts.value = character.startBodyPts;
        startMindPts.value = character.startMindPts;
        addItemsListToCharacter(weaponsAndArmorList, character.weaponsAndArmor);
        curBodyPtsInput.value = character.bodyPts;
        curGoldCoins.value = character.goldCoins;
        addItemsListToCharacter(potionsItemsList, character.potionsAndItems);
        displayEquippedItems(character.equippedItems, character.characterId);
        updateAutoUpdateBtnStatus(character.characterId, character.autoUpdateStatus);
    }

    function updateCharacter(storedCharacter, characterId) {
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

        storedCharacter.attackDice = parseInt(attDiceSel.value);
        storedCharacter.defendDice = parseInt(defDiceSel.value);
        storedCharacter.startBodyPts = parseInt(startBodyPtsInput.value);
        storedCharacter.startMindPts = parseInt(startMindPtsInput.value);
        storedCharacter.weaponsAndArmor = createCharacterItemsList(weaponsAndArmorList);
        storedCharacter.bodyPts = parseInt(curBodyPtsInput.value);
        storedCharacter.goldCoins = parseInt(curGoldCoins.value);
        storedCharacter.potionsAndItems = createCharacterItemsList(potionsItemsList);
        storedCharacter.name = nameInput.value;
        storedCharacter.equippedItems = createEquippedItemsList(equippedItemsImages);
        storedCharacter.autoUpdateStatus = autoUpdateBtnStatus;

        storeCharacter(storedCharacter);
    }

    function createCharacterSheetHeader() {
        const headerContainer = document.createElement('div');
        headerContainer.setAttribute('class', 'character-sheet-header');

        const headerImageleft = document.createElement('img');
        headerImageleft.setAttribute('class', 'character-sheet-header-img');
        headerImageleft.setAttribute('src', 'images/character-sheet-title-axe-left-50x40.png');
        headerImageleft.setAttribute('alt', 'Battle axe with a double sided blade and a wooden handle');
        headerContainer.appendChild(headerImageleft);

        const header = document.createElement('h3');
        header.textContent = 'Character Sheet';
        headerContainer.appendChild(header);

        const headerImageRight = document.createElement('img');
        headerImageRight.setAttribute('class', 'character-sheet-header-img');
        headerImageRight.setAttribute('src', 'images/character-sheet-title-axe-right-50x40.png');
        headerImageRight.setAttribute('alt', 'Battle axe with a double sided blade and a wooden handle');
        headerContainer.appendChild(headerImageRight);

        return headerContainer;
    }
}

function createAutoUpdateInitialStatsUI(characterId) {
    const autoUpdateUiContainer = document.createElement('div');
    autoUpdateUiContainer.setAttribute('class', 'auto-update-ui-container')

    const autoUpdateBtnLabel = document.createElement('label');
    autoUpdateBtnLabel.setAttribute('for', `character-${characterId}-auto-update-btn`);
    autoUpdateBtnLabel.textContent = 'Automatically Update Stats';
    autoUpdateUiContainer.appendChild(autoUpdateBtnLabel);

    const autoUpdateCheckbox = document.createElement('input');
    autoUpdateCheckbox.setAttribute('type', 'checkbox');
    autoUpdateCheckbox.setAttribute('id', `character-${characterId}-auto-update-btn`);
    autoUpdateCheckbox.setAttribute('class', 'toggle');
    autoUpdateBtnLabel.appendChild(autoUpdateCheckbox);

    const autoUpdateSlider = document.createElement('span');
    autoUpdateSlider.setAttribute('class', 'slider');
    autoUpdateBtnLabel.appendChild(autoUpdateSlider);

    autoUpdateCheckbox.addEventListener('change', (event) => {
        const character = getStoredCharacter(characterId);
        character.autoUpdateStatus = autoUpdateCheckbox.checked ? true : false;
        storeCharacter(character);
        showOrHideIncreaseDecreaseBtns(character);
    });

    return autoUpdateUiContainer;
}

function createCharacterTypeUi(container, character) {
    const characterTypeLabel = document.createElement('p');
    characterTypeLabel.setAttribute('class', 'character-sheet-title');
    characterTypeLabel.textContent = 'Character:';

    const characterTypeSpan = document.createElement('span');
    characterTypeSpan.setAttribute('id', `character-${character.characterId}-type`);
    characterTypeSpan.textContent = character.heroPrototype.name;

    container.append(characterTypeLabel, characterTypeSpan);
}

function createCharacterNameUi(container, character) {
    const characterNameLabel = document.createElement('p');
    characterNameLabel.setAttribute('class', 'character-sheet-title');
    characterNameLabel.textContent = 'Name:';

    const characterNameSpan = document.createElement('span');
    characterNameSpan.setAttribute('id', `character-${character.characterId}-name`);
    characterNameSpan.textContent = character.name;

    container.append(characterNameLabel, characterNameSpan);
}

function createDiceUi(typeOfDice, uniqueId, maxNum) {
    if (!maxNum) {
        const maxNum = 999;
    }

    const character = getStoredCharacter(uniqueId);

    const typeOfDiceArray = (typeOfDice.toLowerCase()).split(' ');
    // Setting ID attribute for multiple word descriptions & single word descriptions, ex. 'Attack Dice' & 'Body' (starting body pts)
    const diceId = typeOfDiceArray[1] ? `${typeOfDiceArray[0]}-${typeOfDiceArray[1]}-${uniqueId}` : `${typeOfDiceArray[0]}-${uniqueId}`;

    const diceContainer = document.createElement('div');

    const title = document.createElement('h4');
    title.textContent = typeOfDice;
    diceContainer.appendChild(title);

    const diceDiv = document.createElement('div');
    diceDiv.setAttribute('class', 'stat-tracker-container');

    const dice = document.createElement('input');
    setAttributes(dice, {type: 'number', id: diceId, class: 'hero-number-input'});
    dice.value = 0;
    
    const plusBtn = document.createElement('button');
    plusBtn.setAttribute('class', 'increase-number-btn');
    plusBtn.addEventListener('click', () => increaseNumber(dice, maxNum));

    const minusBtn = document.createElement('button');
    minusBtn.setAttribute('class', 'decrease-number-btn');
    minusBtn.addEventListener('click', () => decreaseNumber(dice));

    if (character.autoUpdateStatus) {
        plusBtn.classList.add('hide-element');
        minusBtn.classList.add('hide-element');
    }

    diceDiv.append(minusBtn, dice, plusBtn);
    diceContainer.appendChild(diceDiv);

    return diceContainer;
}

function createEnterCharacterNameUi(characterId) {
    const modal = document.getElementById('modal');
    modal.classList.add('enter-name-modal')

    createCancelModalUi(modal);

    const enterNameContainer = document.createElement('div');
    enterNameContainer.setAttribute('class', 'enter-name-input-container');

    const enterNameLabel = document.createElement('label');
    enterNameLabel.setAttribute('for', `character-${characterId}-name`);
    enterNameLabel.textContent = 'Enter Your Hero\'s Name';
    enterNameContainer.appendChild(enterNameLabel);

    const enterNameInput = document.createElement('input');
    enterNameInput.setAttribute('type', 'text');
    enterNameInput.setAttribute('id', `character-${characterId}-name`);
    enterNameInput.setAttribute('name', `character-${characterId}-name`);
    enterNameInput.setAttribute('autofocus', '');
    enterNameContainer.appendChild(enterNameInput);

    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.addEventListener('click', (e) => {
        const heroName = document.getElementById(`character-${characterId}-name`).value;
        const character = {
            'characterId': characterId,
            'name': heroName
        };
        modal.close();
        clearModal(modal);
        modal.classList.remove('enter-name-modal');
        createSelectCharacterTypeUi(character);
    });
    enterNameContainer.appendChild(doneButton);
    modal.appendChild(enterNameContainer);

    modal.showModal();
}

function createSelectCharacterTypeUi(character) {
    const modal = document.getElementById('modal');
    modal.setAttribute('class', 'select-hero-type-modal');

    createCancelModalUi(modal);

    const heroTypesContainer = document.createElement('div');
    heroTypesContainer.setAttribute('class', 'hero-types-container');

    const barbarianContainer = createHeroTypeCard('barbarian');
    const elfContainer = createHeroTypeCard('elf');
    const dwarfContainer = createHeroTypeCard('dwarf');
    const wizardContainer = createHeroTypeCard('wizard');

    heroTypesContainer.append(barbarianContainer, elfContainer, dwarfContainer, wizardContainer);
    modal.appendChild(heroTypesContainer);
    
    const heroTypeCards = document.querySelectorAll('.character-type-card');

    heroTypeCards.forEach(card => 
        card.addEventListener('click', (e) => {
            const heroPrototype = heroTypes.find(type => type.id === e.target.dataset.heroType);
            character['heroPrototype'] = heroPrototype;
            modal.close();
            modal.classList.remove('select-hero-type-modal');
            clearModal(modal);
            const newCharacter = createInitialCharacter(character);
            characterSheet(newCharacter);
    }));

    modal.showModal();

    function createHeroTypeCard(heroType) {    
        const heroTypeContainer = document.createElement('div');
        heroTypeContainer.setAttribute('class', 'hero-type-image-container');

        let imagePath = `images/character-card-${heroType}-790x1100.png`;
        let altText = `Heroquest ${heroType} character game card'`
    
        const heroTypeImage = document.createElement('img');
        heroTypeImage.setAttribute('src', imagePath);
        heroTypeImage.setAttribute('alt', altText);
        heroTypeImage.setAttribute('class', 'character-type-card');
        heroTypeImage.setAttribute('data-hero-type', heroType);
        heroTypeContainer.appendChild(heroTypeImage);
        
        return heroTypeContainer;
    }
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
    header.textContent = 'Weapons & Armor';
    headerContainer.appendChild(header);

    const addBtn = document.createElement('button');
    addBtn.setAttribute('class', 'material-symbols-outlined');
    addBtn.textContent = 'add';
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
    const character = getStoredCharacter(uniqueId);

    const currentStatContainer = document.createElement('div');

    const trackerHeader = document.createElement('h4');
    trackerHeader.textContent = trackerLabel;
    currentStatContainer.appendChild(trackerHeader);

    const tracker = document.createElement('div');
    tracker.setAttribute('class', 'stat-tracker-container');

    const trackerInput = document.createElement('input');
    setAttributes(trackerInput, {type: 'number', id: `${labelArray[0]}-${labelArray[1]}-${uniqueId}`, class: 'hero-number-input'});
    trackerInput.value = 0;

    const plusBtn = document.createElement('button');
    plusBtn.setAttribute('class', 'increase-number-btn');
    plusBtn.addEventListener('click', () => increaseNumber(trackerInput));

    const minusBtn = document.createElement('button');
    minusBtn.setAttribute('class', 'decrease-number-btn');
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
    addPotionsItemsBtn.setAttribute('class', 'material-symbols-outlined');
    addPotionsItemsBtn.textContent = 'add';
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
        legend.innerHTML = 'Choose Your Weapons & Armor:';
        modal.setAttribute('class', 'select-weapons-armor-container');
    }

    if (itemFilters.includes('potion') && itemFilters.includes('item')) {
        legend.innerHTML = 'Choose Your Potions & Items:';
        modal.setAttribute('class', 'select-potions-items-container');
    }

    fieldset.appendChild(legend);


    function addItemsToList(itemFilters) {
        const itemsToAdd = items.filter(item => itemFilters.includes(item.classification));

        itemsToAdd.forEach(item => {
            const itemContainer = document.createElement('div');
            itemContainer.setAttribute('class', 'item-container');
    
            const label = document.createElement('label');
            label.setAttribute('for', item.id);
            label.textContent = item.name;
    
            const input = document.createElement('input');
            setAttributes(input, {type: 'checkbox', id: `${item.id}`, name: `${item.id}`});
            label.appendChild(input);

            const checkmark = document.createElement('span');
            checkmark.setAttribute('class', 'checkmark');
            label.appendChild(checkmark);
    
            itemContainer.append(label);
            fieldset.appendChild(itemContainer);
        });
    }

    if (itemFilters) {
        addItemsToList(itemFilters);
    }

    const submitItems = document.createElement('button');
    submitItems.innerHTML = 'Done';
    submitItems.setAttribute('id', 'close-modal');
    fieldset.appendChild(submitItems);

    submitItems.addEventListener('click', event => {
        modal.close();
        const selectedItemNames = getSelectedItemNames();
        addItemsListToCharacter(listElement, selectedItemNames);
        const character = getStoredCharacter(((listElement.id).split('-'))[1]);
        addSelectedItemsToStoredCharacter(character, selectedItemNames);
        modal.classList.remove('select-items-container');
        clearModal(modal);
        modal.classList = '';
    });

    modal.appendChild(fieldset);
}

function createCancelModalUi(modal) {
    const cancelModal = document.createElement('button');
    cancelModal.setAttribute('id', 'cancel-modal');
    cancelModal.setAttribute('class', 'material-symbols-outlined')
    cancelModal.textContent = 'close';
    modal.appendChild(cancelModal);

    cancelModal.addEventListener('click', () => {
        modal.classList = '';
        modal.close();
        clearModal(modal);
    }); 

    function removeCharactersWithoutType() {
        const characters = getCharacters();
        characters.filter(character => character.type);
        storeCharacters(characters);
    }
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

    itemSpan.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        if (modal.querySelector('.item-card')) {
            return
        }
        const itemName = event.target.textContent;
        createItemModal(itemName, characterId);
    });

    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('class', 'remove-item material-symbols-outlined');
    removeBtn.textContent = 'close';
    li.appendChild(removeBtn);
    removeBtn.addEventListener('click', (event) => removeItemFromCharacter(characterId, item));

    list.appendChild(li);
}

function addItemsListToCharacter(element, itemsListByName) {
    if (!itemsListByName) {
        return
    }
    
    const characterId = ((element.id).split('-'))[1];
    const character = getStoredCharacter(characterId);

    itemsListByName.forEach(itemToAddByName => {
        const foundItem = items.find(item => item.id === itemToAddByName.id || item.name === itemToAddByName);
        addItemToCharacterList(characterId, element, foundItem);
        checkItemCompatibility(characterId, foundItem);
    });    
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

function addToDiceOrPointsBucket(characterId, item) {
    let character = getStoredCharacter(characterId);

    for (const modifier in item.modifiers) {
        switch (modifier) {
            case 'attackDice':
            const attackDiceModifier = createAttackDiceModifier(item);
            character.attackDiceBucket.push(attackDiceModifier);
            const attackDice = document.getElementById(`attack-dice-${characterId}`);
            attackDice.value = attackDiceModifier['attackDice'];
            character.attackDice = attackDiceModifier['attackDice'];
            break;
        case 'defendDice':
            const defendDiceModifier = createDefendDiceModifier(item);
            character.defendDiceBucket.push(defendDiceModifier);
            const numOfDefendDice = getTotalDefendDiceFromBucket(character)
            character.defendDice = numOfDefendDice;
            const defendDice = document.getElementById(`defend-dice-${characterId}`);
            defendDice.value = character.defendDice;
            break;
        case 'bodyPoints':
            const bodyPointsModifier = createBodyPointsModifier(item);
            character.bodyPointsBucket.push(bodyPointsModifier);
            const numOfBodyPoints = getTotalBodyPointsFromBucket(character);
            character.bodyPts = numOfBodyPoints;
            const bodyPoints = document.getElementById(`body-${characterId}`);
            bodyPoints.value = character.bodyPts;
            break;
        case 'mindPoints':
            const mindPointsModifier = createMindPointsModifier(item);
            character.mindPointsBucket.push(mindPointsModifier);
            const numOfMindPoints = getTotalMindPointsFromBucket(character);
            character.mindPts = numOfMindPoints;
            const mindPoints = document.getElementById(`mind-${characterId}`);
            mindPoints.value = character.mindPts;
        }
    }

    storeCharacter(character);
}

//********* IS THIS FUNCTION BEING USED? ****************/
// function addHeroTypeStatsToCharacterSheet(character) {
//     const attackDice = document.getElementById(`attack-dice-${character.characterId}`);
//     attackDice.value = character.heroPrototype.attackDice;

//     const defendDice = document.getElementById(`defend-dice-${character.characterId}`);
//     defendDice.value = character.heroPrototype.defendDice;

//     const bodyPoints = document.getElementById(`body-${character.characterId}`);
//     bodyPoints.value = character.heroPrototype.startBodyPts;

//     const mindPoints = document.getElementById(`mind-${character.characterId}`);
//     mindPoints.value = character.heroPrototype.startMindPts;
// }

function addHeroTypeStatsToBuckets(character) {
    const attackDiceModifier = {
        'origin': 'character',
        'attackDice': character.heroPrototype.attackDice
    }

    const defendDiceModifier = {
        'origin': 'character',
        'defendDice': character.heroPrototype.defendDice
    }
    const bodyPointsModifier = {
        'origin': 'character',
        'bodyPoints': character.heroPrototype.startBodyPts
    }

    const mindPointsModifier = {
        'origin': 'character',
        'mindPoints': character.heroPrototype.startMindPts
    }

    character.attackDiceBucket.push(attackDiceModifier);
    character.defendDiceBucket.push(defendDiceModifier);
    character.bodyPointsBucket.push(bodyPointsModifier);
    character.mindPointsBucket.push(mindPointsModifier);

    storeCharacter(character);
}

function addSelectedItemsToStoredCharacter(character, itemsByName) {
    itemsByName.forEach(itemByName => {
        const item = items.find(storedItem => storedItem.name === itemByName);
        if (item.classification === 'weapon' || item.classification === 'armor') {
            character.weaponsAndArmor.push(item);
        }

        if (item.classification === 'potion' || item.classification === 'item') {
            character.potionsAndItems.push(item);
        }
    });
    
    storeCharacter(character);
}

function characterDeath(event, character) {
    confirmCharacterDeath(() => {
        const targetCharSheet = event.target.parentNode.parentNode.parentNode;
        targetCharSheet.remove();

        const index = getCharacterIndex(character.characterId);
        const characters = getCharacters();
        characters.splice(index, 1);
        storeCharacters(characters);
    });
}

function confirmCharacterDeath(callback) {
    const confirmDeath = document.querySelector('.confirm-death-alert');
    const cancelBtn = document.querySelector('.cancel-death');
    const confirmBtn = document.querySelector('.confirm-death');

    cancelBtn.addEventListener('click', () => {
        confirmDeath.classList.add('hide-element');
    });

    confirmBtn.addEventListener('click', () => {
        confirmDeath.classList.add('hide-element');
        callback();
    })

    confirmDeath.classList.remove('hide-element');
}

function checkItemCompatibility(characterId, item) {
    const characterType = document.getElementById(`character-${characterId}-type`).value;
    const equippedItems = getCharacterEquippedItems(characterId);
    const equippedItemsById = equippedItems?.map(equippedItem => equippedItem.id);

    if (item.incompatibilities?.includes(characterType) || item.incompatibilities?.some(incompatibility => equippedItemsById?.includes(incompatibility))) {
        const element = document.getElementById(`character-${characterId}-${item.id}`);
        element.classList.add('incompatible');
        // element.setAttribute('data-hover', `${item.name} can't be equipped. Please check the ${item.name} card for why.`);
        // const incompatibleMessage = createIncompatibleItemMessageBox(item);
        // element.after(incompatibleMessage);
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
                addToDiceOrPointsBucket(characterId, item);
                break;
            case 'defendDice':
                addToDiceOrPointsBucket(characterId, item);
                break;
            case 'bodyPoints':
                addToDiceOrPointsBucket(characterId, item);
                break;
            case 'mindPoints':
                addToDiceOrPointsBucket(characterId, item);
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
                attackDice.value = character.heroPrototype.attackDice;
                character.attackDice = character.heroPrototype.attackDice;
                removeItemFromBucket(character, item);
                break;
            case 'defendDice':
                const defendDice = document.getElementById(`defend-dice-${characterId}`);
                removeItemFromBucket(character, item);
                const numOfDefendDice = getTotalDefendDiceFromBucket(character);
                character.defendDice = numOfDefendDice;
                defendDice.value = character.defendDice;
                break;
            case 'bodyPoints':
                const startBodyPoints = document.getElementById(`body-${characterId}`);
                removeItemFromBucket(character, item);
                const numOfBodyPoints = getTotalBodyPointsFromBucket(character);
                character.startBodyPts = numOfBodyPoints;
                startBodyPoints.value = character.startBodyPts;
                break;
            case 'mindPoints':
                const startMindPoints = document.getElementById(`mind-${characterId}`);
                removeItemFromBucket(character, item);
                const numOfMindPoints = getTotalMindPointsFromBucket(character);
                character.startMindPts = numOfMindPoints;
                startMindPoints.value = character.startMindPts;
                break;
            case 'redDice':
                console.log(`${modifier}: ${item.modifiers[modifier]}`);
                break;
        }
    }
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
    const characterItems = weaponsAndArmor.concat(potionsAndItems); 
    const incompatibleItems = [];

    characterItems.forEach(item => {
        const element = document.getElementById(`character-${characterId}-${item.id}`);
        // Would this work? item.incompatibilities.includes(...[item.id])
        if (item.incompatibilities?.includes(characterType) || item.incompatibilities?.some(incompatibility => equippedItems.some(equippedItem => equippedItem.id === incompatibility))) {
            element.classList.add('incompatible');
            incompatibleItems.push(item);
            // element.setAttribute('data-hover', `${item.name} can't be equipped. Please check the ${item.name} card for why.`);
            // const incompatibleMessage = createIncompatibleItemMessageBox(item);
            // element.after(incompatibleMessage);
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

function checkIfEquippedLocationTaken(characterId, item) {
    const containerToCheck = document.getElementById(`character-${characterId}-${item.equippedLocation}-container`);
    return containerToCheck?.querySelector('.equipped-item-image');
}

function createInitialCharacter(character) {
    this.characterId = character.characterId;
    this.name = character.name;
    this.type = character.heroPrototype.id;
    this.heroPrototype = character.heroPrototype;
    this.attackDice = character.heroPrototype.attackDice;
    this.attackDiceBucket = [];
    this.defendDice = character.heroPrototype.defendDice;
    this.defendDiceBucket = [];
    this.startBodyPts = character.heroPrototype.startBodyPts;
    this.bodyPointsBucket = [];
    this.startMindPts = character.heroPrototype.startMindPts;
    this.mindPointsBucket = [];
    this.weaponsAndArmor = [];
    this.bodyPts = character.heroPrototype.startBodyPts;
    this.goldCoins = 0;
    this.potionsAndItems = [];
    this.equippedItems = [];
    this.autoUpdateStatus = false;

    const newCharacter = {characterId, name, type, heroPrototype, attackDice, attackDiceBucket, defendDice, defendDiceBucket, startBodyPts, bodyPointsBucket, startMindPts, mindPointsBucket, bodyPts, goldCoins, weaponsAndArmor, potionsAndItems, equippedItems, autoUpdateStatus};
    addHeroTypeStatsToBuckets(newCharacter);

    return newCharacter;
}

function createAttackDiceModifier(item) {
    const statModifier = {
        'origin': item.name,
        'attackDice': item.modifiers.attackDice
    }

    return statModifier;
}

function createDefendDiceModifier(item) {
    const statModifier = {
        'origin': item.name,
        'defendDice': item.modifiers.defendDice
    }

    return statModifier;
}

function createBodyPointsModifier(item) {
    const statModifier = {
        'origin': item.name,
        'bodyPoints': item.modifiers.bodyPoints
    }

    return statModifier;
}

function createMindPointsModifier(item) {
    const statModifier = {
        'origin': item.name,
        'mindPoints': item.modifiers.mindPoints
    }

    return statModifier;
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

function createItemModal(itemName, characterId) {
    const modal = document.getElementById('modal');
    modal.setAttribute('class', 'character-sheet-item-card');

    createCancelModalUi(modal);

    const item = findItemWithName(itemName);

    const itemCard = createItemCard(item);
    modal.appendChild(itemCard);

    if (checkItemCompatibility(characterId, item) !== 'incompatible') {
        const equipOrUnequipBtn = createEquipUnequipOrConsumeBtn(characterId, item);
        modal.appendChild(equipOrUnequipBtn);    
    } else if (checkItemCompatibility(characterId, item) === 'incompatible') {
        const incompatibleMessage = createIncompatibleItemMessageBox(item);
        modal.appendChild(incompatibleMessage);
    }


    modal.showModal();

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
                    modal.classList.remove('character-sheet-item-card');   
                } else {
                    const alert = document.querySelector('.alert');
                    const alertMessage = document.querySelector('.alert-message');
                    alertMessage.textContent = 'You must unequip your existing item before you can equip another one in the same location';
                    alert.classList.remove('hide-element');
                    closeAlert();
                    modal.close();
                    clearModal(modal);
                    modal.classList.remove('character-sheet-item-card');
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
                modal.classList.remove('character-sheet-item-card');
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
                modal.classList.remove('character-sheet-item-card');
            });
    
            return unequipItemBtn;
        }
    }
    
    function createIncompatibleItemMessageBox(item) {
        const messageBox = document.createElement('div');
        messageBox.setAttribute('class', 'incompatible-message');
    
        const message = document.createElement('p');
        message.textContent = `${item.name} is incompatible and can't be equipped.`;
        
        messageBox.appendChild(message);
    
        return messageBox;
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
    itemImage.setAttribute('class', 'equipped-item-image');
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
    element.value = currentNum === 0 ? currentNum : currentNum - 1;
    if (currentNum === 0) {
        return
    }
    updateCharacterStats(element);
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

    // if (checkItemCompatibility(characterId, item) === 'incompatible') {
    //     alert('This item can\'t be equipped. Please reference the item card to see why it can\'t be used.');
    //     return;
    // }

    // if (item.equippedLocation === 'extra' && !isExtraItemContainerAvailable(characterId, item)) {
    //     alert(`${item.name} can\'t be equipped. Please unequip one of your extra items to equip ${item.name}.`);
    //     return;
    // }

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

function getTotalDefendDiceFromBucket(character) {
    const defendDiceModifiers = character.defendDiceBucket;
    let numOfDefendDice = 0;

    defendDiceModifiers.forEach(modifier => numOfDefendDice += modifier.defendDice);

    return numOfDefendDice;
}

function getTotalBodyPointsFromBucket(character) {
    const bodyPointsModifiers = character.bodyPointsBucket;
    let numOfBodyPoints = 0

    bodyPointsModifiers.forEach(modifier => numOfBodyPoints += modifier.bodyPoints);

    return numOfBodyPoints;
}

function getTotalMindPointsFromBucket(character) {
    const mindPointsModifiers = character.mindPointsBucket;
    let numOfBodyPoints = 0;

    mindPointsModifiers.forEach(modifier => numOfBodyPoints += modifier.mindPoints);

    return numOfBodyPoints;
}

function getWeaponsAndArmor(characterId) {
    const weaponsAndArmorElements = document.getElementById(`character-${characterId}-weapons-armor`).querySelectorAll('li');
    const weaponsAndArmor = [...weaponsAndArmorElements].map(element => findItemWithId(element.dataset.characterItemId));
    return weaponsAndArmor;
}

function increaseNumber(element, maxNum) {
    const currentNum = parseInt(element.value);
    element.value = currentNum < maxNum || !maxNum ? currentNum + 1 : currentNum;
    if (currentNum === maxNum) {
        return
    }
    updateCharacterStats(element);
}

function isCurrentCharacter(character) {
    const characters = getCharacters();
    return characters.some(storedCharacter => storedCharacter.characterId === character.characterId);
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

function removeItemFromBucket(character, item) {
    const modifiers = item.modifiers;
    let modifierIndex = '';

    // If auto update stats is off, don't try to remove item from bucket
    if (!character.autoUpdateStatus) {
        return;
    }

    for (const statToModify in modifiers) {
        switch (statToModify) {
            case 'attackDice':
                modifierIndex = character.attackDiceBucket.findIndex(modifier => modifier.origin === item.name); 
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
                character.defendDiceBucket.splice(modifierIndex, 1);
                break;
            case 'bodyPoints':
                modifierIndex = character.bodyPointsBucket.findIndex(modifier => modifier.origin === item.name);
                if (modifierIndex === -1) {
                    console.log('Can\'t find item to remove from body points bucket.');
                    return;
                }
                character.bodyPointsBucket.splice(modifierIndex, 1);
                break;
            case 'mindPoints':
                modifierIndex = character.mindPointsBucket.findIndex(modifier => modifier.origin === item.name);
                if (modifierIndex === -1) {
                    console.log('Can\'t find item to remove from mind points bucket.');
                    return;
                }
                character.mindPointsBucket.splice(modifierIndex, 1);
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

    const itemElementToRemove = document.querySelector(`.equippable-item#character-${characterId}-${item.id}`).parentNode;
    itemElementToRemove.remove();
    
    const characters = getCharacters();
    const character = characters.find(character => character.characterId === parseInt(characterId));
    if (!character) {
        console.log('Function removeItemFromCharacter didn\'t find a character to remove item from.');
        return;
    }

    if (character.weaponsAndArmor.find(weaponOrArmor => weaponOrArmor.name === item.name)) {
        const index = character.weaponsAndArmor.findIndex(weaponOrArmor => weaponOrArmor.name === item.name);
        index === -1 ? console.log('Can\'t find weapon or armor to remove from character.') : character.weaponsAndArmor.splice(index, 1);
    } else if (character.potionsAndItems.find(potionOrItem => potionOrItem.name === item.name)) {
        const index = character.potionsAndItems.findIndex(potionOrItem => potionOrItem.id === item.id);
        if (index != -1) {
            character.potionsAndItems.splice(index, 1);
        }
    }

    storeCharacters(characters);
}

/*********** CHECK IS THIS FUNCTION IS STILL BEING USED ***********/
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

function showOrHideIncreaseDecreaseBtns(character) {
    const characterSheet = document.getElementById(`character-${character.characterId}`);
    const decreaseBtns = characterSheet.querySelector('.initial-stats').querySelectorAll('.decrease-number-btn');
    const increaseBtns = characterSheet.querySelector('.initial-stats').querySelectorAll('.increase-number-btn');

    increaseBtns.forEach(button => button.classList.toggle('hide-element'));
    decreaseBtns.forEach(button => button.classList.toggle('hide-element'));
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

function updateCharacterStats(element) {
    let changedStat = '';
    let characterId = '';
    const splitElementId = element.id.split('-');

    if (splitElementId.length === 3) {
        changedStat = splitElementId[0] + '-' + splitElementId[1];
        characterId = splitElementId[2];    
    } else {
        changedStat = splitElementId[0];
        characterId = splitElementId[1];
    }
    
    const character = getStoredCharacter(characterId);

    switch (changedStat) {
        case 'attack-dice':
            character.attackDice = parseInt(element.value);
            break;
        case 'defend-dice':
            character.defendDice = parseInt(element.value);
            break;
        case 'body':
            character.startBodyPts = parseInt(element.value);
            break;
        case 'mind':
            character.startMindPts = parseInt(element.value);
            break;
        case 'body-points':
            character.bodyPts = parseInt(element.value);
            break;
        case 'gold-coins':
            character.goldCoins = parseInt(element.value);
            break;
    }

    storeCharacter(character);
}

const displayCharacters = (function () {
    // Initializtion
    const characters = getCharacters();
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