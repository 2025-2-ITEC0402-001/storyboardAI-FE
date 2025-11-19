import { createContext, useState } from "react";
import { createPortal } from "react-dom";

const PortalContext = createContext<HTMLDivElement | null>(null);

interface PortalProviderProps {
    children: React.ReactNode;
}

const PortalProvider = ({ children }: PortalProviderProps) => {
    const [portalContainerRef, setPortalContainerRef] = useState<HTMLDivElement | null>(null);

    return (
        <PortalContext.Provider value={portalContainerRef}>
            {children}
            <div
                id="portal-root"
                className="fixed"
                ref={(elem) => {
                    if (portalContainerRef !== null || elem === null) {
                        return;
                    }

                    setPortalContainerRef(elem);
                }}
            />
        </PortalContext.Provider>
    );
};

interface PortalConsumerProps {
    children: React.ReactNode;
}

const PortalConsumer = ({ children }: PortalConsumerProps) => {
    return (
        <PortalContext.Consumer>
            {(portalContainerRef) => {
                if (portalContainerRef === null) {
                    return null;
                }
                return createPortal(children, portalContainerRef);
            }}
        </PortalContext.Consumer>
    );
};

export const GlobalPortal = {
    Provider: PortalProvider,
    Consumer: PortalConsumer,
};
