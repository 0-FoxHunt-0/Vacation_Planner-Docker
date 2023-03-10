import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationStore } from "../../../Redux/VacationState";
import adminVacationsService from "../../../Services/AdminVacationsService";
import authService from "../../../Services/AuthServices";
import notify from "../../../Utils/Notify";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<VacationModel>()
    const [vacations, setVacations] = useState<VacationModel[]>([])
    const [image, setImage] = useState<File>()
    const [preview, setPreview] = useState<string>();
    const navigate = useNavigate()
    const minDate = new Date();

    useEffect(() => {

        if (!sessionStorage.getItem("userToken") || !authService.isAdmin()) {
            notify.error("You are not logged in or authorized")
            navigate("/")
            return;
        }

        setVacations(vacationStore.getState().vacations)

        if (vacations.length === 0) {
            adminVacationsService.getAllVacationsAdmin()
                .then(vacations => { setVacations(vacations) })
                .catch(err => { alert(err.msg) })
        }

        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }

    }, [image])

    async function send(vacation: VacationModel) {

        if (!authService.isAdmin()) {
            notify.error("You are not a admin")
            navigate("/")
            return;
        }

        try {
            const startDate = new Date(vacation.startDate)
            const nextStartDate = startDate.toISOString().split("T")[0]
            const endDate = new Date(vacation.endDate)
            const nextEndDate = endDate.toISOString().split("T")[0]
            const nextMinDate = minDate.toISOString().split("T")[0]

            if (nextStartDate < nextMinDate) {
                notify.error("Vacation start date cannot go back in time!")
                return;
            }

            else if (nextEndDate < nextStartDate) {
                notify.error("Vacation end date cannot go back in time!")
                return;
            }

            vacation.image = (vacation.image as unknown as FileList)[0]
            await adminVacationsService.addVacation(vacation);
            notify.success("Vacation has been added successfully!");
            navigate("/list")
        }
        catch (err: any) { }
    }

    return (
        <div className="AddVacation Box">

            <h2>Add Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} className="form-control" placeholder="Enter destination" />
                <span className="Err">{formState.errors.destination?.message}</span>
                <br />

                <label>Description:</label>
                <div className="input-group">
                    <textarea className="form-control" aria-label="With textarea"  {...register("description", VacationModel.descriptionValidation)} placeholder="Enter description"></textarea>
                    <span className="Err">{formState.errors.description?.message}</span>
                </div>
                <br />

                <label>Start Date: </label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)} className="form-control" placeholder="Enter start date" min={minDate.toISOString().split("T")[0]} />
                <span className="Err">{formState.errors.startDate?.message}</span>
                <br />

                <label>End Date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} className="form-control" placeholder="Enter end date" />
                <span className="Err">{formState.errors.endDate?.message}</span>
                <br />

                <label>Price: </label>
                <input type="number" step="0.01" {...register("price", VacationModel.priceValidation)} className="form-control" placeholder="Enter price" />
                <span className="Err">{formState.errors.price?.message}</span>
                <br />

                <label>Image: </label>
                <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    {...register("image", VacationModel.imageValidation)}
                    onChange={(event) => {
                        const file = event.target.files[0]
                        if (file && file.type.substring(0, 5) === "image") {
                            setImage(file)
                        } else {
                            setImage(null)
                        }
                    }}
                />
                <span className="Err">{formState.errors.image?.message}</span>
                <br />

                <span>Image preview:</span>
                <div className="imagePreview">
                    {preview &&
                        <img src={preview} alt="Image Preview..." />
                    }
                </div>
                <br />

                <button type="submit" className="btn btn-primary">Add</button>
                <br />

            </form>

        </div>
    );
}

export default AddVacation;
