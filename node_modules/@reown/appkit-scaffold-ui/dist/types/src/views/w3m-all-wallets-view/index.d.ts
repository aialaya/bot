import { LitElement } from 'lit';
export declare class W3mAllWalletsView extends LitElement {
    private search;
    private badge?;
    render(): import("lit").TemplateResult<1>;
    private onInputChange;
    private onClick;
    private onDebouncedSearch;
    private qrButtonTemplate;
    private onWalletConnectQr;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-view': W3mAllWalletsView;
    }
}
