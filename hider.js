(function () {
    var retryCount = 0,
        retryLimit = 100,
        retryInterval = 100;

    function hideChat() {
        var hideLink = document
                .evaluate(
                    '//*[text()="Hide Chat"]',
                    document,
                    null,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
                ).snapshotItem(0),
            closeLink = document.getElementById('right_close');

        if (hideLink && closeLink) {
            hideLink.click();
            closeLink.click();
        } else if (++retryCount < retryLimit) {
            window.setTimeout(hideChat, retryInterval);
        } else {
            console.error('Twitch Chat Hider: could not click the hide link');
        }
    }

    var chTag = document.getElementById('TwitchChatHider'),
        channelList = chTag.getAttribute('data-list').split(','),
        action = chTag.getAttribute('data-action'),
        channel = window.location.pathname.substr(1);

    if (action === 'show') {
        if (channelList.indexOf(channel) !== -1) {
            hideChat();
        }
    } else if (action === 'hide') {
        if (channelList.indexOf(channel) === -1) {
            hideChat();
        }
    }
})();