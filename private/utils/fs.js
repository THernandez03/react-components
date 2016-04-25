import os from 'os';
import fs from 'fs';
import path from 'path';

export const tmpDir = os.tmpdir();
export const projectDir = path.dirname(require.main.filename);

export const getFiles = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if(err){ return reject(err); }
      resolve(files.map((file) => {
        return `${dir}/${file}`;
      }));
    });
  });
}

export const safeWriteFile = (file, data, callback) => {
  fs.access(file, fs.F_OK, (err) => {
    if(!err){ return callback({ code: 'FEXIST' }, null); }
    fs.writeFile(file, data, (err) => {
      if(err){ return callback(err, null); }
      return callback(null);
    });
  });
}

export const writeFile = (file, data, safe = false) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path.dirname(file), (err) => {
      if(err.code !== 'EEXIST'){ return reject(err); }
      const fn = (safe) ? safeWriteFile : fs.writeFile;
      fn(file, data, (err) => {
        if(err){ return reject(err); }
        return resolve(file);
      });
    });
  });
}
