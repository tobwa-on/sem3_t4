<template>
	<div class="customerList">
		<CustomerList />
	</div>
</template>

<script>
// @ is an alias to /src
import CustomerList from '@/components/old/CustomerList.vue'

export default {
	name: 'CustomerListView',
	components: {
		CustomerList
	}
}
</script>
