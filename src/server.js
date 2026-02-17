import http from 'node:http';
import { json } from './utils/response.js';
import {listUsers} from './users/users.controller.js'

const listener = (request,response) => {

    if(request.url === '/users') {
        return listUsers(request, response)
    }

    return json(response, 404, {messages : 'not foud'});
};
const server = http.createServer(listener);
server.listen(3000);

console.log('Server running at http://localhost:3000/');