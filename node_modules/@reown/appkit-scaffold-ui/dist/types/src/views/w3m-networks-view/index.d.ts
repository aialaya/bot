import { type CaipNetwork } from '@reown/appkit-common';
import { LitElement } from 'lit';
export declare class W3mNetworksView extends LitElement {
    static styles: import("lit").CSSResult;
    private unsubscribe;
    network: CaipNetwork | undefined;
    requestedCaipNetworks: CaipNetwork[];
    private filteredNetworks?;
    private search;
    constructor();
    disconnectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
    private templateSearchInput;
    private onInputChange;
    private onDebouncedSearch;
    private onNetworkHelp;
    private networksTemplate;
    private getNetworkDisabled;
    private onSwitchNetwork;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-networks-view': W3mNetworksView;
    }
}
