import React from 'react';
import {
    render, cleanup, fireEvent, waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RuleForm from './ruleForm';
import { getContent } from '../../../utils/contentUtils';

afterEach(cleanup);

test('ruleForm validate empty form', async () => {
    const dom = render(<RuleForm
        initialValues={{
            id: 'id',
            name: '',
            group: '',
            category: '',
            active: true
        }}
        onSave={() => {}}
        onCancel={() => {}}
    />);

    const saveButton = dom.getByTestId('saveButton');
    await fireEvent.click(saveButton);

    await waitFor(() => {
        const requiredTexts = dom.getAllByText(getContent('rulesEngine.validationErrors.required'));
        // 3 instances of required should have appeared
        expect(requiredTexts.length).toBe(3);
    });
});
