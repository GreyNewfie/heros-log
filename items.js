function createItemsList(classification) {
    const listContainer = document.createElement('div');

    const itemsListHeader = document.createElement('h4');
    itemsListHeader.setAttribute('class', 'items-list-header');
    itemsListHeader.setAttribute('id', `${classification}-items`);
    const capitalizeListName = classification.charAt(0).toUpperCase() + classification.slice(1);
    itemsListHeader.textContent = capitalizeListName;
    listContainer.appendChild(itemsListHeader);

    const icon = getListHeaderIcon(classification);
    itemsListHeader.prepend(icon);

    const itemsList = document.createElement('ul');
    const listItems = items.filter(item => item?.type === classification);

    listItems.forEach(item => {
        const itemsLi = document.createElement('li');

        const itemAnchor = document.createElement('a');
        itemAnchor.setAttribute('href', `#${item.id}`);
        itemAnchor.setAttribute('class', 'list-item');
        itemAnchor.textContent = item.name;

        itemAnchor.addEventListener('click', (event) => {
            const itemCard = createItemCard(event.target.textContent);
            const cardContainer = document.getElementById('items-card-container');
            const instructionCard = document.querySelector('.instruction-card');

            if (instructionCard) {
                instructionCard.remove();
            } else {
                const currentItemCard = document.querySelector('.item-card');
                currentItemCard.remove();
            }
            
            cardContainer.appendChild(itemCard);
        });

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

function createInstructionCard() {
    const instructionCard = document.createElement('div');
    instructionCard.setAttribute('class', 'instruction-card');
    
    const instructionCardHeader = document.createElement('h3');
    instructionCardHeader.textContent = 'Welcome to the Items Library';
    instructionCard.appendChild(instructionCardHeader);

    const instructionCardP = document.createElement('p');
    instructionCardP.textContent = 'Select an item from the right to reveal it\'s power and expand your understanding of it\'s capabilities... or to simply refresh your elderly heroes memory.';
    instructionCard.appendChild(instructionCardP);

    return instructionCard;
}

// *** Not being used ***
function removeInstructionCard() {
    const instructionCard = document.querySelector('.instruction-card');
    instructionCard.remove();
}

(function displayInstructionCard() {
    const itemsCardContainer = document.getElementById('items-card-container');

    const instructionCard = createInstructionCard();
    itemsCardContainer.appendChild(instructionCard);
})();

function getListHeaderIcon(classification) {
    const icon = document.createElement('img');
    icon.setAttribute('class', 'items-header-icon');

    switch (classification) {
        case 'treasure':
            icon.setAttribute('src', 'images/treasure-icon-blk.png');
            icon.setAttribute('alt', 'Treasure chest');
            break;
        case 'artifact':
            icon.setAttribute('src', 'images/artifact-icon-blk.png');
            icon.setAttribute('alt', 'Hands holding up a vase');
            break;
        case 'equipment':
            icon.setAttribute('src', 'images/equipment-icon-blk.png');
            icon.setAttribute('alt', 'A shield with a pair of crossed swords behind it');
    }   

    return icon;
}

function createItemCard(itemName) {
    const item = items.find(item => item.name === itemName);

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

(function searchItems() {
    const searchInput = document.querySelector('[data-search]');
    // const listItemElements = document.querySelectorAll('#items-container a');
    const treasureItems = document.querySelector('#treasure-items + ul').querySelectorAll('a');
    const artifactItems = document.querySelector('#artifact-items + ul').querySelectorAll('a');
    const equipmentItems = document.querySelector('#equipment-items + ul').querySelectorAll('a');
    const itemsListElements = [treasureItems, artifactItems, equipmentItems];

    const treasureItemsHeader = document.getElementById('treasure-items');
    const artifactItemsHeader = document.getElementById('artifact-items')
    const equipmentItemsHeader = document.getElementById('equipment-items');

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();

        itemsListElements.forEach(itemsList => {
            let allHidden = true;

            itemsList.forEach(item => {
                const lowerCaseItemName = item.innerText.toLowerCase();
                const isVisible = lowerCaseItemName.includes(value);
                item.classList.toggle('hide', !isVisible);

                if (isVisible) {
                    allHidden = false;
                }
            });

            switch (itemsListElements.indexOf(itemsList)) {
                case 0:
                    treasureItemsHeader.classList.toggle('hide', allHidden);
                    break;
                case 1:
                    artifactItemsHeader.classList.toggle('hide', allHidden);
                    break;
                case 2:
                    equipmentItemsHeader.classList.toggle('hide', allHidden);
                    break;
            }

        });    


        // listItemElements.forEach(itemElement => {
        //     const lowerCaseItemName = itemElement.innerText.toLowerCase();
        //     const isVisible = lowerCaseItemName.includes(value);
        //     itemElement.classList.toggle('hide', !isVisible);
        // });
    });
})();