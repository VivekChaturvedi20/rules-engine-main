import React from 'react';
import {
    render, cleanup
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RulesList from './rulesList';
import StoreContext from '../../contexts/storeContext';
import RootStore from '../../stores/rootStore';

afterEach(cleanup);

let rootStore:RootStore;

beforeEach(() => {
    rootStore = new RootStore();
});

// TODO: Re-write this test
test('RulesList render', async () => {
    const dom = render(<StoreContext.Provider value={rootStore}><RulesList /></StoreContext.Provider>);
    expect(dom.container).toBeInTheDocument();
});
