import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { VacationsActionType, vacationStore } from "../../../Redux/VacationState";
import adminVacationsService from "../../../Services/AdminVacationsService";
import authService from "../../../Services/AuthServices";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import UserVacationCard from "../UserVacationCard/UserVacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([])

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        setUser(authStore.getState().user)

        // Listen to AuthState changes:
        authStore.subscribe(() => {
            setUser(authStore.getState().user)
        })

        vacationStore.subscribe(() => {
            setVacations(vacationStore.getState().vacations)
        })

        if (authService.isAdmin()) {
            adminVacationsService.getAllVacationsAdmin()
                .then(vacations => { setVacations(vacations) })
                .catch(err => { alert(err.msg) })
        }

        else {
            userVacationsService.getAllVacationsUser()
                .then(vacations => { setVacations(vacations); })
                .catch(err => { alert(err.msg) })
        }

    }, [])

    async function deleteMe(vacationId: number) {
        try {

            if (!window.confirm('Are you sure you want to delete this vacation? \nThis action is irreversible!')) return;

            await adminVacationsService.deleteVacation(vacationId);
            notify.success("Vacation has been deleted successfully")

            // Refresh List:
            let duplicatedVacations = [...vacations];
            const index = duplicatedVacations.findIndex(v => v.vacationId === vacationId)
            duplicatedVacations.splice(index, 1);
            setVacations(duplicatedVacations)
            vacationStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: duplicatedVacations })

        } catch (err: any) {
            notify.error(err)
        }
    }

    function isFollowing(vacationId: number): boolean {
        const vacation: VacationModel = vacations.find(v => v.vacationId === vacationId)
        return vacation.isFollowing === 1 ? true : false
    }

    async function followVacation(vacationId: number) {
        try {
            await userVacationsService.userFollow(vacationId)
        } catch (err: any) {
            notify.error(err)
        }
    }

    async function unfollowVacation(vacationId: number) {
        try {
            await userVacationsService.userUnFollow(vacationId)
        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="VacationList">

            {vacations.length === 0 && <Spinner />}

            {authService.isAdmin() &&
                <div className="list">
                    {vacations.map(v => <AdminVacationCard key={v.vacationId} vacation={v} deleteVacation={deleteMe} />)}
                </div>
            }

            {!authService.isAdmin() &&
                <div className="list">
                    {vacations.map(v => 
                        <UserVacationCard 
                            key={v.vacationId} 
                            vacation={v} 
                            followVacation={followVacation} 
                            unfollowVacation={unfollowVacation} 
                            isFollowing={isFollowing} 
                    />)}
                </div>
            }

        </div>
    );
}

export default VacationList;
