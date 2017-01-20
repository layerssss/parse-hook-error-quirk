Parse.initialize('myAppId');
Parse.serverURL = '/';

new Parse.Query('Folder').first()
  .then(folder => {
    console.log('expected old name: Untitled Folder');
    console.log('old name:' + folder.get('name'));
    folder.set('name', ''); // try to change it to invalid

    return folder.save()
      .fail(error => {
        console.log('name not changed: ' + error.message);
        return Parse.Promise.as();
      });
  })
  .then(() => new Parse.Query('Folder').first())
  .then(folder => {
    console.log('expected new name: Untitled Folder');
    console.log('new name:' + folder.get('name'));
  });
