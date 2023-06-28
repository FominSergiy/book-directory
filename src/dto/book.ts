export class createBookDto {
    title: string;
    author: string;
    year: Date
    description?: string;
}

export class patchBookDto {
    title?: string;
    author?: string;
    year?: string;
    description?: string;
}