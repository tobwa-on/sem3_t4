<template>
	<div class="home">
		<AddCustomer />
	</div>
</template>

<script>
// @ is an alias to /src
import AddCustomer from '@/components/old/AddCustomer.vue'

export default {
	name: 'AddCustomerView',
	components: {
		AddCustomer
	}
}
</script>
