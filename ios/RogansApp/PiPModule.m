#import "PiPModule.h"

@implementation PiPModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(enterPictureInPictureMode)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    if ([AVPictureInPictureController isPictureInPictureSupported]) {
      AVPictureInPictureController *pipController = [[AVPictureInPictureController alloc] init];
      [pipController startPictureInPicture];
    } else {
      NSLog(@"Picture-in-Picture no es compatible en este dispositivo.");
    }
  });
}

@end
