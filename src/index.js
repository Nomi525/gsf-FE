import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "react-toastify/dist/ReactToastify.css";
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Store from './redux/Store';
const persistStore = Store();
<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'></link>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={persistStore.store}>
      <PersistGate persistor={persistStore.persistor}>
        <App />
      </PersistGate> 
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
