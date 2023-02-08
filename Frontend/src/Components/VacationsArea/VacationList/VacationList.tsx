import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import { vacationStore } from "../../../Redux/VacationState";
import adminVacationsService from "../../../Services/AdminVacationsService";
import authService from "../../../Services/AuthServices";
import userVacationsService from "../../../Services/UserVacationsService";
import notify from "../../../Utils/Notify";
import Spinner from "../../SharedArea/Spinner/Spinner";
import AdminVacationCard from "../AdminVacationCard/AdminVacationCard";
import UserVacationCard from "../UserVacationCard/UserVacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [user, setUser] = useState<UserModel>()

    const [vacations, setVacations] = useState<VacationModel[]>([])

    useEffect(() => {
        setUser(authStore.getState().user)


        if (authService.isAdmin()) {
            adminVacationsService.getAllVacationsAdmin()
                .then(vacations => { setVacations(vacations) })
                .catch(err => { alert(err.msg) })
        }

        else {
            userVacationsService.getAllVacationsUser()
                .then(vacations => { setVacations(vacations) })
                .catch(err => { alert(err.msg) })
        }

        vacationStore.subscribe(() => {
            const vacationState = vacationStore.getState().vacations;
            const duppedVacations = [...vacationState]
            setVacations(duppedVacations)
        })

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

        } catch (err: any) {
            notify.error(err)
        }
    }

    function isFollowing(vacationId: number): boolean {

        let vacations = vacationStore.getState().vacations

        let vacation = vacations.find(v => v.vacationId === vacationId)

        if (vacation.isFollowing === 1) return true;
        else return false;
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
                <Grid container>
                    {vacations.map(v =>
                        <Grid item xs display="flex" justifyContent="center" alignItems="center">
                            <AdminVacationCard key={v.startDate} vacation={v} deleteVacation={deleteMe} />
                        </Grid>
                    )}
                </Grid>
            }

            {!authService.isAdmin() &&
                <Grid container>
                    {vacations.map(v =>
                        <Grid item xs display="flex" justifyContent="center" alignItems="center">
                            <UserVacationCard
                                key={v.vacationId}
                                vacation={v}
                                followVacation={followVacation}
                                unfollowVacation={unfollowVacation}
                                isFollowing={isFollowing}
                            />
                        </Grid>
                    )}
                </Grid>
            }

        </div>
    );
}

export default VacationList;
