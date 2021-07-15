import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { getContent } from '../../../utils/contentUtils';
import StoreContext from '../../../contexts/storeContext';

interface CreatRuleButtonProps {
    className: string
}

export const CreateRuleButton = (props: CreatRuleButtonProps) => {
    const { navigationStore } = useContext(StoreContext);

    const handleGotoCreateRule = () => {
        navigationStore.gotoCreateRule();
    };

    return (
        <Button variant="primary" className={props.className} onClick={handleGotoCreateRule}>
            {getContent('rulesEngine.rulesList.buttons.createRule')}
            &nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon icon={['fas', 'plus']} size="xs" />
        </Button>
    );
};
