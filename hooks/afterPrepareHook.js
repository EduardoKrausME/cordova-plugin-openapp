/**
 Hook is executed at the end of the 'prepare' stage. Usually, when you call 'cordova build'.

 It will inject required preferences in the platform-specific projects, based on <openapp>
 data you have specified in the projects config.xml file.
 */

var configParser              = require ( './lib/configXmlParser.js' );
var androidManifestWriter     = require ( './lib/android/manifestWriter.js' );
var iosProjectEntitlements    = require ( './lib/ios/projectEntitlements.js' );
var iosProjectPreferences     = require ( './lib/ios/xcodePreferences.js' );
var ANDROID                   = 'android';
var IOS                       = 'ios';

module.exports = function ( ctx ) {
    run ( ctx );
};

/**
 * Execute hook.
 *
 * @param {Object} cordovaContext - cordova context object
 */
function run ( cordovaContext ) {
    var pluginPreferences = configParser.readPreferences ( cordovaContext );
    var platformsList     = cordovaContext.opts.platforms;

    // if no preferences are found - exit
    if ( pluginPreferences == null ) {
        return;
    }

    // if no host is defined - exit
    if ( pluginPreferences.hosts == null || pluginPreferences.hosts.length == 0 ) {
        console.warn ( 'No host is specified in the config.xml. Universal Links plugin is not going to work.' );
        return;
    }

    platformsList.forEach ( function ( platform ) {
        switch ( platform ) {
            case ANDROID: {
                activateOpenAppInAndroid ( cordovaContext, pluginPreferences );
                break;
            }
            case IOS: {
                activateOpenAppInIos ( cordovaContext, pluginPreferences );
                break;
            }
        }
    } );
}

/**
 * Activate Deep Links for Android application.
 *
 * @param {Object} cordovaContext - cordova context object
 * @param {Object} pluginPreferences - plugin preferences from the config.xml file. Basically, content from
 *     <openapp> tag.
 */
function activateOpenAppInAndroid ( cordovaContext, pluginPreferences ) {
    // inject preferenes into AndroidManifest.xml
    androidManifestWriter.writePreferences ( cordovaContext, pluginPreferences );
}

/**
 * Activate Universal Links for iOS application.
 *
 * @param {Object} cordovaContext - cordova context object
 * @param {Object} pluginPreferences - plugin preferences from the config.xml file. Basically, content from
 *     <openapp> tag.
 */
function activateOpenAppInIos ( cordovaContext, pluginPreferences ) {
    // modify xcode project preferences
    iosProjectPreferences.enableAssociativeDomainsCapability ( cordovaContext );

    // generate entitlements file
    iosProjectEntitlements.generateAssociatedDomainsEntitlements ( cordovaContext, pluginPreferences );
}
