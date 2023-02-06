import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { VacationsActionType, vacationStore } from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";

class UserVacationsService {
  public async getAllVacationsUser(): Promise<VacationModel[]> {
    // Take vacations from global state:
    let vacations = vacationStore.getState().vacations;

    // If we dont have vacations
    if (vacations.length === 0) {
      // Fetch vacations from backend
      const response = await axios.get<VacationModel[]>(appConfig.userVacationsUrl);
      vacations = response.data;

      // Send all vacations into redux global state which will call the Reducer
      vacationStore.dispatch({
        type: VacationsActionType.FetchVacations,
        payload: vacations
      });
    }

    // Return vacations
    return vacations;
  }

  public async userFollow(id: number): Promise<void> {
    await axios.post(appConfig.userVacationsFollowUrl + id);
    vacationStore.dispatch({ type: VacationsActionType.UserFollow, payload: id });
  }

  public async userUnFollow(id: number): Promise<void> {
    await axios.delete(appConfig.userVacationsFollowUrl + id);
    vacationStore.dispatch({ type: VacationsActionType.UserFollow, payload: id });
  }
}



const userVacationsService = new UserVacationsService();

export default userVacationsService;
