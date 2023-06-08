//
//  CDVInvokedUrlCommand+OPENAPPPlugin.m
//
//  Created by Nikolay Demyankov on 08.12.15.
//

#import "CDVInvokedUrlCommand+OPENAPPPlugin.h"

@implementation CDVInvokedUrlCommand (OPENAPPPlugin)

- (NSString *)eventName {
    if (self.arguments.count == 0) {
        return nil;
    }
    
    return self.arguments[0];
}

@end
