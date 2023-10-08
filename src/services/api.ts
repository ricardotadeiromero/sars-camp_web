import axios from 'axios';
import { Cardapio } from '../model/Cardapio';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export async function getCardapio() {
  try {
  
    const response = await api.get('/cardapio/todos');
    console.log(response);
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}

export async function getCardapioId(id:number): Promise<Cardapio> {
  try {
  
    const response = await api.get(`/cardapio/id/${id}`);
    console.log(response);
    const data:Cardapio = response.data;

    return data;
  } catch (error) {
    console.error('Erro ao buscar o cardápio:', error);
    throw error;
  }
}