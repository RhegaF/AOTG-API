const crypto = require('crypto')
const {publickey,privatekey} = require('../config/db.config')
const md5 = text => {
  return crypto
    .createHash('md5')
    .update(text)
    .digest();
}
const encrypt3DES = {
    encrypt3DES(data, key) {
        const md5Key = crypto.createHash('md5').update(key).digest("hex").substr(0, 24);
        var iv = iv || "";
        const cipher = crypto.createCipheriv('des-ede3', privatekey, '');
        cipher.setAutoPadding(true)
      
        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
      }
}

const decrypt3DES = {
    decrypt3DES(data, key) {
        const md5Key = crypto.createHash('md5').update(key).digest("hex").substr(0, 24);
        const decipher = crypto.createDecipheriv('des-ede3', md5Key, '');
      
        let encrypted = decipher.update(data, 'base64', 'utf8');
        encrypted += decipher.final('utf8');
        return encrypted;
      }
}

  module.exports = {...encrypt3DES, ...decrypt3DES}