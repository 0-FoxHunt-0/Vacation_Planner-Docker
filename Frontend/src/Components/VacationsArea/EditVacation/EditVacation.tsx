import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/AdminVacationsService";
import appConfig from "../../../Utils/AppConfig";
import Spinner from "../../SharedArea/Spinner/Spinner";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>()

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>()

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        adminVacationsService.getVacationById(+params.id)
            .then((vacation) => {
                console.log(vacation)
                setValue("vacationId", vacation.vacationId)
                setValue("destination", vacation.destination)
                setValue("description", vacation.description)
                setValue("startDate", vacation.startDate)
                setValue("endDate", vacation.endDate)
                setValue("price", vacation.price)
                setVacation(vacation)
            }).catch((err) => {
                alert(err.message)
            });
    }, [])

    async function send(vacation: VacationModel) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0]
            await adminVacationsService.updateVacation(vacation);
            alert("Vacation has been updated");
            navigate(-1)
        }
        catch (err: any) { }
    }

    return (
        <div className="EditVacation Box">

            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <input type="hidden" {...register("vacationId")} />

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} placeholder="Enter destination" />
                <span className="Err">{formState.errors.destination?.message}</span>
                <br /><br />

                <label>Description: </label>
                <input type="text" {...register("description", VacationModel.descriptionValidation)} placeholder="Enter description" />
                <span className="Err">{formState.errors.description?.message}</span>
                <br /><br />

                <label>Start Date: </label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)} placeholder="Enter start date" />
                <span className="Err">{formState.errors.startDate?.message}</span>
                <br /><br />

                <label>End Date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} placeholder="Enter end date" />
                <span className="Err">{formState.errors.endDate?.message}</span>
                <br /><br />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} placeholder="Enter price" />
                <span className="Err">{formState.errors.price?.message}</span>
                <br /><br />

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <img src={vacation?.imageName} alt="" />

                <button type="submit">Update</button>
                <br /><br />

            </form>

        </div>
    );
}

export default EditVacation;
