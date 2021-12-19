const crypto = require("crypto");
const {SECRET_KEY} = require("../config/index");
module.exports = {
   
 encrypt : async (text) => {
    const algorithm = 'aes-256-ctr';
    
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, SECRET_KEY, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
 },

 decrypt : async (hash) => {
    const algorithm = 'aes-256-ctr';
    
    const iv = crypto.randomBytes(16);
    
    const decipher = crypto.createDecipheriv(algorithm, SECRET_KEY, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
 },
}