function storeCharacters(characters) {
    localStorage.setItem('characterList', JSON.stringify(characters));
}

function getCharacters() {
    // const characters = localStorage.getItem('characterList');

    // return characters ? JSON.parse(characters) : [];

    // if (!characters) {
    //     return []
    // }

    // return JSON.parse(characters);    

    if (!localStorage.getItem('characterList')) {
        characters = [];
    } else {    
        characters = JSON.parse(localStorage.getItem('characterList'));
    }
    return characters;
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

function deleteQuest(quest) {
    // Change to = getStoreQuest
    const storedQuests = JSON.parse(localStorage.getItem('storedQuests'));
    const index = storedQuests.findIndex(storedQuest => storedQuest.id === quest.id);
    storedQuests.splice(index, 1);
    localStorage.setItem('storedQuests', JSON.stringify(storedQuests));
}

function getStoredQuest(quest) {
    const storedQuests = JSON.parse(localStorage.getItem('storedQuests'));
    const questId = `quest-${quest.id}-sheet`;
    if (storedQuests) {
        const foundQuest = storedQuests.find(storedQuest => storedQuest.id === questId);
        return foundQuest;
    } else {
        return undefined;
    }
}