
import { kyApi } from "~/config-api";

const ressource = "reservations";

const postReservation = async (json: any, travelId: number) => {
    if (json) {
        console.log(json);
        const response = await kyApi.post(`${ressource}/travel/${travelId}`, { json });
        return response.json();
    } else {
        console.log('reservationId is undefined');
    }
};

const getReservations = async () => {
  const response = await kyApi.get(`${ressource}`);
  return response.json();
};

const getReservationsDetails = async (reservationId: string) => {
  const response = await kyApi.get(`${ressource}/steps/${reservationId}`);
  return response.json();
};

export { postReservation, getReservations, getReservationsDetails };
