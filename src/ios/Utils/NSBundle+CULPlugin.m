//
//  NSBundle+OPENAPPPlugin.m
//
//  Created by Nikolay Demyankov on 15.09.15.
//

#import "NSBundle+OPENAPPPlugin.h"

@implementation NSBundle (OPENAPPPlugin)

+ (NSString *)pathToCordovaConfigXml {
    return [[NSBundle mainBundle] pathForResource:@"config" ofType:@"xml"];
}

@end
