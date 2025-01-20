import { LitElement } from 'lit';
export declare class W3mAllWalletsWidget extends LitElement {
    private unsubscribe;
    tabIdx?: number;
    private connectors;
    private count;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1> | null;
    private onAllWallets;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-widget': W3mAllWalletsWidget;
    }
}
