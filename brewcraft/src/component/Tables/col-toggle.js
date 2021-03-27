import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Input } from "reactstrap";
import "./bootstraptable.scss";

const ColToggle = ({ columns, onColumnToggle, toggles }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="inline_align">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        className="select_checkbox"
        
      >
        <DropdownToggle color="primary">Dropdown <i className="mdi mdi-chevron-down"></i></DropdownToggle>
        
        <DropdownMenu>
          {columns
            .map((column) => ({
              ...column,
              toggle: toggles[column.dataField],
            }))
            .map((column) => (
              <div
                type="span"
                key={column.dataField}
                className={"select_checkbox__ele"}
                data-toggle="button"
                aria-pressed={column.toggle ? "true" : "false"}
                onClick={() => onColumnToggle(column.dataField)}
              >
                <Input type="checkbox" checked={column.toggle} />
                {column.text}
              </div>
            ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export { ColToggle };
