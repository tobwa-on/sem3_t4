import { createRouter, createWebHistory } from 'vue-router'
import MovieHomeView from "../views/MovieHomeView.vue";
import LoginView from "../views/LoginView.vue";
import AddCustomerView from "../views/old/AddCustomerView.vue";
import EditIndProdView from "../views/old/EditIndProdView.vue";
import AddOrderView from "../views/old/AddOrderView.vue";
import OrderListView from "../views/old/OrderListView.vue";
import AddProductView from "../views/old/AddProductView.vue";
import ProductListView from "../views/old/ProductListView.vue";
import EditCustomerView from "../views/old/EditCustomerView.vue";
import CustomerListView from "../views/old/CustomerListView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import WatchlistView from "@/views/WatchlistView.vue";

const routes = [
	{
		path: '/',
		name: 'home',
		component: MovieHomeView
	},
	{
		path: '/favorites',
		name: 'favorites',
		component: FavoritesView
	},
	{
		path: '/watchlist',
		name: 'watchlist',
		component: WatchlistView
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView
	},
	{
		path: '/addcustomer',
		name: 'addcustomer',
		component: AddCustomerView
	},
	{
		path: '/customerlist',
		name: 'customerlist',
		component: CustomerListView
	},
	{
		path: '/editcustomer',
		name: 'editcustomer',
		component: EditCustomerView
	},
	{
		path: '/productlist',
		name: 'productlist',
		component: ProductListView
	},
	{
		path: '/addproduct',
		name: 'addproduct',
		component: AddProductView
	},
	{
		path: '/orderlist',
		name: 'orderlist',
		component: OrderListView
	},
	{
		path: '/addorder',
		name: 'addorder',
		component: AddOrderView
	},
	{
		path: '/editindprod',
		name: 'editindprod',
		component: EditIndProdView
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
});

router.onError((error) => {
	console.error("Router Error:", error);
});

export default router
