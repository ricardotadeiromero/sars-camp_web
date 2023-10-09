import axios from 'axios';
import { Cardapio } from '../model/Cardapio';
import { format } from 'date-fns';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export async function getCardapio() {
  try {
  
    const response = await api.get('/cardapio/todos');
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}

export async function getCardapioId(id:number) {
  try {
  
    const response = await api.get(`/cardapio/id/${id}`);
    const data = response.data;
    
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