/*
 *
 * Copyright 2015-2018 magiclen.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const crypto = require('crypto');
const hash = require('mhash');
const crc = require('node-crc');

const MagicCrypt = function (key = '', bit = 128, iv = '') {
  let mKey, mBit, mIV;
  switch (bit) {
    case 64:
      mKey = crc.crc64(Buffer.from(key, 'utf8'));
      if (iv !== '') {
        mIV = crc.crc64(Buffer.from(iv, 'utf8'));
      } else {
        mIV = new Buffer([0, 0, 0, 0, 0, 0, 0, 0]); //IV is not set. It doesn't recommend.
      }
      break;
    case 128:
    case 192:
    case 256:
      switch (bit) {
        case 128:
          key = hash('md5', key);
          break;
        case 192:
          let temp = hash('tiger192', key);
          // Convert to tiger192,3
          key = '';
          for (let i = 0; i < 3; ++i) {
            for (let j = 7; j >= 0; --j) {
              key += temp.substr((i * 16) + (j * 2), 2);
            }
          }
          break;
        case 256:
          key = hash('sha256', key);
          break;
      }
      mKey = new Buffer(key, 'hex');
      if (iv !== '') {
        iv = hash('MD5', iv);
        mIV = new Buffer(iv, 'hex');
      } else {
        mIV = new Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); //IV is not set. It doesn't recommend.
      }
      break;
    default:
      throw new Error('The key must be 8 bytes(64 bits), 16 bytes(128 bits), 24 bytes(192 bits) or 32 bytes(256 bits)!');
  }
  mBit = bit;

  this.algorithm = (mBit > 64) ? 'aes-' + mBit + '-cbc' : 'des-cbc';
  this.key = mKey;
  this.iv = mIV;
};

MagicCrypt.prototype.encrypt = function (str) {
  let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
  let crypted = cipher.update(str, 'utf8', 'base64');
  crypted += cipher.final('base64');
  return crypted;
};

MagicCrypt.prototype.encryptData = function (dataBuffer) {
  let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
  let crypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);
  return crypted.toString('base64');
};

MagicCrypt.prototype.decrypt = function (str) {
  let cipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
  let decrypted = cipher.update(str, 'base64', 'utf-8');
  decrypted += cipher.final('utf-8');
  return decrypted;
};

MagicCrypt.prototype.decryptData = function (dataBase64) {
  let cipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
  let decrypted = Buffer.concat([cipher.update(dataBase64, 'base64'), cipher.final()]);
  return decrypted;
};


module.exports = MagicCrypt;