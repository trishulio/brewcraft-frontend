import React, { useRef } from "react";

const Loading = () => {
    return (
        <div style={{ width: "100%" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};

export const ContentLoader = (props) => {
    const targetRef = useRef();
    return (
        <React.Fragment>
            <div ref={targetRef}>
                {props.isLoading && (
                    <div
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            width: targetRef.current?.offsetWidth,
                            height: targetRef.current?.offsetHeight,
                            position: "absolute",
                            zIndex: 1,
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <Loading />
                    </div>
                )}
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default Loading;
