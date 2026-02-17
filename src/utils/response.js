export function json(response, status,data){
    response.writeHead(status,{'ContentType':'application/json'});
    response.end(JSON.stringify(data));
}