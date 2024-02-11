import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {getTasks} from './taskSlice';
import taskService from './taskService';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

;

const mockStore = configureMockStore([thunk]);
const mockAxios = new MockAdapter(axios);

describe('taskSlice', () => { 
    let store;
    beforeEach(()=>{
        store = mockStore({
            task:{
                tasks: [],
                isError: false,
                isSuccess: false,
                isLoading: false,
                message:''
            },
            auth:{
                user: {
                    user: {
                        name: 'NadetDev',
                        token: 'mock_token'
                    }
                    },
            },
        });
    });

    afterEach(()=>{
        mockAxios.reset();
        store.clearActions();
    });

    test('calls taskService to fetch tasks', async() => { 
        const token = "mock_token";
        const tasks = [
            {
              "_id": "65c8e03e1101d9066b697a84",
              "title": "GraphQL",
              "isDone": false,
              "user": "65ba914ea256e54c51dccc85",
              "createdAt": "2024-02-11T14:57:02.181Z",
              "updatedAt": "2024-02-11T14:57:02.181Z",
              "__v": 0
            },
            {
              "_id": "65c8e0501101d9066b697a89",
              "title": "Spring boot 3",
              "isDone": true,
              "user": "65ba914ea256e54c51dccc85",
              "createdAt": "2024-02-11T14:57:20.560Z",
              "updatedAt": "2024-02-11T14:57:20.560Z",
              "__v": 0
            }
          ];

          const getTasksSpy = jest.spyOn(taskService, 'getTasks').mockResolvedValue(tasks);
          await store.dispatch(getTasks());
          expect(getTasksSpy).toHaveBeenCalledWith(token);
     })
 })