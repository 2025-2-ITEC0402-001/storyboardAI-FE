export interface ModalBackdropProps {
    children?: React.ReactNode;
}

export const ModalBackdrop = ({ children }: ModalBackdropProps) => {
    return (
        <div className="fixed w-screen h-screen bg-black/40 inset-0 flex items-center justify-center">
            {children}
        </div>
    );
};
