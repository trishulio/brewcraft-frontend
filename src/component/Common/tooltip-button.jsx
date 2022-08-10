import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";

export default function TooltipButton({
    tooltipText,
    placement,
    id,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <React.Fragment>
            {tooltipText && (
                <Tooltip
                    placement={placement || "auto"}
                    isOpen={isOpen}
                    target={`tooltip-${id}`}
                    toggle={() => setIsOpen(!isOpen)}
                >
                    {tooltipText}
                </Tooltip>
            )}
            <Button
                id={`tooltip-${id}`}
                className={props.className || "waves-effect"}
                {...props}
            >
                {props.children}
            </Button>
        </React.Fragment>
    );
}
