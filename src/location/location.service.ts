import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { Location } from "src/location/location.model";

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location) private locationRepository: typeof Location,
    private readonly fileService: FilesService,
  ) {}

  async create(dto: CreateLocationDto, image?: any): Promise<Location> {
    let fileName: string | null = null;

    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    const location = await this.locationRepository.create({
      ...dto,
      image: fileName,
    });

    return location;
  }

  async getAll(): Promise<Location[]> {
    return this.locationRepository.findAll();
  }

  async getById(id: number): Promise<Location> {
    const location = await this.locationRepository.findByPk(id);

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    return location;
  }

  async delete(id: number): Promise<void> {
    const location = await this.getById(id);

    if(location.image) {
      this.fileService.deleteImage(location.image);
    }

    await location.destroy();
  }
}
