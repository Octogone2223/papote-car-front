fdggdfgdf
<template>
    <div>
      <form>
        <label for="destination">Destination:</label>
        <input v-model="destination" type="text" id="destination" name="destination">
  
        <label for="date">Date:</label>
        <input v-model="date" type="date" id="date" name="date">
  
        <label for="passengers">Nombre de voyageurs:</label>
        <input v-model="passengers" type="number" id="passengers" name="passengers">
  
        <button @click.prevent="searchTrips">Rechercher</button>
      </form>
  
      <div v-if="trips.length">
        <h2>Résultats de la recherche</h2>
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Date</th>
              <th>Nombre de voyageurs</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trip in trips" :key="trip.id">
              <td>{{ trip.destination }}</td>
              <td>{{ trip.date }}</td>
              <td>{{ trip.passengers }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
  return {
    destination: '',
    date: '',
    passengers: 0,
    trips: [] 
  };
},
    methods: {
      async searchTrips() {
        console.log('tezstsetestes')
        // Faire une requête API pour obtenir les trajets en fonction des critères de recherche
        // ...
        // Mettre à jour la liste de trajets en utilisant les données obtenues à partir de l'API


        // this.trips = [
        //   { id: 1, destination: this.destination, date: this.date, passengers: this.passengers },
        //   // ...
        // ];
      }
    }
  };
  </script>
  
  <script setup lang="ts"></script>
  
  <style scoped>

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

form label {
  margin-bottom: 0.5rem;
}

form input[type="text"],
form input[type="date"],
form input[type="number"] {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
}

form button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

table {
  margin-top: 1rem;
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 0.5rem;
  border: 1px solid #ccc;
}


</style>
  