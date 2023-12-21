const utils = {
    sayHello: () => {
        console.log('hello')
    },
    sayBye: () => {
        console.log('bye')
    }
}

/**
 * Webpage (UI) -> page script (app.js) -> modules (data.js)
 * The user -> glue -> core/app/logic
 */

class Utils {
    name;

    constructor(name) {
        this.name = name;
    }

    sayHello = () => {
        console.log('hello', name)
    }

    sayBye = () => {
        console.log('bye', name)
    }
}

// const Utils = new Utils('bob');

/**
 * Recommendations:
 * - page scripts
 *   - index.js (app.js)
 *   - quests.js -> questPage? or maybe put it directly in a <script> within quests.html
 *   - items.js -> itemsPage?
 * - module scripts
 *   - character
 *   - data
 *   - storage (local storage)
 *   - ui*** maybe
 */