function storeCharacters(characters) {
    localStorage.setItem('characterList', JSON.stringify(characters));
}

function getCharacters() {
    const characters = JSON.parse(localStorage.getItem('characterList'));
    if (heroes === null || heroes.length === 0) {
        alert('Input your characters before starting your quest');
    } else {
        return heroes;
    }
}
