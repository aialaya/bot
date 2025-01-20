import { LitElement } from 'lit';
export declare class W3mSIWXSignMessageView extends LitElement {
    private readonly dappName;
    private isCancelling;
    private isSigning;
    render(): import("lit").TemplateResult<1>;
    private onSign;
    private onCancel;
}
declare global {
    interface HTMLElementTagNameMap {
        'w3m-siwx-sign-message-view': W3mSIWXSignMessageView;
    }
}
