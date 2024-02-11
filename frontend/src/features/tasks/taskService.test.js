
import taskService from './taskService';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mockAPI= new MockAdapter(axios);

describe('taskService', () => {

    afterEach(()=>{
        mockAPI.reset();
    });

    test('fetch tasks successfully', async() => { 
        const token = 'mock_token';
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

          mockAPI.onGet('/api/tasks', {headers: {Authorization: `Bear ${token}`}}).reply(200, tasks);
          const response = await taskService.getTasks(token);
          expect(response).toEqual(tasks);
     });
 })

