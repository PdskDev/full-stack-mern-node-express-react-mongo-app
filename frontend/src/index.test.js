import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { store } from "./app/store";
import App from "./App";

const mockStore = configureMockStore();


describe('renders root component', () => { 

    test('renders root App component', () => { 
        
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );

        const rootComponent = container.firstChild;
        expect(rootComponent).toBeInTheDocument();
     });
 });