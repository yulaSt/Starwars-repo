import axios from "axios"

export const getStarWarsData = async (url: string, signal?: AbortSignal) => {
  const { data } =  await axios.get(url, {signal})
  return data;
}