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
    if (!localStorage.getItem('storedQuests')) {
        storedQuests = [];
    } else {
        storedQuests = JSON.parse(localStorage.getItem('storedQuests'));
    }
    const id = quest.id;
    const status = quest.querySelector('select').value;
    const storedQuest = {id, status, heroes};
    storedQuests.push(storedQuest);
    localStorage.setItem('storedQuests', JSON.stringify(storedQuests));
}