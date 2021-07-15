import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { getContent } from '../../utils/contentUtils';
import RuleForm from './forms/ruleForm';
import UpdateRuleDto from '../../dtos/updateRuleDto';
import RuleFormDto from '../../dtos/ruleFormDto';
import StoreContext from '../../contexts/storeContext';
// import styles from './updateRule.module.scss';

function UpdateRule() {
    const { navigationStore, rulesEngineStore, appStore } = useContext(StoreContext);
    const params:any = useParams();

    const handleCancel = () => {
        navigationStore.gotoHome();
    };

    const handleSave = (form: RuleFormDto) => {
        rulesEngineStore.updateRule(form);
    };

    // on mount
    useEffect(() => {
        rulesEngineStore.initRuleUpdate(params.id);
    }, [rulesEngineStore, params.id]);

    let formComponent;

    if (!appStore.loading) {
        const rule: UpdateRuleDto = rulesEngineStore.ruleToUpdate;

        formComponent = (
            <RuleForm
                initialValues={{
                    id: rule.id,
                    name: rule.name,
                    group: rule.group,
                    category: rule.category,
                    active: rule.active
                }}
                onCancel={handleCancel}
                onSave={handleSave}
            />
        );
    }

    return (
        <div className="page">
            <h2 className="page-header">{getContent('rulesEngine.updateRule.title')}</h2>
            <p className="page-instructions">{getContent('rulesEngine.updateRule.instructions')}</p>
            {formComponent}
        </div>
    );
}

export default observer(UpdateRule);
