import { createStore } from 'redux';
import counterReducer from './reducers';

// Create the Redux store using the counter reducer
const store = createStore(counterReducer);

export default store;
