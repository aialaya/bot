import { LitElement } from 'lit';
export declare class W3mAllWalletsSearch extends LitElement {
    static styles: import("lit").CSSResult;
    private prevQuery;
    private prevBadge?;
    private loading;
    private query;
    private badge?;
    render(): import("lit").TemplateResult<1>;
    private onSearch;
    private walletsTemplate;
    private onConnectWallet;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-all-wallets-search': W3mAllWalletsSearch;
    }
}
