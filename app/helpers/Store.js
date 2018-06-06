const electron = require('electron');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
import Log from './Logger';

class Store
{
  constructor(db_name)
  {
      this.database_name = db_name;
      // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
      
      const userDataPath = (electron.app || electron.remote.app).getAppPath();// getPath('documents');
      
      mkdirp(userDataPath + '/data/', (err) =>
      {
        if(err)
        {
          return Log('error', err.message);
        }
        
        this.path = path.join(userDataPath + '/data/', db_name + '.json');
      });
      
      this.data = {};
      parseDataFile(this.path)
      .then(data => this.data=data)
      .catch(err => Log('error', err.message));
  }
  
  // This will just return the property on the `data` object
  get(collection_name)
  {
    console.log('get all records from database [%s] collection [%s]', this.database_name, collection_name);
    return this.data[collection_name];
  }

  getAll()
  {
    console.log('get all collections and records from database: ', this.database_name);
    return this.data[this.database_name];
  }
  
  // updates database collection record
  update(collection, new_val)
  {
    if(!collection)
      return Log('error', 'invalid collection name');
    if(!new_val)
      return Log('error', 'value to be updated is invalid.');

    const new_collection = [];
    this.data[collection].map(val =>
    {
      if(val._id == new_val._id)
      {
        Log('verbose_info', 'found match to be updated');
        new_collection.push(new_val);
      } else new_collection.push(val);
    });
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(new_collection));
    Log('info', 'successfully updated record on local database [' + this.database_name + ' > ' + collection + '].');
    console.log('serialized collection [%s] to path [%s] \nwith data [%s]', collection, this.path, this.data);
  }

  // overwrites entire database
  overwrite(collection, val)
  {
    this.data[collection] = val;
    // Wait, I thought using the node.js' synchronous APIs was bad form?
    // We're not writing a server so there's not nearly the same IO demand on the process
    // Also if we used an async API and our app was quit before the asynchronous write had a chance to complete,
    // we might lose that data. Note that in a real app, we would try/catch this.
    fs.writeFileSync(this.path, JSON.stringify(this.data));
    Log('info', 'successfully overwrote local database [' + this.database_name + ' > ' + collection + '].');
    console.log('serialized collection [%s] to path [%s] \nwith data [%s]', collection, this.path, this.data);
  }

  // appends to database collection
  append(collection, val)
  {
    this.data[collection].push(val);
    
    fs.writeFileSync(this.path, JSON.stringify(this.data));
    Log('info', 'successfully persisted new record to local collection [' + this.database_name + '].');
    console.log('serialized collection [%s] to path [%s] \nwith data [%s]', collection, this.path, this.data);
  }
}

const parseDataFile = (filePath) => new Promise((resolve, reject) =>
{
    console.log('attempting to read file from local fs');
    // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
    // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
    // const data = fs.readFileSync(filePath);
    fs.readFile(filePath, (err, data) =>
    {
        if(err)
        {
          return reject(err);
        }
        return resolve(JSON.parse(data));
    });
});

// expose the class
export default Store;