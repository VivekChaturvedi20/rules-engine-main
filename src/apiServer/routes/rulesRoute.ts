import express from 'express';
import * as uuid from 'uuid';

const router = express.Router();
const categories = [
    'Perspective',
    'Opportunity',
    'Buying Influences'
];

function getRandomCategory() {
    return categories[Math.floor(Math.random() * categories.length)];
}

router.get('/Rules', (req, res) => {
    const rules = [];
    for (let i = 1; i <= 128; i++) {
        const rule = {
            id: uuid.v4(),
            name: `Bussines Rule ${i}`,
            group: 'Eastern Divison Sales Group',
            active: (Math.random() < 0.5),
            category: getRandomCategory()
        };
        rules.push(rule);
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(rules);
});

router.get('/Rules/:id', (req, res) => {
    const rule = {
        id: uuid.v4(),
        name: 'Bussines Rule to Update',
        group: 'Group',
        active: true,
        category: 'Category'
    };
    res.setHeader('Content-Type', 'application/json');
    res.send(rule);
});

router.put('/Rules', (req, res) => {
    console.log('Created rule', req.body);
    res.send({
        status: 'success'
    });
});

router.post('/Rules', (req, res) => {
    console.log('Updated rule', req.body);
    res.send({
        status: 'success'
    });
});

export default router;
