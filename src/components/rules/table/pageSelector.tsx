import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';

interface Props {
    pageCount: number,
    pageIndex: number,
    onSelect(eventKey: number): void
}

export const PageSelector = (props: Props): JSX.Element => {
    const options: Array<JSX.Element> = [];
    const { pageCount, pageIndex, onSelect } = props;
    const currentIndex = parseInt(pageIndex.toString(), 10) + 1;
    const convert = (index: number) => (index >= 10 ? index : `0${index}`);

    for (let index = 0; index < pageCount; index++) {
        options.push(
            <Dropdown.Item
                key={index}
                active={(currentIndex === index + 1)}
                eventKey={index}
            >
                {convert(index + 1)}
            </Dropdown.Item>
        );
    }

    return (
        <DropdownButton
            as={ButtonGroup}
            menuAlign="right"
            variant="light"
            title={convert(currentIndex)}
            className="navigation-dropdown"
            onSelect={(eventKey: any) => onSelect(parseInt(eventKey, 10))}
        >
            {options}
        </DropdownButton>
    );
};
