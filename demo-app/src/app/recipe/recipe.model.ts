import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    constructor(readonly rid: string, readonly name: string, readonly description: string, readonly imagePath: string,
        readonly ingredients: Ingredient[]) { }    
}
