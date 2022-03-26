import { Animal } from "./Animal";
import { Pagination } from "./Pagination";

export interface GetAnimalsResponse {
  GetAnimals: GetAnimals;
}

interface GetAnimals {
  animals: Animal[];
  pagination: Pagination;
}
