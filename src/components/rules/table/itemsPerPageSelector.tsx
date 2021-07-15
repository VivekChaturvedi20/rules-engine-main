import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

interface Props {
    value: number,
    onSelect(eventKey: number): void,
    itemsPerPage: Array<number>
}

export const ItemsPerPageSelector = (props: Props): JSX.Element => {
    const options: Array<JSX.Element> = [];
    const { value, onSelect, itemsPerPage } = props;

    for (let index = 0; index < itemsPerPage.length; index++) {
        const item:number = itemsPerPage[index];
        options.push(
            <Dropdown.Item
                key={index}
                active={(value === item)}
                eventKey={item}
            >
                {item.toString()}
            </Dropdown.Item>
        );
    }

    return (
        <DropdownButton
            as={ButtonGroup}
            menuAlign="right"
            variant="light"
            title={value}
            className="navigation-dropdown"
            onSelect={(eventKey: any) => onSelect(parseInt(eventKey, 10))}
        >
            {options}
        </DropdownButton>
    );
};
