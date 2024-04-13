import { Request } from "express";
import { CreateCategoryDto } from "../dtos/category/create-category.dto";
import { CategoryRepository } from "../repositories/example.repository";
import categoryModel from '../schema/category.schema';
import { ServiceData } from "../utils/service-data";
import { HttpStatus } from "../enums/http-status.enum";
import { Errors } from "../enums/errors.enum";
import { ValidateFields } from "../utils/validate-fields";
import { Messages } from "../enums/messages.enum";
import { UpdateCategoryDto } from "../dtos/category/update-category.dto";
import { DeleteCategoryDto } from "../dtos/category/delete-category.dto";
import { TaskRepository } from "../repositories/task.repository";
import taskModel from '../schema/task.schema';

class CategoryService {
    private readonly repository = new CategoryRepository(categoryModel);
    private readonly taskRepository = new TaskRepository(taskModel)
    private validateFields = new ValidateFields();

}

export default new CategoryService();