import React from 'react';
import ReactSwitch, { ReactSwitchProps } from 'react-switch';

function Switch(props: ReactSwitchProps) {
    return (
        /* eslint-disable react/jsx-props-no-spreading */
        <ReactSwitch {...props} onColor="#477afb" checkedIcon={false} uncheckedIcon={false} checked={props.checked} />
    );
}

export default Switch;
