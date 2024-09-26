
export const STARWARS_URL = 'https://swapi.dev/api/';

export type CategoryKey = 'people' | 'films' | 'planets' | 'species' | 'starships' | 'vehicles';

export type Category = {
  name: CategoryKey;
  url: string;
};

export type Result = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  { name: 'people', url: `${STARWARS_URL}/people`},
  { name: 'planets', url: `${STARWARS_URL}/planets`},
  { name: 'films', url: `${STARWARS_URL}/films`},
  { name: 'species', url: `${STARWARS_URL}/species`},
  { name: 'vehicles', url: `${STARWARS_URL}/vehicles`},
  { name: 'starships', url: `${STARWARS_URL}/starships`}
]
