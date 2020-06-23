const http = require("http");
const {URL} = require('url');
// const fsPromises = require('fs').promises;
// const fs = require('fs');
// const zlib = require('zlib');

const ResponseWriter = require('./ResponseWriter');
// ou 
// const {ResponseWriter} = require('./ResponseWriter');

const requestHandler = (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host}`);
  const responseWriter = new ResponseWriter(res);
  if (req.url == "/hello") {
    responseWriter.hello();
  } else if (/^\/weather\?city=[0-9]{5}$/.test(req.url)) {
    const city = reqUrl.searchParams.get('city');
    responseWriter.weather(city);
  } else if (req.url == "/") {
    responseWriter.index();
  } else if (req.url == "/weather.jpg") {
    responseWriter.file('weather.jpg');
    // fileReadable.pipe(res);
    // fileReadable.on('end', () => console.log("Lecture terminée"));
    
    //En pipe
    // res.writeHead(200 , { "Content-Type": "image/jpg" });
    // const fileReadable = fs.createReadStream(__dirname +'/weather.jpg');
    // fileReadable.pipe(res);
    // fileReadable.on('end', () => console.log("Lecture terminée"));

    //En callback
    // fs.readFile(__dirname +'/weather.jpg', (err, data) => {
    //   if (err) throw err;
    //   res.end(data);
    // });
    // ou
    //En promise
    // fsPromises.readFile(__dirname +'/weather.jpg')
    //   .then(data=> res.end(data))
    //   .catch( (error) => responseWriter.htmlError(404, error))
    //ou

  }else {
    responseWriter.htmlError(404, "introuvable")
  }
};
const server = http.createServer(requestHandler);
server.listen(8000);

