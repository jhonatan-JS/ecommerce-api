import fs from 'fs';
import { google } from 'googleapis';

import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_API_FOLDER_ID = process.env.GOOGLE_API_FOLDER_ID;

const uploadFile = async (fileMulter: any) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './googledrive.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    console.log('auth', auth);

    const driveService = google.drive({
      version: 'v3',
      auth,
    });

    const fileMetadata: any = {
      name: fileMulter.fieldname,
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: fileMulter.mimetype,
      body: fs.createReadStream(fileMulter),
    };

    const response = await driveService.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('response', response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default uploadFile;
