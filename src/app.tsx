import React, { useContext } from 'react';
import {
    Container, Row, Col
} from 'react-bootstrap';
import './scss/app.scss';
import { Switch, Route, Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import AppLoader from './components/appLoader';
import history from './utils/history';
import { getContent } from './utils/contentUtils';
import styles from './app.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import ErrorCatcher from './components/errors/errorCatcher';
import ErrorModal from './components/errors/errorModal';
import Constants from './constants/appConstants';
import StoreContext from './contexts/storeContext';
import UpdateRule from './components/rules/updateRule';
import CreateRule from './components/rules/createRule';
import RulesList from './components/rules/rulesList';

function Pages() {
    const { loggingStore } = useContext(StoreContext);

    return (
        <Router history={history}>
            <Container fluid className={styles.app}>
                <Row>
                    <Col className={styles['col-override']}>
                        <div className={styles['app-title']}>{getContent('application.title')}</div>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles['col-override']}>
                        <ErrorBoundary
                            FallbackComponent={({ error }) => (
                                <ErrorModal error={error} type={Constants.error.types.ERROR_BOUNDRY} />
                            )}
                            onError={async (error: Error) => {
                                await loggingStore.logError(error);
                            }}
                        >
                            <Switch>
                                <Route path="/rules/:id/update">
                                    <UpdateRule />
                                </Route>
                                <Route path="/rules/create">
                                    <CreateRule />
                                </Route>
                                <Route path="/">
                                    <RulesList />
                                </Route>
                            </Switch>
                            <AppLoader />
                            <ToastContainer autoClose={2500} />
                            <ErrorCatcher />
                        </ErrorBoundary>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles['col-override']}>
                        <small>{getContent('application.copyright')}</small>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

function App() {
    return (<Pages />);
}

export default App;
