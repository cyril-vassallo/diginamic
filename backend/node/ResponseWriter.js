const https = require('https');
const fs = require('fs');
const zlib = require('zlib');


class ResponseWriter {
  constructor(res) {
    this.res = res;
  }

  hello() {
    const date = new Date();
    const timeString = `${("0" + date.getHours()).slice(-2)} : ${(
      "0" + date.getMinutes()
    ).slice(-2)}`;
    let sentence = " Bonjour il est ";
    this.htmlSuccess(
      `
    <h1>
    ${sentence} ${timeString}
    </h1>  
    `
    );
  }

  index() {
    this.htmlSuccess(
      `
      <p><img src="weather.jpg"/></p>
        <ul>
          <li><a href="/hello">Heure du serveur</a></li>
          <li><a href="/weather?city=34172">Météo</></li>
        </ul>
      `
    );
  }

  weather(city) {
    const token = '08ddcc5675b44ea1f2c567010e544d25c47ca45a8392efc9ff693e471ebee936';
    const weatherApiUrl = `https://api.meteo-concept.com/api/forecast/daily?insee=${city}&token=${token}`;
    const headers = {Accept: 'application/json'};
    https.get(
      weatherApiUrl,
      {headers}, 
      apiResponse =>{ 
        let responseData = "";
        apiResponse.on('data', chunk => {
          // console.log("chunk"+ chunk);
        responseData += chunk;
      });
      apiResponse.on('end', () => {
        const json = JSON.parse(responseData);
        if(json.code){
          this.htmlError(400, "code faux");
        }else {
          const tableRows =  json.forecast
            .map(f => `<tr>
                        <td>${f.tmin}</td>
                        <td>${f.tmax}</td>
                      </tr>`)
            .join('');
                                  
          this.htmlSuccess(`<h1>Temps sur ${json.city.name}</h1>
                            <table>
                              <tr>
                                <th> Temp min </th>
                                <th> Temp max </th>
                              </tr>
                              ${tableRows}
                            </table>
                            <form method="get" action="weather">
                              Choisir une autre code insee :
                              <input type="text" name="city" >
                              <button>Rechercher</button>
                            </form>
                            `);
          }
        }
      );
    });

  }

  file(fileName){
    const path = __dirname + "/" + fileName;
    this.res.writeHead(200 , { "Content-Type": "image/jpg", "Content-Encoding": "gzip" });
    const fileReadable = fs.createReadStream(path);
    fileReadable.on('end', () => console.log("Lecture terminée"));
    const gzipTransform = zlib.createGzip();
    fileReadable.pipe(gzipTransform).pipe(this.res);
  }
  

  htmlSuccess(bodyContent) {
    this.res.writeHead(200, {
      "Content-Type": "text/html",
      charset: "utf-8",
    });
    this.res.write(`<html>
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Node.js</title>
                      </head>
                      <body>
                        <main>
                          ${bodyContent}
                        </main>
                      </body>
                  </html>`);
    this.res.end();
  }

htmlError(status, message){
  this.res.writeHead(status, {
    "Content-Type": "text/html",
    charset: "utf-8",
  });
  this.res.end(`<html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Node.js</title>
                  </head>
                  <body>
                    <main>
                      Erreur: ${message}
                    </main>
                  </body>
                </html>`);

  }
  
}





module.exports = ResponseWriter;
// ou 
// exports.ResponseWriter = ResponseWriter;