import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import _ from 'lodash';
import { Column } from 'react-table';
import RulesListTable from './table/rulesListTable';
import RulesListDto from '../../dtos/rulesListDto';
import StoreContext from '../../contexts/storeContext';
import { getContent } from '../../utils/contentUtils';
import styles from './rulesList.module.scss';

const RulesListContent = observer(() => {
    const { navigationStore, rulesEngineStore } = useContext(StoreContext);

    const dataArray: {
        id: string,
        name: string,
        group: string,
        status: string,
        category: string
    }[] = [];

    // on mount
    useEffect(() => {
        rulesEngineStore.initRulesList();
    }, [rulesEngineStore]);

    const getStatusText = (active:boolean) => (active ? getContent('rulesEngine.labels.active') : getContent('rulesEngine.labels.inactive'));

    _.each(rulesEngineStore.rules, (rule: RulesListDto) => dataArray.push(
        {
            id: rule.id,
            name: rule.name,
            group: rule.group,
            status: getStatusText(rule.active),
            category: rule.category
        }
    ));

    const columns:Array<Column> = React.useMemo(
        () => [
            {
                Header: getContent('rulesEngine.labels.name'),
                accessor: 'name',
                Cell: (data: any) => (
                    <Button variant="link" className={styles['rule-name-link']} onClick={() => navigationStore.gotoUpdateRule(data.row.original.id)}>
                        {data.row.values.name}
                    </Button>
                )
            },
            {
                Header: getContent('rulesEngine.labels.group'),
                accessor: 'group'
            },
            {
                Header: getContent('rulesEngine.labels.status'),
                accessor: 'status'
            },
            {
                Header: getContent('rulesEngine.labels.category'),
                accessor: 'category'
            }
        ],
        [navigationStore]
    );

    return (
        <div className="page">
            <h2 className="page-header">{getContent('rulesEngine.rulesList.title')}</h2>
            <p className="page-instructions">{getContent('rulesEngine.rulesList.instructions')}</p>
            <RulesListTable columns={columns} data={dataArray} />
        </div>
    );
});

function rulesList(): JSX.Element {
    console.log('>>> Welcome to the Rules Engine <<<<');
    return (
        <RulesListContent />
    );
}

export default rulesList;
