import { Controller, HttpException, HttpStatus, Param, Post, Get, UploadedFiles, UseInterceptors, Delete, Inject } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { DeleteStaticDTO, GetPartTypesByBrandDTO, getAllStaticByBrandAndTypeDTO } from 'inq-shared-lib';
import { AllStaticFiles, PartsGuidesAwsService } from './parts-guides-aws.service';
import { ConfigService } from '@nestjs/config';
import { config } from './file-options';

export type FilesErrorObject = {
    isError: boolean,
    msg: string
}

@Controller('parts-guides-aws')
export class PartsGuidesAwsController {
    static errObj: FilesErrorObject = Object();
    @Inject()
    static configService: ConfigService;
    constructor(
        private partsGuidesAwsService: PartsGuidesAwsService
    ) { }

    static imageFilter(req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) {
        PartsGuidesAwsController.errObj.isError = false;
        if (!file.mimetype.match(/(image\/)?(jpg|jpeg|png)/) || !file.originalname.match(/\.(jpg|jpeg|png)/)) {
            PartsGuidesAwsController.errObj.isError = true;
            PartsGuidesAwsController.errObj.msg = "Wrong data type";
        }
        if (file.size > config.MAX_FILE_SIZE) {
            PartsGuidesAwsController.errObj.isError = true;
            PartsGuidesAwsController.errObj.msg = "Wrong data size";
        }
        console.log(config.MAX_FILE_SIZE);

        callback(null, true);
    }


    @ApiOperation({ summary: 'Get all static files from S3 and DB' })
    @Get('part-brands')
    getStaticFilesPartBrands(): Promise<string[]> {
        const brands = this.partsGuidesAwsService.getStaticFilesPartBrands();
        return brands;
    }

    @ApiOperation({ summary: 'Get all static files from S3 and DB' })
    @Get('part-types-of-brand/:brand')
    getStaticFilesPartTypesOfBrand(@Param() selectedBrand: GetPartTypesByBrandDTO): Promise<string[]> {
        const brands = this.partsGuidesAwsService.getStaticFilesPartTypesOfBrand(selectedBrand);
        return brands;
    }

    @ApiOperation({ summary: 'Get all static files from S3 and DB' })
    @Get(':brand/:type')
    getStaticFiles(@Param() getAllStaticDTO: getAllStaticByBrandAndTypeDTO): Promise<AllStaticFiles> {
        const staticFiles = this.partsGuidesAwsService.getAllStatic(getAllStaticDTO);
        return staticFiles;
    }

    @ApiOperation({ summary: 'Push static image of a part to S3' })
    @Post('part/:partId')
    @UseInterceptors(FilesInterceptor('file', config.MAX_NUM_FILES, { limits: { fieldSize: config.MAX_FILE_SIZE }, fileFilter: PartsGuidesAwsController.imageFilter }))
    async addPartImg(
        @Param('partId') partId: number,
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        if (PartsGuidesAwsController.errObj.isError) {
            throw new HttpException(PartsGuidesAwsController.errObj.msg, HttpStatus.BAD_REQUEST);
        }
        await PartsGuidesAwsService.checkNSFWFiles(files, PartsGuidesAwsController.errObj);
        if (PartsGuidesAwsController.errObj.isError) {
            throw new HttpException(PartsGuidesAwsController.errObj.msg, HttpStatus.BAD_REQUEST);
        }
        const urls: string[] = await Promise.all(
            files.map(
                (file) => this.partsGuidesAwsService.addPartImg(partId, file.buffer, file.originalname)
            )
        );
        return urls;
    }

    @ApiOperation({ summary: 'Push static image of a repair guide to S3' })
    @Post('guide/:partId')
    @UseInterceptors(FilesInterceptor('file', config.MAX_NUM_FILES, { limits: { fieldSize: config.MAX_FILE_SIZE }, fileFilter: PartsGuidesAwsController.imageFilter }))
    async addGuideImg(
        @Param('partId') partId: number,
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        if (PartsGuidesAwsController.errObj.isError) {
            throw new HttpException(PartsGuidesAwsController.errObj.msg, HttpStatus.BAD_REQUEST);
        }
        PartsGuidesAwsService.checkNSFWFiles(files, PartsGuidesAwsController.errObj);
        if (PartsGuidesAwsController.errObj.isError) {
            throw new HttpException(PartsGuidesAwsController.errObj.msg, HttpStatus.BAD_REQUEST);
        }
        const urls: string[] = await Promise.all(files.map((file) => this.partsGuidesAwsService.addGuideImg(partId, file.buffer, file.originalname)));
        return urls;
    }

    @ApiOperation({ summary: 'Delete static file from S3 and DB' })
    @Delete(':key')
    deleteStaticFile(@Param() key: DeleteStaticDTO) {
        console.log(key.key);
        this.partsGuidesAwsService.deletePublicFile(key.key);
        return true;
    }
}
