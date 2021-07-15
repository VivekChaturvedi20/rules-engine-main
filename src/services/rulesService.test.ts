import { ValidationError } from 'yup';
import * as RulesService from './rulesService';
import CreateRuleDto from '../dtos/createRuleDto';

test('rulesService createRule validation fail', async () => {
    const rule:CreateRuleDto = new CreateRuleDto('Rule name', new Date().toISOString(), new Date().toISOString(), true, 'extRef');
    rule.name = '';
    await expect(RulesService.createRule(rule)).rejects.toThrow(ValidationError);
});
