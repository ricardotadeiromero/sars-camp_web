import axios from 'axios';
import { Cardapio } from '../model/Cardapio';
import { format } from 'date-fns';
import { User } from '../model/User';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export async function getCardapio() {
  try {
  
    const response = await api.get('/cardapio ');
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}

export function addToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export async function getCardapioId(id:number): Promise<Cardapio>{
  try {
  
    const response = await api.get(`/cardapio/id/${id}`);
    const [data] = response.data;
    console.log(response);
    return data;
  } catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}
export async function updateCardapio(cardapio: Cardapio) {
  try {
      await api.put(`/cardapio/`, cardapio);
  } catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}
export async function createCardapio(cardapio: Cardapio) {
  try {
      console.log(cardapio)
      await api.post(`/cardapio/`, cardapio);
  } catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}

export async function deleteCardapio(cardapio: Cardapio){
  try{
    await api.delete('/cardapio/', {data: cardapio});
  }  catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}

export async function createSession(user: User){
  try{
    const auth = await api.post('/login',user)
    console.log(auth.data)
    const token = auth.data['access_token'];
    addToken(token);
    return token;
  } catch (error) {
    console.error('Erro ao buscar o aluno:', error);
    throw error;
  }
}