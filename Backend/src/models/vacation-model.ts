import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: string;
    public imageFile: File;
    public image: UploadedFile;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageFile= vacation.imageFile;
        this.image= vacation.image;
    }

    private static postValidationSchema = Joi.object({

    })
    
    public validate(): void {
        const result = VacationModel.postValidationSchema.validate(this)
        if (result.error) throw new ValidationError(result.error.message)
    }

}

export default VacationModel