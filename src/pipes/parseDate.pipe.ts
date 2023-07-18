import { PipeTransform, Injectable, ArgumentMetadata, NotAcceptableException } from '@nestjs/common';
import { createBookDto, patchBookDto } from 'src/modules/book/book';


@Injectable()
export class CustomValidateDatePipe implements PipeTransform {
    // YYYY-MM-DD
    private readonly dateRegex =  /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/;

    transform(
        value: createBookDto | patchBookDto, metadata: ArgumentMetadata
    ): createBookDto | patchBookDto {

        // exit early if date is not provided
        // used for PATCH route
        if (!value.year) {
            return value;
        }

        const dateString = value.year;

        // throw if date is not in the right format
        if (!this.dateRegex.test(dateString)) {
            throw new NotAcceptableException('Provide YYYY-MM-DD style date');
        }

        // check if last day is in-bound
        const dateArray: number[] = dateString.split("-").map(
            (strItem) => parseInt(strItem)
        );
        const year = dateArray[0]
        const month = dateArray[1]
        const day = dateArray[2]

        const lastMonthDay: number = new Date(year,month,0).getDate();

        if (day > lastMonthDay) {
            throw new NotAcceptableException(
                `Your day: ${day} exceeds the last day: ${lastMonthDay} of the month: ${month}`
            )
        }

        if (month > 13) {
            throw new NotAcceptableException(
                `Month: ${month} is invalid.`
            )
        }

        return value;
    }
}