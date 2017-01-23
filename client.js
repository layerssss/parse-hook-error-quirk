Parse.initialize('myAppId');
Parse.serverURL = '/';

new Parse.Query('Folder').first()
  .then(folder => {
    console.log('expected old name: Untitled Folder');
    console.log('old name:' + folder.get('name')); // Untitled Folder
    folder.set('name', ''); // try to change it to invalid

    return folder.save()
      .fail(error => {
        console.log('name not changed: ' + error.message);
        folder.set('name', 'Renamed Folder');
        return Parse.Promise.as();
      })
      .then(() => new Parse.Query('Folder').first())
      .then(folder_2 => {
        console.log('expected new name: Untitled Folder'); // Renamed Folder
        console.log('new name:' + folder_2.get('name'));
        console.log('is it the same object?');
        console.log(folder === folder_2); // False


        folder_2.set('name', 'Renamed again');
        console.log(folder.get('name')); // Renamed again
      });
  });
