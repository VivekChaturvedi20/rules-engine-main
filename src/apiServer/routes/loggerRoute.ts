import express from 'express';

const router = express.Router();

router.put('/Logger', (req, res) => {
    console.log('Log the error', req.body);
    res.send({
        status: 'success'
    });
});

export default router;
