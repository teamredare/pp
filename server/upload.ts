import fs from 'fs/promises'
import path from 'path'
import { randomString } from './utils/utils'
export const posterSaveDir = './posters'

import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, posterSaveDir + path.sep); // Specify the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${randomString()}-${file.originalname.replaceAll(' ','')}`); // Keep the original filename
    }
});
export const upload = multer({ storage });



export async function saveImage(image) {
    fs.writeFile(image, posterSaveDir + path.sep + Date.now() + randomString())
}