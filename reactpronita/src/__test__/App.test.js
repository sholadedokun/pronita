import React from 'react';
import { shallow, mount, render} from 'enzyme'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


import App from '../components/app';
import Header from '../components/header'
import reducers from '../reducers';


//create a Snapshot for the App Layout
describe('>>>H O M E --- Snapshot',()=>{

    //applying reduxThunk as middleware enabled us to use dispatch from actions
    const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
    const store = createStoreWithMiddleware(reducers);
    let wrapper

    beforeEach(()=>{
        // store = mockStore(initialState)
        // wrapper = mount( <Provider store={store}><ConnectedHome /></Provider> )
    })
    it('+++capturing Snapshot of App Layout', () => {
        const renderedValue =  renderer.create(<Provider store={store}><App /></Provider>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});

it('renders without crashing', () => {
  let  wrapper = shallow(<App />);
  expect(wrapper.contains(<Header  title="Pronita" />)).toBe(true);
});
