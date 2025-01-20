import { LitElement } from 'lit';
export declare class W3mSwitchActiveChainView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    protected readonly switchToChain: import("@reown/appkit-common").ChainNamespace | undefined;
    protected readonly navigateTo: "Account" | "AccountSettings" | "AllWallets" | "ApproveTransaction" | "BuyInProgress" | "WalletCompatibleNetworks" | "ChooseAccountName" | "Connect" | "Create" | "ConnectingExternal" | "ConnectingFarcaster" | "ConnectingWalletConnect" | "ConnectingWalletConnectBasic" | "ConnectingSiwe" | "ConnectingSocial" | "ConnectSocials" | "ConnectWallets" | "Downloads" | "EmailVerifyOtp" | "EmailVerifyDevice" | "GetWallet" | "Networks" | "OnRampActivity" | "OnRampFiatSelect" | "OnRampProviders" | "OnRampTokenSelect" | "Profile" | "RegisterAccountName" | "RegisterAccountNameSuccess" | "SwitchNetwork" | "SwitchAddress" | "Transactions" | "UnsupportedChain" | "UpdateEmailWallet" | "UpdateEmailPrimaryOtp" | "UpdateEmailSecondaryOtp" | "UpgradeEmailWallet" | "WalletReceive" | "WalletSend" | "WalletSendPreview" | "WalletSendSelectToken" | "WhatIsANetwork" | "WhatIsAWallet" | "WhatIsABuy" | "Swap" | "SwapSelectToken" | "SwapPreview" | "ConnectingMultiChain" | "SwitchActiveChain" | "SmartSessionCreated" | "SmartSessionList" | "SIWXSignMessage" | undefined;
    protected readonly navigateWithReplace: boolean | undefined;
    protected readonly caipNetwork: import("@reown/appkit-common").CaipNetwork | undefined;
    activeChain: import("@reown/appkit-common").ChainNamespace | undefined;
    firstUpdated(): void;
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private switchActiveChain;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-switch-active-chain-view': W3mSwitchActiveChainView;
    }
}
