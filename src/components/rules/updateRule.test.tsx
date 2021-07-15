import React from 'react';
import {
    render, waitFor, cleanup, queryByAttribute
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    Router
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import UpdateRule from './updateRule';
import StoreContext from '../../contexts/storeContext';
import RootStore from '../../stores/rootStore';
import * as RulesService from '../../services/rulesService';

afterEach(cleanup);

let rootStore: RootStore;

beforeEach(() => {
    rootStore = new RootStore();
});

test('updateRule render', async () => {
    const history = createMemoryHistory();
    history.push('/rules/testRule');

    const dom = render(
        <StoreContext.Provider value={rootStore}>
            <Router history={history}>
                <UpdateRule />
            </Router>
        </StoreContext.Provider>
    );

    await (await waitFor(() => expect(RulesService.getRuleById))).toHaveBeenCalled();

    // check if input values match mock API
    const nameInput = dom.getByTestId('name');
    expect(nameInput.value).toBe('Bussines Rule to Update');
    const activeInput = dom.getByTestId('active');
    expect(activeInput.checked).toBe(true);
    const groupInput = dom.getByTestId('group');
    expect(groupInput.value).toBe('Group');
    const categoryInput = dom.getByTestId('category');
    expect(categoryInput.value).toBe('Category');
});
