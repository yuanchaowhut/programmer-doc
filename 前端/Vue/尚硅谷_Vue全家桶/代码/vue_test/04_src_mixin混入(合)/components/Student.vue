<template>
	<div>
		<h2 @click="showName">学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
	</div>
</template>

<script>
// 当前vue的data和mixins里的data冲突时，以当前vue为准；
// 当前vue的其它选项(如生命周期钩子)与mixins冲突时，两者都保留。
	import {hunhe,hunhe2} from '../mixin'

	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男'
			}
		},
		mixins:[hunhe,hunhe2]
	}
</script>
