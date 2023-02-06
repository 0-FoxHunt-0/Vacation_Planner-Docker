import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./AdminVacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    deleteVacation: (vacationId: number) => Promise<void>;
}

function AdminVacationCard(props: VacationCardProps): JSX.Element {
    async function deleteMe() {
        try {
            await props.deleteVacation(props.vacation.vacationId)
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <div className="VacationCard Box" style={{ backgroundImage: `url(${props.vacation.imageName})` }}>


            <div className="VacationInfo">
                {props.vacation.destination}
                <br />
                Description: {props.vacation.description}
                <br />
                Start Date: {props.vacation.startDate}
                <br />
                End Date: {props.vacation.endDate}
                <br />
                Price: {props.vacation.price}
            </div>

            
            <div className="VacationButtons">
                <span className="adminEdit">
                    <NavLink to={"/admin/edit/vacations/" + props.vacation.vacationId}>
                        <button className="btn btn-warning">Edit</button>
                    </NavLink>
                </span>

                &nbsp;

                <span className="adminDelete">
                    <button className="btn btn-danger" onClick={() => deleteMe()}>Delete</button>
                </span>
            </div>
        </div>
    );
}

export default AdminVacationCard;
