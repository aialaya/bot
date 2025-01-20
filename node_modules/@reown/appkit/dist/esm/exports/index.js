import { CoreHelperUtil } from '@reown/appkit-core';
import { AppKit } from '../src/client.js';
import { PACKAGE_VERSION } from './constants.js';
// -- Views ------------------------------------------------------------
export * from '@reown/appkit-scaffold-ui';
// -- Utils & Other -----------------------------------------------------
export * from '../src/utils/index.js';
export { CoreHelperUtil, AccountController } from '@reown/appkit-core';
export function createAppKit(options) {
    return new AppKit({
        ...options,
        sdkVersion: CoreHelperUtil.generateSdkVersion(options.adapters ?? [], 'html', PACKAGE_VERSION)
    });
}
export { AppKit };
//# sourceMappingURL=index.js.map