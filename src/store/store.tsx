import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CategoryKey } from "../interfaces/endpoints";
import type { Person } from "../interfaces/person";

interface State {
  people: Person[];
  films: [];
  planets: [];
  species: [];
  starships: [];
  vehicles: [];
  setPeople: (newPeople: Person[]) => void; // Function to set people
  setCategory: (category: CategoryKey, data: any[]) => void; // Function to set category (people, films etc.)
  getCategory: (category: CategoryKey) => any[]; // Function to set category (people, films etc.)
  addPerson: (newPerson: Person) => void; // Function to add a person
  deletePerson: (name: string) => void; // Function to delete a person by name
  updatePerson: (name: string, updatedPerson: Person) => void; // Function to edit a person by name
}

const useStore = create<State>()(
persist(
  (set, get) => ({
    people: [],
    films: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
    setPeople: (newPeople: Person[]) =>
      set((state: State) => ({
        people: [...newPeople],
      })),

    setCategory: (category: CategoryKey, data: any[]) => {
      set((state: State) => ({
        ...state,
        [category]: data,
      }));
    },
    getCategory: (category: CategoryKey) => {
      const state = get() as State;
      return state[category] || [];
    },
    addPerson: (newPerson: Person) =>
      set((state: State) => ({
        people: [...state.people, newPerson],
      })),
    deletePerson: (name: string) =>
      set((state: State) => ({
        people: [...state.people.filter((person) => person.name !== name)],
      })),
    updatePerson: (name: string, updatedPerson: Person) =>
      set((state: State) => ({
        people: [
          ...state.people.map((person) =>
            person.name === name ? updatedPerson : person
          ),
        ],
      })),
  }),
  {
    name: "SW-storage", // name of the item in the storage (must be unique)
    //  storage:  localStorage,

    // storage: typeof window !== 'undefined' ? window.localStorage : undefined, // (optional) by default, 'localStorage' is used
  }
));

export default useStore;
