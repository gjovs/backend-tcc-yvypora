// @ts-ignore
import admin from 'firebase-admin';
import options from '../configs/firebase-key.json';

interface IFile {
  filename: string,
  mimetype: string,
  _buf: Buffer
}

export class FirebaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private app = admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(options),
      storageBucket: 'tcc-yvypora.appspot.com',
    }),
  ) {}

  async uploadImage(fileParameter: IFile): Promise<string> {
    const image = fileParameter;

    const bucket = admin.storage().bucket();

    const fileName = `${Date.now()}.${image.filename.split('.').pop()}`;

    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });

    stream.on('error', (err: Error) => console.log(err));

    stream.on('finish', async () => {
      await file.makePublic();
    });

    // eslint-disable-next-line no-underscore-dangle
    stream.end(image._buf);

    return `https://storage.googleapis.com/tcc-yvypora.appspot.com/${fileName}`;
  }
}

export default new FirebaseService();
