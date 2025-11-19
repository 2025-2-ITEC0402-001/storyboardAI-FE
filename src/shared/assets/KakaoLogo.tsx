export interface KakaoLogoProps extends React.ComponentProps<"svg"> {
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
}

export const KakaoLogo = ({ width, height, ...props }: KakaoLogoProps) => {
    return (
        <svg viewBox="0 0 24 24" fill="none" width={width} height={height} {...props}>
            <path
                d="M12 3C6.477 3 2 6.477 2 10.8C2 13.477 3.523 15.842 5.94 17.347L4.934 20.853C4.865 21.112 5.135 21.314 5.361 21.173L9.577 18.569C10.353 18.707 11.163 18.78 12 18.78C17.523 18.78 22 15.303 22 10.98C22 6.657 17.523 3 12 3Z"
                fill="#000000"
            ></path>
        </svg>
    );
};
