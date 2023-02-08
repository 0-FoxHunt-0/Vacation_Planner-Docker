import { CardActions, Fab, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

    function formatTime(time: string) {
        return moment(time).format('MMMM D, YYYY');
    }

    return (
        <div className="VacationCard Box">

            <CardActions sx={[{ position: "relative" }, { left: 10 }, { top: 70 }, { zIndex: 1 }]}>
                <NavLink to={"/admin/edit/vacations/" + props.vacation.vacationId}>
                    <Button>
                        <Fab color="default" aria-label="add" size='medium'>
                            <EditIcon />
                        </Fab>
                    </Button>
                </NavLink>

                <Button onClick={() => deleteMe()}>
                    <Fab color="error" aria-label="add" size='medium'>
                        <DeleteIcon />
                    </Fab>
                </Button>
            </CardActions>

            <Card sx={[{ maxWidth: 500 }, { minWidth: 500 }, { minHeight: 480 }, { maxHeight: 480 }, { overflow: "hidden" }, { zIndex: 0 }]}>

                <CardMedia
                    component="img"
                    alt={props.vacation.destination}
                    height="220"
                    image={props.vacation.imageName}
                    sx={[{ position: "relative" }, { zIndex: 0 }, { top: 0 }, { backgroundRepeat: "no-repeat" }]}
                />
                <CardContent sx={{ height: "100%" }}>
                    <Typography variant="h5" component="div">
                        {props.vacation.destination}
                    </Typography>
                    <Typography paragraph sx={[{ borderRadius: 5 }, { backgroundColor: "#EDEDED" }]}>
                        {formatTime(props.vacation.startDate)} &rarr; {formatTime(props.vacation.endDate)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                        {props.vacation.description}
                    </Typography>
                    <br />
                    <Typography variant="body1" color="text.primary">
                        ${props.vacation.price}
                    </Typography>
                </CardContent>
            </Card>

            {/* <div className="VacationInfo">
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
            </div> */}
        </div>
    );
}

export default AdminVacationCard;
