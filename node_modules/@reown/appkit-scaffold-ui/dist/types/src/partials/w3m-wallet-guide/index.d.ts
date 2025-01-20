import { LitElement } from 'lit';
import { type WalletGuideType } from '@reown/appkit-core';
export declare class W3mWalletGuide extends LitElement {
    static styles: import("lit").CSSResult;
    tabIdx?: -1 | boolean;
    walletGuide: WalletGuideType;
    render(): import("lit").TemplateResult<1>;
    private onGetStarted;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-wallet-guide': W3mWalletGuide;
    }
}
