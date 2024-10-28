import { createRouter, createWebHistory } from 'vue-router'
import MovieHomeView from "../views/MovieHomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import AddCustomerView from "../views/AddCustomerView.vue";
import EditIndProdView from "../views/EditIndProdView.vue";
import AddOrderView from "../views/AddOrderView.vue";
import OrderListView from "../views/OrderListView.vue";
import AddProductView from "../views/AddProductView.vue";
import ProductListView from "../views/ProductListView.vue";
import EditCustomerView from "../views/EditCustomerView.vue";
import CustomerListView from "../views/CustomerListView.vue";

const routes = [
	{
		path: '/',
		name: 'home',
		component: MovieHomeView
	},
	{
		path: '/about',
		name: 'about',
		component: AboutView
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
