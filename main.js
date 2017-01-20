var ParseServer = require('parse-server').ParseServer;
var Express = require('express');
var FS = require('fs');

var app = Express();

app.get('/', (req, res) => {
  res.end([
      '<script src="https://npmcdn.com/parse@1.9.2/dist/parse.js"></script>',
      '<script src="client.js"></script>'
  ].join('\n'));
});

app.get('/client.js', (req, res) => {
  res.end(FS.readFileSync('client.js'));
});

app.use(new ParseServer({
  databaseURI: 'mongodb://root@localhost/parse-hook-error-quirk',
  appId: 'myAppId',
  masterKey: 'myMasterKey',
  serverURL: 'http://localhost:3000/',
  cloud: (Parse) => {
    Parse.Cloud.beforeSave('Folder', (request, response) => {
      if (!request.object.name) {
        return response.error('Name is invalid.');
      }

      response.success();
    });

    (new Parse.Query('Folder')).first()
      .then(folder => {
        if (folder) return Promise.resolve();

        folder = new Parse.Object('Folder', {
          name: 'Untitled Folder'
        });
        
        return folder.save();
      });
  }
}));

app.listen(3000);
