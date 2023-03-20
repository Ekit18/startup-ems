import { Controller, FileTypeValidator, HttpException, HttpStatus, Param, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseInterceptors, ExceptionFilter, Inject, ArgumentsHost, Get, Delete } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/filters/all-exceptions.filter';
import { DeleteStaticDTO } from './dto/delete-static.dto';
import { PartsGuidesAwsService } from './parts-guides-aws.service';
import getStream = require('get-stream');


export type FilesErrorObject = {
    isError: boolean,
    msg: string
}

@Controller('parts-guides-aws')
export class PartsGuidesAwsController {
    static errObj: FilesErrorObject = Object();
    constructor(private partsGuidesAwsService: PartsGuidesAwsService) { }
    static imageFilter(req: Request, file: Express.Multer.File, callback: (error: Error, acceptFile: boolean) => void) {
        PartsGuidesAwsController.errObj.isError = false;
        if (!file.mimetype.match(/(image\/)?(jpg|jpeg|png)/)) {
            PartsGuidesAwsController.errObj.isError = true;
            PartsGuidesAwsController.errObj.msg = "Wrong data type";
        }
        if (file.size > 3000) {
            PartsGuidesAwsController.errObj.isError = true;
            PartsGuidesAwsController.errObj.msg = "Wrong data size";
        }

        callback(null, true);
    }
    @ApiOperation({ summary: 'Push static image of a part to S3' })
    @Post('part/:partId')
    @UseInterceptors(FilesInterceptor('file', 10, { limits: { fieldSize: 3000 }, fileFilter: PartsGuidesAwsController.imageFilter }))
    async addPartImg(
        @Param('partId') partId: number,
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
        await PartsGuidesAwsService.checkNSFWFiles(files, PartsGuidesAwsController.errObj);
        if (PartsGuidesAwsController.errObj.isError) {
            throw new HttpException(PartsGuidesAwsController.errObj.msg, HttpStatus.BAD_REQUEST);
        }
        const urls: string[] = await Promise.all(files.map((file) => this.partsGuidesAwsService.addPartImg(partId, file.buffer, file.originalname)));
        return urls;
    }
    @ApiOperation({ summary: 'Push static image of a repair guide to S3' })
    @Post('guide/:partId')
    @UseInterceptors(FilesInterceptor('file', 10, { limits: { fieldSize: 3000 }, fileFilter: PartsGuidesAwsController.imageFilter }))
    async addGuideImg(
        @Param('partId') partId: number,
        @UploadedFiles() files: Array<Express.Multer.File>
    ) {
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
