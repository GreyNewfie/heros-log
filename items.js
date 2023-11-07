function createTreasureItemsList(container) {
    const treasureItemsListHeader = document.createElement('h4');
    treasureItemsListHeader.textContent = 'Treasure';
    container.appendChild(treasureItemsListHeader);

    const treasureItemsList = document.createElement('ul');

    treasure.forEach(item => {
        const itemsLi = document.createElement('li');

        const itemAnchor = document.createElement('a');
        itemAnchor.setAttribute('href', `#${item.id}`);
        itemAnchor.textContent = item.name;

        itemsLi.appendChild(itemAnchor);
        treasureItemsList.appendChild(itemsLi);
    });

    container.appendChild(treasureItemsList);
}

(function addItems() {
    const itemsContainer = document.getElementById('items-container');

    createTreasureItemsList(itemsContainer);
})();