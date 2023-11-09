function createItemsList(classification) {
    const listContainer = document.createElement('div');

    const itemsListHeader = document.createElement('h4');
    const listName = classification.charAt(0).toUpperCase() + classification.slice(1);
    itemsListHeader.textContent = listName;
    listContainer.appendChild(itemsListHeader);

    const itemsList = document.createElement('ul');
    const listItems = items.filter(item => item?.type === classification);

    listItems.forEach(item => {
        const itemsLi = document.createElement('li');

        const itemAnchor = document.createElement('a');
        itemAnchor.setAttribute('href', `#${item.id}`);
        itemAnchor.textContent = item.name;

        itemsLi.appendChild(itemAnchor);
        itemsList.appendChild(itemsLi);
    });

    listContainer.appendChild(itemsList);

    return listContainer;
}

(function addItems() {
    const itemsContainer = document.getElementById('items-container');

    const treasureList = createItemsList('treasure');
    itemsContainer.appendChild(treasureList);

    const artifactList = createItemsList('artifact');
    itemsContainer.appendChild(artifactList);

    const itemsList = createItemsList('equipment');
    itemsContainer.appendChild(itemsList);
})();