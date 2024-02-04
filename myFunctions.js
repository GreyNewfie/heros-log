function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function addTypeOptions(parent, types) {
    for (let type in types) {
        const typeOption = document.createElement('option');
        typeOption.setAttribute('value', type);
        typeOption.append(`${types[type]}`);
        parent.appendChild(typeOption);
    }
}

function closeAlert() {
    const alertCloseBtn = document.querySelector('.alert-close-btn');
    const alert = document.querySelector('.alert');

    alertCloseBtn.addEventListener('click', () => {
        alert.classList.add('hide-element');
    });
}
