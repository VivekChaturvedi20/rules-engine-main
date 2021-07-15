import request from 'superagent';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ContentEnUs from '../content/en-US.json';
import * as ContentUtils from '../utils/contentUtils';
import RootStore from '../stores/rootStore';
import * as RulesService from '../services/rulesService';

library.add(fas);
const rootStore = new RootStore();

rootStore.contentStore.content = ContentEnUs;
// TODO: not a good idea, would prefer to create and destory stores within the context
// of a test suite, but for now content remains static so setting store globably won't have side effects
ContentUtils.setContentStore(rootStore.contentStore);

jest.mock('../config/config');
jest.mock('../utils/authUtils', () => ({
    getAuthInstance: () => ({
        getActiveAccount: () => ({
            userName: 'User 1'
        })
    }),
    getAccessToken: () => ({
        accessToken: 'XXXXXXXX.XXXXXX.XXXXX'
    }),
    getDefaultHeaders: () => ({
        Authorization: 'Bearer XXXXXXXX.XXXXXX.XXXXX'
    })
}));
jest.mock('../stores/loggingStore', () => jest.fn().mockImplementation(() => ({
    logError: jest.fn()
})));
jest.mock('../stores/errorStore', () => jest.fn().mockImplementation(() => ({
    addError: jest.fn()
})));

function mockSuperagent() {
    request.send = jest.fn().mockResolvedValue({
        success: true
    });
}

function mockRulesService() {
    RulesService.getRules = jest.fn().mockResolvedValue([
        {
            id: 'fb6a986f-fbdb-4f38-8268-8d0ff653724e',
            name: 'Business Rule 1',
            group: 'Group',
            category: 'Category',
            active: true
        },
        {
            id: '14817091-7564-44d9-80c2-61aab72f2c8a',
            name: 'Business Rule 2',
            group: 'Group',
            category: 'Category',
            active: true
        }
    ]);

    RulesService.getRuleById = jest.fn().mockResolvedValue({
        id: 'fb6a986f-fbdb-4f38-8268-8d0ff653724a',
        name: 'Bussines Rule to Update',
        group: 'Group',
        category: 'Category',
        active: true
    });
}

mockSuperagent();
mockRulesService();
