const addCharacterButton = document.getElementById('add-character-button');

addCharacterButton.addEventListener('click', () => {
    newCharacterSheet();
})

const newCharacterSheet = () => {
    const characterSheetDiv = document.createElement('div');
    characterSheetDiv.setAttribute('class', 'character-sheet');
    
    const characterNameDiv = document.createElement('div');
    const characterNameLabel = document.createElement('label');
    characterNameLabel.setAttribute('for', 'character-name');
    characterNameLabel.append('Name');
    const characterNameInput = document.createElement('input');
    setAttributes(characterNameInput, {'type': 'text', 'id': 'character-name', 'name': 'character-name', 'required': ''});
    characterNameDiv.append(characterNameLabel, characterNameInput);

    const characterTypeDiv = document.createElement('div');

    characterSheetDiv.append(characterNameDiv);

    const createCharacterSheetDiv = document.getElementById('create-character-sheet');
    createCharacterSheetDiv.before(characterSheetDiv);
}

function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}