import axios from './axios'
import type { Game, Product } from '../types/Game'

/**
 * =========================
 * GAME API (PUBLIC)
 * =========================
 */

/**
 * Ambil semua game aktif
 * GET /games
 */
export const getGames = async (): Promise<Game[]> => {
  const response = await axios.get('/games')
  return response.data.data
}

/**
 * Ambil detail game
 * GET /games/{id}
 */
export const getGameDetail = async (gameId: string) => {
  const response = await axios.get(`/games/${gameId}`)
  return response.data.data.products
}

/**
 * Ambil product berdasarkan game
 * GET /games/{id}/products
 */
export const getProductsByGame = async (
  gameId: number
): Promise<Product[]> => {
  const response = await axios.get(`/games/${gameId}/products`)
  return response.data.data
}
