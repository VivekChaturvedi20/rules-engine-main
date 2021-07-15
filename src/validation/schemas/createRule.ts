import * as Yup from 'yup';
import { getContent } from '../../utils/contentUtils';

function resolve() {
    const schema = Yup.object().shape({
        name: Yup.string()
            .required(getContent('rulesEngine.validationErrors.nameRequired')),
        active: Yup.boolean()
            .required(getContent('rulesEngine.validationErrors.activeRequired')),
        group: Yup.string()
            .required(getContent('rulesEngine.validationErrors.groupRequired')),
        category: Yup.string()
            .required(getContent('rulesEngine.validationErrors.categoryRequired'))
    });
    return schema;
}

// need to resolve schema at runtime due to content dependency
export default resolve;
