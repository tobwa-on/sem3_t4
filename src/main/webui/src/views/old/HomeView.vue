<template>
	<div class="home">
		<HelloWorld msg="Hello world!"/>
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/old/HelloWorld.vue'

export default {
	name: 'HomeView',
	components: {
		HelloWorld
	}
}
</script>
