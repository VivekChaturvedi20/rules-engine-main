import request from 'superagent';
import * as uuid from 'uuid';
import config from '../config/config';
import LoggerDto from '../dtos/loggerDto';
import * as authUtils from '../utils/authUtils';

const apiUrl = config.apiUrl;

export async function logError(error:Error) {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    const data = new LoggerDto(
        uuid.v4(),
        error.name,
        error.message,
        (error.stack || ''),
        config.environment,
        Date.now()
    );

    const logMessage = {
        message: `[${error.name}] ${error.message}`,
        data,
        logLevel: 'Error'
    };

    await request.put(`${apiUrl}/Logs`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .send(logMessage)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error('Logging Service failed to log the error:', err);
            throw err;
        });
}

export async function userAudit() {
    const defaultHeaders = await authUtils.getDefaultHeaders();

    await request.post(`${apiUrl}/KFUsers`)
        .set('Content-Type', 'application/json')
        .set(defaultHeaders)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error('Faild to run KF User audit:', err);
            throw err;
        });
}
