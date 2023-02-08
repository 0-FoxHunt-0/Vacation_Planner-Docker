import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import adminVacationsService from "../../../Services/AdminVacationsService";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>()

    const navigate = useNavigate()

    const minDate = new Date();

    async function send(vacation: VacationModel) {
        try {

            if(new Date(vacation.startDate).getDate() < minDate.getDate()) {
                notify.error("Vacation start date cannot go back in time!")
                return;
            }

            else if(new Date(vacation.endDate).getDate() < new Date(vacation.startDate).getDate()) {
                notify.error("Vacation end date cannot go back in time!")
                return;
            }

            vacation.image = (vacation.image as unknown as FileList)[0]
            await adminVacationsService.addVacation(vacation);
            notify.success("Vacation has been added successfully!");
            navigate(-1)
        }
        catch (err: any) {}
    }

    return (
        <div className="AddVacation Box">

            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" { ...register("destination", VacationModel.destinationValidation)} placeholder="Enter destination"/>
                <span className="Err">{formState.errors.destination?.message}</span>
                <br /><br />

                <label>Description: </label>
                <input type="text" { ...register("description", VacationModel.descriptionValidation)} placeholder="Enter description"/>
                <span className="Err">{formState.errors.description?.message}</span>
                <br /><br />

                <label>Start Date: </label>
                <input type="date" { ...register("startDate", VacationModel.startDateValidation)} placeholder="Enter start date" min={minDate.toISOString().split("T")[0]}/>
                <span className="Err">{formState.errors.startDate?.message}</span>
                <br /><br />

                <label>End Date: </label>
                <input type="date" { ...register("endDate", VacationModel.endDateValidation)} placeholder="Enter end date"/>
                <span className="Err">{formState.errors.endDate?.message}</span>
                <br /><br />

                <label>Price: </label>
                <input type="number" step="0.01" { ...register("price", VacationModel.priceValidation)} placeholder="Enter price"/>
                <span className="Err">{formState.errors.price?.message}</span>
                <br /><br />

                <label>Image: </label>
                <input type="file" accept="image/*" { ...register("image", VacationModel.imageValidation)} />
                <span className="Err">{formState.errors.image?.message}</span>

                <button type="submit">Add</button>
                <br /><br />

            </form>

        </div>
    );
}

export default AddVacation;
