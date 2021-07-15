import request from 'superagent';
import config from '../config/config';
import CreateRuleDto from '../dtos/createRuleDto';
import UpdateRuleDto from '../dtos/updateRuleDto';
import UpdateRuleSchema from '../validation/schemas/updateRule';
import CreateRuleSchema from '../validation/schemas/createRule';
import * as authUtils from '../utils/authUtils';

const apiUrl = config.apiUrl;

export async function getRules() {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    const rules = await request
        .get(`${apiUrl}/Rules?pageNumber=1&pageSize=100`)
        .set(defaultHeaders);

    return rules.body;
}

export async function getRuleById(id: string) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    const rule = await request
        .get(`${apiUrl}/Rules/${id}`)
        .set(defaultHeaders);

    return rule.body;
}

export async function createRule(rule:CreateRuleDto) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    await CreateRuleSchema().validate(rule);
    await request
        .put(`${apiUrl}/Rules`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .send(rule);
}

export async function updateRule(rule:UpdateRuleDto) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    await UpdateRuleSchema().validate(rule);
    await request
        .post(`${apiUrl}/Rules`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .send(rule);
}
