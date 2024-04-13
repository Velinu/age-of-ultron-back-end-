import { GenericRepository } from "./generic/generic-repository.repository";
import { Model } from "mongoose";
import { CategoryDocument } from "../schema/category.schema";
import { Category } from "../interfaces/category.interface";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";

export class CategoryRepository extends GenericRepository<CategoryDocument> {
    constructor(private userModel: Model<CategoryDocument>) {
        super(userModel);
    }
}