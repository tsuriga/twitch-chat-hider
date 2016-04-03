var s = document.createElement('script');

s.id = 'TwitchChatHider';
s.src = chrome.extension.getURL('hider.js');

chrome.storage.sync.get({
    action: 'hide',
    list: ''
}, function (items) {
    s.setAttribute('data-list', items.list);
    s.setAttribute('data-action', items.action);

    (document.head || document.documentElement).appendChild(s);

    s.addEventListener('load', function () {
        this.parentNode.removeChild(this);
    });
});
