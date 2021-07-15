import * as Yup from 'yup';
import { getContent } from '../../utils/contentUtils';

function resolve() {
    const schema = Yup.object().shape({
        name: Yup.string()
            .required(getContent('rulesEngine.validationErrors.required')),
        group: Yup.string()
            .required(getContent('rulesEngine.validationErrors.required')).nullable(),
        category: Yup.string()
            .required(getContent('rulesEngine.validationErrors.required')).nullable()
    });
    return schema;
}

// need to resolve schema at runtime due to content dependency
export default resolve;
