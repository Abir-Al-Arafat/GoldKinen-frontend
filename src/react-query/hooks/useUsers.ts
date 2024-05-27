import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
};

const useUsers = () => {
  return useQuery<User[], Error>(["users"], fetchUsers);
};

export default useUsers;
