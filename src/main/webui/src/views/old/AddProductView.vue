<template>
	<div class="home">
		<AddProduct />
	</div>
</template>

<script>
// @ is an alias to /src
import AddProduct from '@/components/old/AddProduct.vue'

export default {
	name: 'AddProductView',
	components: {
		AddProduct
	}
}
</script>
