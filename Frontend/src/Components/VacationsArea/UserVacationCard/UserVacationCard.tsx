import VacationModel from "../../../Models/VacationModel";
import "./UserVacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
    followVacation: (vacationId: number) => Promise<void>;
    unfollowVacation: (vacationId: number) => Promise<void>;
    isFollowing: (vacationId: number) => boolean;
}

function UserVacationCard(props: VacationCardProps): JSX.Element {

    async function follow() {
        try {
            await props.followVacation(props.vacation.vacationId)
        } catch (error: any) {
            alert(error.message);
        }
    }

    async function unfollow() {
        try {
            await props.unfollowVacation(props.vacation.vacationId)
        } catch (error: any) {
            alert(error.message);
        }
    }

    return (
        <div className="VacationCard Box" style={{ backgroundImage: `url(${props.vacation.imageName})` }}>
            
            <div>

                <div>
                    {
                        props.isFollowing(props.vacation.vacationId) === true ?
                        <button className="btn btn-danger" onClick={() => follow()}>Follow ❤️</button> :
                        <button className="btn btn-danger" onClick={() => unfollow()}>Un-Follow 💔</button>
                    }
                </div>

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

        </div>
    );
}

export default UserVacationCard;
