import React, { useEffect, useContext } from 'react';
import RuleForm from './forms/ruleForm';
import StoreContext from '../../contexts/storeContext';
import { getContent } from '../../utils/contentUtils';
import ruleFormDto from '../../dtos/ruleFormDto';

function CreateRule() {
    const { navigationStore, rulesEngineStore, appStore } = useContext(StoreContext);

    const handleCancel = () => {
        navigationStore.gotoHome();
    };

    const handleSave = (form: ruleFormDto) => {
        rulesEngineStore.createRule(form);
    };

    // on mount
    useEffect(() => {
        appStore.hideAppLoader();
    }, [appStore]);

    return (
        <div>
            <h2 className="page-header">{getContent('rulesEngine.createRule.title')}</h2>
            <p className="page-instructions">{getContent('rulesEngine.createRule.instructions')}</p>
            <RuleForm
                initialValues={{
                    name: '',
                    active: true,
                    group: '',
                    category: ''
                }}
                onCancel={handleCancel}
                onSave={handleSave}
            />
        </div>
    );
}

export default CreateRule;
