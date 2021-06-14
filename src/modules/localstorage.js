/*
function checkLocalStorage(item, projects) {
    if (window.localStorage.getItem(item)) {
        projects = JSON.parse(localStorage.getItem(item));
        console.log(item, projects);
    } else {
        projects = [];
    }
}

function updateLocalStorage(item, array) {
    window.localStorage.setItem(item, JSON.stringify(array));
}*/

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

export {storageAvailable}