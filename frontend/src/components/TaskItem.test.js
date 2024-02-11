import {render}from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskItem from './TaskItem';

describe('TaskItem', () => { 

    const task = {
        "_id": "65c8e0501101d9066b697a89",
        "title": "Spring boot 3",
        "isDone": true,
        "user": "65ba914ea256e54c51dccc85",
        "createdAt": "2024-02-11T14:57:20.560Z",
        "updatedAt": "2024-02-11T14:57:20.560Z",
        "__v": 0
    };

    const mockStore = configureStore([]);
    const store = mockStore({});

    test('renders task details correctly', () => { 
        
        const { getByText } = render(
            <Provider store={store}>
                <TaskItem task={task}/>
            </Provider>
        );

        expect(getByText(task.title)).toBeInTheDocument();
        expect(getByText(new Date(task.createdAt).toLocaleString("fr-FR"))).toBeInTheDocument();
     });
 })