import * as Yup from 'yup';
import { getContent } from '../../utils/contentUtils';
import CreateRuleSchema from './createRule';

function resolve() {
    const schema = CreateRuleSchema().shape({
        id: Yup.string()
            .required(getContent('rulesEngine.validationErrors.idRequired'))
    });
    return schema;
}

// need to resolve schema at runtime due to content dependency
export default resolve;
