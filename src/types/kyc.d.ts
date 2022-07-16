export type GetUploadDataResponse = {
  rsaPublicKey?: string;
  front?: {
    uploadUrl: string;
    postDataFields: any;
  };
  back?: {
    uploadUrl: string;
    postDataFields: any;
  };
  error?: any;
};

export type getUploadDataFromServerResponse = {
  data?: {
    kycEncryptionData: {
      rsaPublicKey: string;
    };
    documentUploadData: {
      front: {
        uploadUrl: string;
        postDataFields: any;
      };
      back: {
        uploadUrl: string;
        postDataFields: any;
      };
    };
  };
  error?: any;
};

export type AESKeyData = {
  key: Buffer;
  iv: Buffer;
};

export type EcoEncryptionData = {
  data: Buffer; // Buffer.concat([iv, tag, encrypted])
  key: Buffer;
};

export type UploadDataResponse = {
  data?: any;
  error?: any;
};
