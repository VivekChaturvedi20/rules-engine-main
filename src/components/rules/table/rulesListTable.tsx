import React from 'react';
import {
    useTable, useSortBy, useGlobalFilter, usePagination
} from 'react-table';
import {
    Button, InputGroup, Table
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './rulesListTable.module.scss';
import { GlobalFilter } from './globalFilter';
import { CreateRuleButton } from './createRuleButton';
import { PageSelector } from './pageSelector';
import { ItemsPerPageSelector } from './itemsPerPageSelector';
import { resolveToken } from '../../../utils/stringUtils';
import { getContent } from '../../../utils/contentUtils';

interface Props {
    columns: {
        Header: string;
        accessor: string;
    },
    data: {
        name: string,
        group: string,
        status: string
        category: string
    }[]
}

function RulesListTable(props: Props): JSX.Element {
    const { columns, data } = props;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        pageOptions,
        pageCount,
        gotoPage,
        prepareRow,
        setPageSize,
        rows,
        state: {
            globalFilter, pageIndex, pageSize
        },
        setGlobalFilter
    } = useTable(
        {
            columns,
            data
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const getHeaderClass = (column: any) => {
        if (column.isSorted) {
            return (column.isSortedDesc) ? styles['sorted-desc'] : styles['sorted-asc'];
        }
        return styles['not-sorted'];
    };

    // Render the UI for your table
    return (
        <>
            <div className={styles['data-table-container']}>
                <InputGroup className={styles['search-container']}>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} className={styles['search-container-field']} />
                    <div className={styles['search-container-icon']}>
                        <FontAwesomeIcon icon={['fas', 'search']} flip="horizontal" />
                    </div>
                    <InputGroup.Append>
                        <CreateRuleButton className={styles['search-container-button']} />
                    </InputGroup.Append>
                </InputGroup>
                <div className={styles['data-table']}>
                    <Table {...getTableProps()} responsive>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className={getHeaderClass(column)}>
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map((row: any) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell: any) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className={styles['paginator-container']}>
                    <div className={styles['paginator-container-left']}>
                        <div className={styles['section-one']}>
                            {getContent('rulesEngine.rulesList.pagination.pageSize')}
                            <ItemsPerPageSelector value={pageSize} onSelect={setPageSize} itemsPerPage={[10, 25, 50, 100, 200]} />
                        </div>
                        <div className={styles['section-two']}>
                            {resolveToken(getContent('rulesEngine.rulesList.pagination.itemsShown'), { pageSize, itemCount: rows.length })}
                        </div>
                    </div>
                    <div className={styles['paginator-container-right']}>
                        <div className={styles['section-one']}>
                            <PageSelector pageCount={pageOptions.length} pageIndex={pageIndex} onSelect={gotoPage} />
                            {resolveToken(getContent('rulesEngine.rulesList.pagination.navigation'), { pageCount: pageOptions.length })}
                        </div>
                        <div className={styles['section-two']}>
                            <Button onClick={() => previousPage()} className={styles['section-two-button']} disabled={!canPreviousPage}>
                                <FontAwesomeIcon icon={['fas', 'caret-left']} />
                            </Button>
                            <Button onClick={() => nextPage()} className={styles['section-two-button']} disabled={!canNextPage}>
                                <FontAwesomeIcon icon={['fas', 'caret-right']} />
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default RulesListTable;
