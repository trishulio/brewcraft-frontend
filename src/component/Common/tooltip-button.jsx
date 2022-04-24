import React, { useState } from "react";
import { Button, Tooltip } from "reactstrap";

export default function TooltipButton(props) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <React.Fragment>
            {props.tooltipText && (
                <Tooltip
                    placement={props.placement || "auto"}
                    isOpen={isOpen}
                    target={`tooltip-${props.id}`}
                    toggle={() => setIsOpen(!isOpen)}
                >
                    {props.tooltipText}
                </Tooltip>
            )}
            <Button
                id={`tooltip-${props.id}`}
                className={props.className || "waves-effect"}
                size={props.size || "sm"}
                outline={!!props.outline}
                onClick={props.onClick}
            >
                {props.children}
            </Button>
        </React.Fragment>
    );
}
