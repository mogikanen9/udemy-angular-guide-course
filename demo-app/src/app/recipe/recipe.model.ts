import { stringify } from 'querystring';

export class Recipe {
    constructor(readonly name: string, readonly description: string, readonly imagePath: string) { }
}
