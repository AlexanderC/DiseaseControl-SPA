import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/Combiner';

export default createStore(reducer, applyMiddleware(thunk));