import React, { Fragment } from 'react';
import {Input} from 'reactstrap';

export default function ItemSelect( props ){

    const {changefn, value, name} = props;
   
    return <Fragment>
            <Input type="select" name={name} onChange={changefn} value={value} >
                <option value="" disabled defaultValue="">Select </option>
                {props.children}
            </Input>
    </Fragment>
    
}