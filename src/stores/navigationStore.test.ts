import RootStore from './rootStore';
import history from '../utils/history';
import NavigationStore from './navigationStore';

let rootStore:RootStore;
let navigationStore:NavigationStore;

beforeEach(() => {
    rootStore = new RootStore();
    navigationStore = rootStore.navigationStore;
});

test('navigationStore gotoHome', async () => {
    navigationStore.gotoHome();
    expect(history.location.pathname).toBe('/');
});

test('navigationStore gotoCreateRule', async () => {
    navigationStore.gotoCreateRule();
    expect(history.location.pathname).toBe('/rules/create');
});

test('navigationStore gotoUpdateRule', async () => {
    navigationStore.gotoUpdateRule('someRuleId');
    expect(history.location.pathname).toBe('/rules/someRuleId/update');
});
