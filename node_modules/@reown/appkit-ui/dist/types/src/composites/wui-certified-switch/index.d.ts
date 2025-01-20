import { LitElement } from 'lit';
export declare class WuiCertifiedSwitch extends LitElement {
    static styles: import("lit").CSSResult[];
    checked?: boolean;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wui-certified-switch': WuiCertifiedSwitch;
    }
}
