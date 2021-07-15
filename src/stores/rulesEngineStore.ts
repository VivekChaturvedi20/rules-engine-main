import {
    observable, action, makeObservable, runInAction
} from 'mobx';
import { toast } from 'react-toastify';
import RulesListDto from '../dtos/rulesListDto';
import CreateRuleDto from '../dtos/createRuleDto';
import UpdateRuleDto from '../dtos/updateRuleDto';
import RuleFormDto from '../dtos/ruleFormDto';
import * as RulesService from '../services/rulesService';
import type RootStore from './rootStore';
import { getContent } from '../utils/contentUtils';

class RulesEngineStore {
    rootStore: RootStore;

    @observable ruleToUpdate!: UpdateRuleDto;
    @observable rules: RulesListDto[] = [];

    constructor(rootStore:RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @action async initRulesList() {
        const { appStore, loggingStore } = this.rootStore;

        try {
            appStore.showAppLoader();

            const rulesJson = await RulesService.getRules();
            const rules:RulesListDto[] = [];

            for (let i = 0; i < rulesJson.length; i++) {
                const ruleJson = rulesJson[i];
                const rule = new RulesListDto(
                    ruleJson.id,
                    ruleJson.name,
                    ruleJson.group,
                    ruleJson.active,
                    ruleJson.category
                );
                rule.id = ruleJson.id;
                rules.push(rule);
            }

            // setting values in async calls need this wrapper
            runInAction(() => {
                this.rules = rules;
            });

            appStore.hideAppLoader();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action async initRuleUpdate(id:string) {
        const { appStore, loggingStore } = this.rootStore;

        try {
            appStore.showAppLoader();

            const ruleJson = await RulesService.getRuleById(id);
            const rule = new UpdateRuleDto(
                ruleJson.id,
                ruleJson.name,
                ruleJson.group,
                ruleJson.active,
                ruleJson.category
            );
            rule.id = ruleJson.id;

            // setting values in async calls need this wrapper
            runInAction(() => {
                this.ruleToUpdate = rule;
            });

            appStore.hideAppLoader();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action async updateRule(ruleForm:RuleFormDto) {
        const {
            appStore, navigationStore, loggingStore, errorStore
        } = this.rootStore;

        try {
            const rule:UpdateRuleDto = new UpdateRuleDto(
                ruleForm.id,
                ruleForm.name,
                ruleForm.group,
                ruleForm.active,
                ruleForm.category
            );

            appStore.showAppLoader();
            await RulesService.updateRule(rule);
            appStore.hideAppLoader();

            if (errorStore.getErrors().length === 0) {
                toast.success(getContent('rulesEngine.alerts.updated'));
            }

            navigationStore.gotoHome();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }

    @action async createRule(ruleForm:RuleFormDto) {
        const {
            navigationStore, appStore, loggingStore, errorStore
        } = this.rootStore;

        try {
            const rule:CreateRuleDto = new CreateRuleDto(
                ruleForm.name,
                ruleForm.group,
                ruleForm.active,
                ruleForm.category
            );
            appStore.showAppLoader();
            await RulesService.createRule(rule);
            appStore.hideAppLoader();

            if (errorStore.getErrors().length === 0) {
                toast.success(getContent('rulesEngine.alerts.created'));
            }

            navigationStore.gotoHome();
        } catch (error) {
            loggingStore.logError(error);
            throw error;
        }
    }
}

export default RulesEngineStore;
