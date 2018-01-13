<script>
export default {
	name: 'result-table',
	props: ['xmlCode'],
	data () {
		return {
			rows: [
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'},
				{name: '张三', property: 'akjsdhf', dataDictionary: true, parazation: false, fixedValue: 234, chineseName: '参数案发时代'}
			]
		};
	},
	created () {
		
	},
	methods: {
		getData () {
			let data = {xmlCode: this.xmlCode };
			ajax({
				url: 'a/b',
				data: data,
				success: function(data) {
					console.log(data);
				}
			});
		}
	}
}
</script>
<template>
	<div class="wrapper">
		<div class="col-sm-12"><button class="btn btn-primary" @click="getData()">发送xml</button></div>
		<div class="">
			<table class="table table-striped table-bordered table-condensed">
				<thead>
					<tr>
						<th>#</th>
						<th>名称</th>
						<th class="property">参数性质</th>
						<th class="dictionary">是否使用<br>数据字典</th>
						<th class="parazation">是否<br>参数化</t>
						<th class="fixed-value">固定值</th>
						<th class="chinese-name">中文名</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(row, index) in rows" :key="index">
						<td>{{index + 1}}</td>
						<td>{{row.name}}</td>
						<td class="property">
							<select>
								<template v-if="row.dataDictionay == true">
									<option :value="true" selected>是</option>
									<option :value="false">否</option>
								</template>
								<template v-else>
									<option :value="true">是</option>
									<option :value="false" selected>否</option>
								</template>
							</select>
						</td>
						<td class="dictionary">
							<select>
								<template v-if="row.dataDictionay == true">
									<option :value="true" selected>是</option>
									<option :value="false">否</option>
								</template>
								<template v-else>
									<option :value="true">是</option>
									<option :value="false" selected>否</option>
								</template>
							</select>
						</td>
						<td class="parazation">
							<select>
								<template v-if="row.parazation == true">
									<option :value="true" selected>是</option>
									<option :value="false">否</option>
								</template>
								<template v-else>
									<option :value="true">是</option>
									<option :value="false" selected>否</option>
								</template>
							</select>
						</td>
						<td contenteditable="true" class="fixed-value">{{row.fixedValue}}</td>
						<td contenteditable="true" class="chinese-name">{{chineseName}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.wrapper {
		height: 100%;
		overflow: auto;
	}
	.parazation, .dictionary {
		width: 75px;
	}
	.fixed-value {
		width: 100px;
	}
	.chinese-name {
		width: 120px;
	}
	.chinese-name, .fixed-value {
		word-break: break-all;
	}
</style>