function storeCharacters(characters) {
    localStorage.setItem('characterList', JSON.stringify(characters));
    console.log(JSON.stringify(characters));
}