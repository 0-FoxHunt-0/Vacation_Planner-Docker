import Joi from "joi";
import { ValidationError } from "./client-errors";
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    private static postValidationSchema = Joi.object({

    })
    
    public validatePost(): void {
        const result = UserModel.postValidationSchema.validate(this)
        if (result.error) throw new ValidationError(result.error.message)
    }

}

export default UserModel