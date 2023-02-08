import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import moment from 'moment';

import VacationModel from "../../../Models/VacationModel";
import notify from "../../../Utils/Notify";
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
            notify.error(error.message);
        }
    }

    async function unfollow() {
        try {
            await props.unfollowVacation(props.vacation.vacationId)
        } catch (error: any) {
            notify.error(error.message);
        }
    }

    function isFollowing() {
        try {
            const response = props.isFollowing(props.vacation.vacationId)
            return response
        } catch (err: any) {
            notify.error(err.message);
        }
    }

    function formatTime(time: string) {
        return moment(time).format('MMMM D, YYYY');
    }

    return (
        <div className="UserVacationCard VacationCard Box">
            {/* VacationCard Box */}
            <CardActions sx={[{ position: "relative" }, { left: 10 }, { top: 70 }, { zIndex: 1 }]}>
                {
                    isFollowing() === true ?
                        <Fab color="error" aria-label="add" size='medium' onClick={() => unfollow()}>
                            <ThumbUpIcon />
                        </Fab> :
                        <Fab color="default" aria-label="add" size='medium' onClick={() => follow()}>
                            <ThumbUpIcon />
                        </Fab>
                }

            </CardActions>
            <Card sx={[{ maxWidth: 500 }, { minWidth: 500 }, { minHeight: 480 }, { maxHeight: 480 }, { overflow: "hidden" }, { zIndex: 0 }]}>

                <CardMedia
                    component="img"
                    alt={props.vacation.destination}
                    height="220"
                    image={props.vacation.imageName}
                    sx={[{ position: "relative" }, { zIndex: 0 }, { top: 0 }]}
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

            {/* <div>

                <div className="imageAndFollow" style={{ backgroundImage: `url(${props.vacation.imageName})` }}>
                    <div>
                        {
                            props.isFollowing(props.vacation.vacationId) === true ?
                                <button className="btn btn-danger followButton" onClick={() => unfollow()}>Un-Follow 💔</button> :
                                <button className="btn btn-danger followButton" onClick={() => follow()}>Follow ❤️</button>
                        }
                    </div>
                </div>



                Destination: {props.vacation.destination}
                <br />
                Description: {props.vacation.description}
                <br />
                Start Date: {props.vacation.startDate}
                <br />
                End Date: {props.vacation.endDate}
                <br />
                Price: {props.vacation.price}
            </div> */}

        </div>
    );
}

export default UserVacationCard;
