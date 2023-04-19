
import { kyApi } from "~/config-api";

const ressource = "reservations/steps";

const postReservation = async (reservationId: string | undefined) => {
    console.log(reservationId)
    if (reservationId !== undefined) {
        const response = await kyApi.post(`${ressource}/${reservationId}`);
        return response.json();
    } else {
        console.log('reservationId is undefined');
    }
};

const getReservations = async (reservationId: string | undefined) => {
  const response = await kyApi.get(`${ressource}`);
  return response.json();
};

export { postReservation, getReservations };
