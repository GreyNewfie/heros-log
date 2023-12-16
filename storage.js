function storeCharacter(character) {
    const characters = getCharacters();
    const characterIndex = characters.findIndex(storedcharacter => storedcharacter.characterId === parseInt(character.characterId));
    characters[characterIndex] = character;
    storeCharacters(characters);
}

function storeCharacters(characters) {
    localStorage.setItem('characterList', JSON.stringify(characters));
}

function getCharacters() {
    const characters = localStorage.getItem('characterList');

    return characters ? JSON.parse(characters) : [];
}

function getStoredCharacter(characterId) {
    const characters = getCharacters();
    const foundCharacter = characters.find(character => character.characterId === parseInt(characterId));
    return foundCharacter;
}

function storeQuest(quest, heroes) {
    const status = quest.querySelector('select').value;

    if (!localStorage.getItem('storedQuests')) {
        storedQuests = [];
        const id = quest.id;
        const storedQuest = {id, status, heroes};
        storedQuests.push(storedQuest);    
    } else {
        storedQuests = JSON.parse(localStorage.getItem('storedQuests'));
        const storedQuest = storedQuests.find(storedQuest => storedQuest.id === quest.id);
            if (storedQuest) {
                storedQuest.status = status;
                storedQuest.heroes = heroes;
            } else {
                const id = quest.id;
                const storedQuest = {id, status, heroes};
                storedQuests.push(storedQuest);        
            }
    }
    localStorage.setItem('storedQuests', JSON.stringify(storedQuests));
}

function getStoredQuests() {
    const storedQuests = localStorage.getItem('storedQuests');
    return storedQuests ? JSON.parse(storedQuests) : [];
}

function deleteQuest(quest) {
    const storedQuests = getStoredQuests();
    const index = storedQuests.findIndex(storedQuest => storedQuest.id === quest.id);
    storedQuests.splice(index, 1);
    localStorage.setItem('storedQuests', JSON.stringify(storedQuests));
}

function getStoredQuest(quest) {
    const storedQuests = getStoredQuests();
    const questId = `quest-${quest.id}-sheet`;
    if (storedQuests) {
        const foundQuest = storedQuests.find(storedQuest => storedQuest.id === questId);
        return foundQuest;
    } else {
        return undefined;
    }
}

function removeStoredCharacterWeapon(characterId, weaponName) {
    const characters = getCharacters();
    const characterIndex = characters.findIndex(character => character.characterId === parseInt(characterId));

    if (characterIndex !== -1) {
        const character = characters[characterIndex];
        const characterWeapons = character.weapons || [];

        const weaponIndex = characterWeapons.indexOf(weaponName);
        if (weaponIndex !== -1) {
            characterWeapons.splice(weaponIndex, 1);
            storeCharacters(characters);
        }
    }
}

function removeItemFromEquippedItems(characterId, item) {
    const characters = getCharacters();
    const characterIndex = characters.findIndex(character => character.characterId === parseInt(characterId));

    if (characterIndex != -1) {
        const character = characters[characterIndex];
        const itemToRemoveIndex = character.equippedItems.findIndex(equippedItem => equippedItem.id === item.id);

        if(itemToRemoveIndex != -1) {
            character.equippedItems.splice(itemToRemoveIndex, 1);
            storeCharacters(characters);
        }
    }
}

function storeEquippedItemToCharacter(characterId, item) {
    const characters = getCharacters();
    const characterIndex = characters.findIndex(character => character.characterId === parseInt(characterId));

    if (characterIndex != -1) {
        const character = characters[characterIndex];
        character.equippedItems.push(item);
        storeCharacters(characters);
    }
}
