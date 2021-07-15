import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import config from './config/config';
import App from './app';
import RootStore from './stores/rootStore';
import StoreContext from './contexts/storeContext';
import ContentEnUs from './content/en-US.json';
import * as contentUtils from './utils/contentUtils';

const rootStore = new RootStore();
const { contentStore } = rootStore;

library.add(fas);

(window as any).global = window;

contentStore.content = ContentEnUs;
contentUtils.setContentStore(contentStore);

console.info('CONFIG:', config);

ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={rootStore}>
            <App />
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
