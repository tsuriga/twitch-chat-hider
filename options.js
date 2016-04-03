function saveOptions(e) {
    e.preventDefault();

    var action = document.getElementById('action').value,
        list = document.getElementById('list').value
            .replace(new RegExp('\r?\n','g'), ',');

    chrome.storage.sync.set({
        action: action,
        list: list
    }, function () {
        var statusContainer = document.getElementById('status');

        statusContainer.textContent = 'Options saved';

        setTimeout(function () {
            statusContainer.textContent = '';
        }, 5000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        action: 'hide',
        list: ''
    }, function (items) {
        document.getElementById('action').value = items.action;
        document.getElementById('list').value = items.list.replace(',', '\n');
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
