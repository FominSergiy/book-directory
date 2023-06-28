import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, NotAcceptableException } from '@nestjs/common';



@Injectable()
export class CustomParseIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (isNaN(value)) {
            throw new NotAcceptableException(
                `Provide a numeric string for id. Provided: ${value}`
            );
        }
        return parseInt(value);
    }
}