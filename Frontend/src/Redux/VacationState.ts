import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

// 1. App State - Application Level State:

export class VacationsState {
  public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:

export enum VacationsActionType {
  FetchVacations = "FetchVacations",
  AddVacation = "AddVacation",
  UpdateVacation = "UpdateVacation",
  DeleteVacation = "DeleteVacation",
  UserFollow = "UserFollow",
  UserUnFollow = "UserUnFollow",
}

// 3. Action - a single object describing single operation on the data:

export interface VacationsAction {
  type: VacationsActionType; // What do we need to do?
  payload: any; // What data type do we need?
}

// 4. Reducer - function performing the needed actions:

export function vacationsReducer(
  currentState = new VacationsState(),
  action: VacationsAction
): VacationsState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationsActionType.FetchVacations: // Here the payload is the Vacation list fetched by the server
      newState.vacations = action.payload;
      break;

    case VacationsActionType.AddVacation: // Here the payload is the added Vacation
      newState.vacations.push(action.payload);
      break;

    case VacationsActionType.UpdateVacation:
      const indexToUpdate = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      if (indexToUpdate !== -1) {
        newState.vacations[indexToUpdate] = action.payload;
      }
      break;

    case VacationsActionType.DeleteVacation: // here the payload is the ID of the Vacation to delete
      const indexToDelete = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      if (indexToDelete !== -1) {
        newState.vacations.splice(indexToDelete, 1);
      }
      break;

    case VacationsActionType.UserFollow:
      const vacationFollowing: VacationModel = newState.vacations.find(
        (v) => v.vacationId === action.payload
      );
      vacationFollowing.isFollowing = 1;
      vacationFollowing.followerCount += 1;
      break;

    case VacationsActionType.UserUnFollow:
      const vacationUnFollowing: VacationModel = newState.vacations.find(
        (v) => v.vacationId === action.payload
      );
      vacationUnFollowing.isFollowing = 0;
      vacationUnFollowing.followerCount--;
      break;
  }
  return newState;
}
// 5. Store - Redux manager:
export const vacationStore = createStore(vacationsReducer);
