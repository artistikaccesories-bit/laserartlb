
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const MAX_SIZE = 100 * 1024; // 100KB

async function optimizeImages() {
    try {
        const files = await fs.readdir(IMAGES_DIR);

        for (const file of files) {
            if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

            const filePath = path.join(IMAGES_DIR, file);
            const stats = await fs.stat(filePath);

            if (stats.size > MAX_SIZE) {
                console.log(`Optimizing ${file} (${(stats.size / 1024).toFixed(2)} KB)...`);

                const buffer = await fs.readFile(filePath);
                let quality = 80;
                let outputBuffer = buffer;
                let currentSize = stats.size;

                // Iteratively reduce quality/size until under limit
                // First try converting to webp if not already or re-encoding
                // For simplicity, we'll stick to original format if possible, or force webp if requested.
                // The user just said "make them 100kb forcably", usually implies aggressive compression.

                // We will try to resize if dimensions are huge, otherwise just compress.
                const image = sharp(buffer);
                const metadata = await image.metadata();

                let width = metadata.width;

                // If extremely large, resize first
                if (width > 1200) {
                    width = 1200;
                }

                while (currentSize > MAX_SIZE && quality > 10) {
                    if (file.toLowerCase().endsWith('.png')) {
                        outputBuffer = await sharp(buffer)
                            .resize({ width: width, withoutEnlargement: true })
                            .png({ quality: quality, compressionLevel: 9 })
                            .toBuffer();
                    } else if (file.toLowerCase().endsWith('.webp')) {
                        outputBuffer = await sharp(buffer)
                            .resize({ width: width, withoutEnlargement: true })
                            .webp({ quality: quality })
                            .toBuffer();
                    } else {
                        // jpeg/jpg
                        outputBuffer = await sharp(buffer)
                            .resize({ width: width, withoutEnlargement: true })
                            .jpeg({ quality: quality })
                            .toBuffer();
                    }

                    currentSize = outputBuffer.length;

                    if (currentSize > MAX_SIZE) {
                        quality -= 10;
                        // If quality gets too low, try reducing width further
                        if (quality < 20 && width > 600) {
                            width = Math.floor(width * 0.8);
                            quality = 80; // Reset quality for new width
                        }
                    }
                }

                if (currentSize < stats.size) {
                    await fs.writeFile(filePath, outputBuffer);
                    console.log(`✓ Optimized ${file} -> ${(currentSize / 1024).toFixed(2)} KB`);
                } else {
                    console.log(`⚠ Could not reduce ${file} below limit without destroying it, or it was already efficient.`);
                }
            } else {
                // console.log(`✓ ${file} is already under 100KB`);
            }
        }
        console.log('Image optimization complete!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages();
