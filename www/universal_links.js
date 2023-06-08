var exec = require ( 'cordova/exec' );

var universalLinks = {

    PLUGIN_NAME        : 'UniversalLinks',
    DEFAULT_EVENT_NAME : 'didLaunchAppFromLink',

    NATIVE_METHOD_SUBSCRIBE   : 'subscribeForEvent',
    NATIVE_METHOD_UNSUBSCRIBE : 'unsubscribeFromEvent',

    /**
     * Subscribe to event.
     * If plugin already captured that event - callback will be called immidietly.
     *
     * @param {String} eventName - name of the event you are subscribing on; if null - default plugin event is used
     * @param {Function} callback - callback that is called when event is captured
     */
    subscribe : function ( eventName, callback ) {
        if ( !callback ) {
            console.warn ( 'Universal Links: can\'t subscribe to event without a callback' );
            return;
        }

        if ( !eventName ) {
            eventName = universalLinks.DEFAULT_EVENT_NAME;
        }

        var innerCallback = function ( msg ) {
            callback ( msg.data );
        };

        exec ( innerCallback, null, universalLinks.PLUGIN_NAME, universalLinks.NATIVE_METHOD_SUBSCRIBE, [ eventName ] );
    },

    /**
     * Unsubscribe from the event.
     *
     * @param {String} eventName - from what event we are unsubscribing
     */
    unsubscribe : function ( eventName ) {
        if ( !eventName ) {
            eventName = universalLinks.DEFAULT_EVENT_NAME;
        }

        exec ( null, null, universalLinks.PLUGIN_NAME, universalLinks.NATIVE_METHOD_UNSUBSCRIBE, [ eventName ] );
    }
};

module.exports = universalLinks;
