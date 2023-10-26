import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dtbopkiug',
  api_key: '169357699465198',
  api_secret: 'CcQY6Ek2lwwYVS_7rbyJfQ3fKi4',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('debe subir el archivo correctamente a cloudinary ', async () => {
    const imageUrl = 'https://pbs.twimg.com/profile_images/1498641868397191170/6qW2XkuI_400x400.png';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');

    await cloudinary.api.delete_resources(['journal/' + imageId], {
        resource_type: 'image'
    });
  });

  test('debe de retornar un null', async () => {
    const file = new File([], 'foto.jpg');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
