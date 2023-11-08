import axios from "axios";
import { a_p } from "../model/Achados&Perdidos";
import { Cardapio } from "../model/Cardapio";
import { CustomError } from "../model/CustomError";
import { User } from "../model/User";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function getCardapio() {
  try {
    const response = await api.get("/cardapio ");
    const data = response.data;

    return data;
  } catch (error) {
    console.error("Erro ao buscar o cardápio:", error);
    throw error;
  }
}

export function addToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export async function getCardapioId(id: number): Promise<Cardapio> {
  try {
    const response = await api.get(`/cardapio/${id}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar o cardápio:", error);
    console.error(error);
    throw error;
  }
}
export async function updateCardapio(cardapio: Cardapio) {
  try {
    await api.put(`/cardapio/`, cardapio);
  } catch (error) {
    console.error("Erro ao buscar o cardápio:", error);
    throw error;
  }
}
export async function createCardapio(cardapio: Cardapio) {
  try {
    console.log(cardapio);
    await api.post(`/cardapio/`, cardapio);
  } catch (error) {
    throw error as CustomError;
  }
}

export async function createItem(item: a_p){
  try{
    await api.post('/achados-perdidos',item);
  } catch(error){
    throw error;
  }
}

export async function deleteCardapio(cardapio: Cardapio) {
  try {
    await api.delete("/cardapio/", { data: cardapio });
  } catch (error) {
    console.error("Erro ao buscar o cardápio:", error);
    throw error;
  }
}

export async function getItems() {
  try {
    const response = await api.get("/achados-perdidos");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Erro ao buscar os itens:", error);
    throw error;
  }
}

export async function getItemById(id:number){
  try{
    const response = await api.get("/achados-perdidos/"+id);
    const data = response.data;
    return data;
  } catch(error) {
    throw error;
  }
}

export async function updateItem(item:a_p){
  try{
    await api.put("/achados-perdidos",item);
  } catch(error){
    throw error;
  }
}
export async function deleteItems(id: number) {
  try {
    await api.delete("/achados-perdidos/" + id);
  } catch (error) {
    console.error("Erro ao buscar os itens:", error);
    throw error;
  }
}

export async function createSession(user: User) {
  try {
    const auth = await api.post("/login", user);
    console.log(auth.data);
    const token = auth.data;
    // addToken(token);
    return token;
  } catch (error) {
    console.error("Erro ao buscar o aluno:", error);
    throw error;
  }
}
