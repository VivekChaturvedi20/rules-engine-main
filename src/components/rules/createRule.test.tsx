import React from 'react';
import {
    render, cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    Router
} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import CreateRule from './createRule';
import StoreContext from '../../contexts/storeContext';
import RootStore from '../../stores/rootStore';

afterEach(cleanup);

let rootStore: RootStore;

beforeEach(() => {
    rootStore = new RootStore();
});

test('createRule render', async () => {
    const history = createMemoryHistory();
    history.push('/rules/create');

    const dom = render(
        <StoreContext.Provider value={rootStore}>
            <Router history={history}>
                <CreateRule />
            </Router>
        </StoreContext.Provider>
    );

    // check if input values are defaults
    const nameInput = dom.getByTestId('name');
    expect(nameInput.value).toBe('');
    const activeInput = dom.getByTestId('active');
    expect(activeInput.checked).toBe(true);
    const groupInput = dom.getByTestId('group');
    expect(groupInput.value).toBe('');
    const categoryInput = dom.getByTestId('category');
    expect(categoryInput.value).toBe('');
});
