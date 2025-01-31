import UsersRepository from "./users/users.repository.js";
import { UsersDao, ProductsDao, CartDao, TicketDao } from "../daos/index.js";
import ProductsRepository from "./products/products.repository.js";
import CartRepository from "./cart/cart.repository.js";
import TicketRepository from "./tickets/tickets.repository.js";

export const usersRepository = new UsersRepository(new UsersDao());
export const productsRepository = new ProductsRepository(new ProductsDao())
export const cartRepository = new CartRepository(new CartDao())
export const ticketRepository = new TicketRepository(new TicketDao())