import * as crypto from 'crypto';
import { ScryptOptions } from 'crypto';
import * as fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import {
  AESKeyData,
  EcoEncryptionData,
  getUploadDataFromServerResponse,
  GetUploadDataResponse,
  UploadDataResponse,
} from 'types/kyc';

export const getUploadData = async ({
  token,
}: {
  token: string;
}): Promise<GetUploadDataResponse> => {
  const { data, error } = await getUploadDataFromServer({ token });

  if (error) {
    console.log({ error });
    return { error };
  }

  if (!data) {
    console.log('No Data');
    return { error: 'No Data' };
  }

  const {
    kycEncryptionData: { rsaPublicKey },
    documentUploadData: { front, back },
  } = data;

  return { rsaPublicKey, front, back };
};

export const getUploadDataFromServer = async ({
  token,
}: {
  token: string;
}): Promise<getUploadDataFromServerResponse> => {
  // Build URL
  const baseURL = process.env.ECO_BASE_URL;
  const postKYCDataURL = process.env.ECO_POST_KYC_DOCUMENTS_URL;
  if (!baseURL || !postKYCDataURL) {
    console.log('Missing ECO_BASE_URL or ECO_POST_KYC_DOCUMENTS_URL');
    return { error: 'Missing ECO_BASE_URL or ECO_POST_KYC_DOCUMENTS_URL' };
  }
  const fullURL = `${baseURL}${postKYCDataURL}`;
  console.log({ fullURL });
  // Make Request
  try {
    const req = axios.get(fullURL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // send the request
    const { data } = await req;
    return { data };
  } catch (error) {
    console.log({ error });
    return { error };
  }
};

export const uploadData = async ({
  file,
  rsaPublicKey,
  postDataFields,
  uploadUrl,
}: {
  file: any;
  rsaPublicKey: string;
  postDataFields: any;
  uploadUrl: string;
}): Promise<UploadDataResponse> => {
  try {
    const { encryptedValue } = await encryptFile({ file, rsaPublicKey });
    const form = new FormData();

    Object.entries(postDataFields).forEach(([k, v]) => {
      form.append(k, v);
    });

    form.append('file', encryptedValue);
    const dataLength = form.getLengthSync();
    const headers = {
      'Content-Type': 'multipart/form-data; boundary=' + form.getBoundary(),
      'Content-Length': dataLength,
    };

    // send the request
    const { data } = await axios.post(uploadUrl, form, { headers });
    return data;
  } catch (error) {
    console.error('ERROR IN CATCH BLOCK', { error });
    return { error };
  }
};

const CipherGCMType = 'aes-256-gcm'; // AES 256 GCM Mode

/**
 * Encrypts data in the eco format using the given RSA and AES encryption keys.
 * @param Buffer dataToEncrypt
 * @param string rsaPublicKey
 * @param AESKeyData aesKey
 * @returns Buffer
 */
export function eeuEncryptData(
  dataToEncrypt: string,
  rsaPublicKey: string,
  aesKey: AESKeyData
): any {
  // Encrypt the data using AES encryption.
  const { data, key } = eeuAesEncrypt(dataToEncrypt, aesKey);

  // Encrypt the key itself using RSA.
  const encKey = eeuRsaEncrypt(key, rsaPublicKey);

  // Create a packed data buffer with encrypted AES key + actual AES encrypted data.
  const encodedDataBuffer = Buffer.concat([encKey, data]);

  // Structure expected by eco server.
  const encryptedData = {
    encryptedValue: `eco:kyc:v1:v1:${encodedDataBuffer.toString('base64')}`,
  };

  return encryptedData;
}

/**
 * Encrypts text using given RSA public key
 * @param Buffer dataToEncrypt
 * @param string rsaPublicKey
 * @returns Buffer
 */
export function eeuRsaEncrypt(
  dataToEncrypt: Buffer,
  rsaPublicKey: string
): Buffer {
  const key = {
    key: rsaPublicKey,
    oaepHash: 'sha256',
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
  };

  return crypto.publicEncrypt(key, dataToEncrypt);
}

/**
 * Create an encryption key.
 * @param string password
 * @returns a structure containing the key and iv
 */
export async function eeuCreateKey(password = ''): Promise<AESKeyData> {
  // Random initialization vector
  const iv = crypto.randomBytes(16);

  // Random salt
  const salt = crypto.randomBytes(64);

  const key = await scrypt(password, salt, 32);

  return {
    key,
    iv,
  };
}

export async function eeuEncryptFile(
  file: string,
  rsaPublicKey: string,
  aesKey: AESKeyData
): Promise<any> {
  // Encrypt the data using AES encryption.
  const { data, key } = await eeuAesEncryptFile(file, aesKey);

  // Encrypt the key itself using RSA.
  const encKey = eeuRsaEncrypt(key, rsaPublicKey);

  // Create a packed data buffer with encrypted AES key + actual AES encrypted data.
  const encodedDataBuffer = Buffer.concat([encKey, data]);

  // Structure expected by eco server.
  const encryptedData = {
    encryptedValue: `eco:kyc:v1:v1:${encodedDataBuffer.toString('base64')}`,
  };

  return encryptedData;
}

export async function eeuAesEncryptFile(
  file: string,
  aesKey: AESKeyData
): Promise<EcoEncryptionData> {
  return new Promise((resolve, reject) => {
    const { key, iv } = aesKey;

    // Create Cipher object.
    const cipher = crypto.createCipheriv(CipherGCMType, key, iv);

    // Encrypt the given text
    const input = fs.createReadStream(file, { encoding: 'binary' });
    let ciphertext = Buffer.alloc(0, 'binary');

    input.on('data', function (chunk) {
      ciphertext = Buffer.concat([
        ciphertext,
        cipher.update(chunk as string, 'binary'),
      ]);
    });

    input.on('error', function (error) {
      reject(error);
    });

    input.on('end', function () {
      const encrypted = Buffer.concat([ciphertext, cipher.final()]);

      // Extract the auth tag
      const tag = cipher.getAuthTag();

      // Generate output
      resolve({
        data: Buffer.concat([iv, tag, encrypted]),
        key,
      });
    });
  });
}

/**
 * Encrypts text by given key
 * @param string dataToEncrypt
 * @param AESKeyData aesKey
 * @returns EcoEncryptionData Buffer([iv, tag, encryptedText]), and key
 */
export function eeuAesEncrypt(
  dataToEncrypt: string,
  aesKey: AESKeyData
): EcoEncryptionData {
  const { key, iv } = aesKey;

  // Create Cipher object.
  const cipher = crypto.createCipheriv(CipherGCMType, key, iv);

  // Encrypt the given text
  const encrypted = Buffer.concat([
    cipher.update(dataToEncrypt, 'utf8'),
    cipher.final(),
  ]);

  // Extract the auth tag
  const tag = cipher.getAuthTag();

  // Generate output
  return {
    data: Buffer.concat([iv, tag, encrypted]),
    key,
  };
}

/**
 * async version of crypto.scrypt
 */
async function scrypt(
  password: string,
  salt: string | Buffer,
  keylen: number,
  options: ScryptOptions = {}
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, keylen, options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

const encryptFile = async ({
  file,
  rsaPublicKey,
}: {
  file: any;
  rsaPublicKey: string;
}): Promise<any> => {
  const aesKey = await eeuCreateKey();
  const encryptedData = await eeuEncryptFile(file, rsaPublicKey, aesKey);

  // console.log(encryptedData)
  return encryptedData;
};
