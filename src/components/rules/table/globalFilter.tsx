import React from 'react';
import { FormControl } from 'react-bootstrap';
import { getContent } from '../../../utils/contentUtils';

interface GlobalFilterPros {
    filter: any,
    setFilter: any,
    className: string
}

export const GlobalFilter = (props: GlobalFilterPros): JSX.Element => (
    <FormControl
        value={props.filter || ''}
        onChange={(e) => props.setFilter(e.target.value)}
        placeholder={getContent('rulesEngine.rulesList.searchPlaceholder')}
        className={props.className}
    />
);
