function storeCharacters(characters) {
    localStorage.setItem('characterList', JSON.stringify(characters));
}

function getCharacters() {
    if (!localStorage.getItem('characterList')) {
        characters = [];
    } else {    
        characters = JSON.parse(localStorage.getItem('characterList'));
    }

    if (characters === null || characters.length === 0) {
        alert('Input your characters before starting your quest');
    } else {
        return characters;
    }
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