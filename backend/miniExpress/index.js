const fs = require('fs');
const miniExpress = require('./mini-express');

const app = miniExpress();

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

  
app.get('/', (req, res) => {
    res.end('Hello World!');
});

const favicon = (iconPath) => {
  return (req, res, next) => {
    if (req.method.toLowerCase() === "get" && req.url === "/favicon.ico") {
      res.writeHead(200, {
        'Content-Tpe': 'image/x-icon'
      });
      const iconReadable = fs.createReadStream(iconPath);
      iconReadable.pipe(res);
    } else {
      next()
    }
  }
}

app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', (req, res) => {
  res.end('Hello World!');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});