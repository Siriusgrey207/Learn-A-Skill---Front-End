import React, { useState } from "react";

type LazyInfoLoadingProps = {
    info: string;
};

const LazyInfoLoading: React.FC<LazyInfoLoadingProps> = (props) => {
    const { info } = props;

    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(true);
    };

    return (
        <div className="lazy-info-loading">
            {!isVisible && (
                <span className="toggle-span" onClick={handleClick}>
                    Show Phone Number
                </span>
            )}
            {isVisible && <span>{info}</span>}
        </div>
    );
};

export default LazyInfoLoading;
