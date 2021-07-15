import { ValidationError } from 'yup';
import RulesEngineStore from './rulesEngineStore';
import RootStore from './rootStore';
import RuleFormDto from '../dtos/ruleFormDto';

let rootStore:RootStore;
let rulesEngineStore:RulesEngineStore;

beforeEach(() => {
    rootStore = new RootStore();
    rulesEngineStore = rootStore.rulesEngineStore;
});

test('rulesEngineStore initRulesList', async () => {
    await rulesEngineStore.initRulesList();

    const { rules } = rulesEngineStore;

    expect(rules.length).toBe(2);
    expect(rules[0].name).toBe('Business Rule 1');
    expect(rules[0].active).toBe(true);
    expect(rules[0].group).toBe('Group');
    expect(rules[0].category).toBe('Category');

    expect(rules[1].name).toBe('Business Rule 2');
    expect(rules[1].active).toBe(true);
    expect(rules[1].group).toBe('Group');
    expect(rules[1].category).toBe('Category');
});

test('rulesEngineStore initRuleUpdate', async () => {
    await rulesEngineStore.initRuleUpdate('fb6a986f-fbdb-4f38-8268-8d0ff653724a');

    const { ruleToUpdate } = rulesEngineStore;

    expect(ruleToUpdate.name).toBe('Bussines Rule to Update');
    expect(ruleToUpdate.active).toBe(true);
    expect(ruleToUpdate.group).toBe('Group');
    expect(ruleToUpdate.category).toBe('Category');
});

test('rulesEngineStore createRule validation fail', async () => {
    const rule:RuleFormDto = new RuleFormDto();
    rule.group = 'Group';
    rule.category = 'Category';
    await expect(rulesEngineStore.createRule(rule)).rejects.toThrow(ValidationError);
});

test('rulesEngineStore createRule valid', async () => {
    const rule:RuleFormDto = new RuleFormDto();
    rule.name = 'Some rule';
    rule.group = 'Group';
    rule.category = 'Category';
    rule.active = true;
    await expect(rulesEngineStore.createRule(rule)).rejects.not.toThrow(Error);
});

test('rulesEngineStore updateRule validation fail', async () => {
    const rule:RuleFormDto = new RuleFormDto();
    rule.group = 'Group';
    rule.category = 'Category';
    await expect(rulesEngineStore.updateRule(rule)).rejects.toThrow(ValidationError);
});

test('rulesEngineStore updateRule valid', async () => {
    const rule:RuleFormDto = new RuleFormDto();
    rule.id = 'someId';
    rule.name = 'Some rule';
    rule.group = 'Group';
    rule.category = 'Category';
    rule.active = true;
    await expect(rulesEngineStore.updateRule(rule)).rejects.not.toThrow(Error);
});
