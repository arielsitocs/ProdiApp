import B2 from 'backblaze-b2';
import config from '../config/b2.config.js';

const b2Config = config;

const b2 = new B2({
  applicationKeyId: b2Config.applicationKeyId,
  applicationKey: b2Config.applicationKey
});

async function uploadFile(fileBuffer, fileName) {
  try {
    await b2.authorize(); // Autenticación en B2
    
    // Obtener URL de subida
    const { data: { uploadUrl, authorizationToken } } = await b2.getUploadUrl({
      bucketId: b2Config.bucketId
    });

    // Subir el archivo
    const response = await b2.uploadFile({
      uploadUrl,
      uploadAuthToken: authorizationToken,
      fileName: `uploads/${Date.now()}_${fileName}`, // Evita nombres duplicados
      data: fileBuffer
    });

    // Generar URL pública (para buckets públicos)
    return `https://f005.backblazeb2.com/file/${b2Config.bucketName}/${response.data.fileName}`;
  } catch (error) {
    console.error('Error al subir a B2:', error);
    throw error;
  }
}

export default uploadFile;