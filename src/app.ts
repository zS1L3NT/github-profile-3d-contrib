import AfterEvery from 'after-every';
import { main as generate } from '.';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const routine = async () => {
    const date = new Date().toLocaleDateString('en-SG');
    try {
        await generate();
        await cloudinary.uploader.upload(
            path.resolve('profile-3d-contrib', 'profile-night-view.svg'),
            {
                public_id: process.env.CLOUDINARY_UPLOAD_PATH,
                overwrite: true,
                invalidate: true,
                resource_type: 'raw',
                type: 'upload',
            }
        );

        console.log(`Successfully ran routine on ${date}`);
    } catch (e) {
        console.log(`Error running routine on ${date}:`, e);
    }
};

void routine();
AfterEvery(1).days(() => void routine());
