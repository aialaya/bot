import { type ConnectorWithProviders } from '@reown/appkit-core';
export declare const ConnectorUtil: {
    getConnectorsByType(connectors: ConnectorWithProviders[]): {
        custom: import("@reown/appkit-core").CustomWallet[] | undefined;
        recent: import("@reown/appkit-core").WcWallet[];
        external: ConnectorWithProviders[];
        multiChain: ConnectorWithProviders[];
        announced: ConnectorWithProviders[];
        injected: ConnectorWithProviders[];
        recommended: import("@reown/appkit-core").WcWallet[];
        featured: import("@reown/appkit-core").WcWallet[];
    };
    showConnector(connector: ConnectorWithProviders): boolean;
};
