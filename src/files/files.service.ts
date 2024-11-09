import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticProductImage(imageName: string) {
    const possibleExtensions = ['', '.jpg', '.jpeg', '.png'];
    let path;

    for (const ext of possibleExtensions) {
      path = join(process.cwd(), 'static/products', `${imageName}${ext}`);
      if (existsSync(path)) break;
      path = null;
    }

    if (!path) {
      console.log(
        'Available files:',
        readdirSync(join(process.cwd(), 'static/products')),
      );
      throw new BadRequestException(`No product found with image ${imageName}`);
    }

    return path;
  }
}
