<script>
export default {
	name: 'result-table',
	props: ['xmlCode', 'interfaceId'],
	data () {
		return {
			rows: [],
			propertyEnum:[
				{ value: 1, name: '参数' },
				{ value: 2, name: '非参数' },
				{ value: 3, name: '复合类型' }
			],
			useDictEnum: [
				{ value: true, name: '是' },
				{ value: false, name: '否' }
			],
			parazationEnum: [
				{ value: true, name: '是' },
				{ value: false, name: '否' }
			]
		}
	},
	created () {	
	},
	methods: {
		parseXml () {
			var me = this;
			let data = { interfaceId: this.interfaceId, xmlBody: this.xmlCode };
			ajax({
				url: address + 'interfaceController/parseXmlBody',
				data: data,
				success: function (data) {
					if (data.retCode === '0000') {
						me.$notify({
							title: '成功',
							message: data.retMsg,
							type: 'success'
						});
						me.rows = data.paramList;
					} else {
						me.$notify.error({
							title: '错误提示',
							message: data.retMsg
						});
					}
				},
				error: function () {
					me.$notify.error({
						title: '错误提示',
						message: '出现网络错误，请稍后重试！'
					});
				}
			});
		},
		saveXml() {
			var me = this;
			var data = {  interfaceId: this.interfaceId, paramListJson: JSON.stringify(this.rows) };
			console.log(data.paramListJson)
			ajax({
				url: address + 'interfaceController/saveParamInfo',
				data: data,
				success: function (data) {
					if (data.retCode === '0000') {
						me.$notify({
							title: '成功提示',
							message: data.retMsg,
							type: 'success'
						});
					} else {
						me.$notify.error({
							title: '错误提示',
							message: data.retMsg
						});
					}
				},
				error: function () {
					me.$notify.error({
						title: '错误提示',
						message: '出现网络错误，请稍后重试！'
					});
				}
			});
		}
	}
}
// {
// 	"id": 230,
// 	"name": "xml",
// 	"interfaceId": 8,
// 	"chName": null,
// 	"property": null,
// 	"useDictionary": null,
// 	"parameterization": null,
// 	"defaultValue": null,
// 	"serialNumber": 1,
// 	"xpath": "/xml"
// },
</script>
<template>
	<div class="wrapper">
		<div class="col-sm-12">
			<button class="btn btn-primary" @click="parseXml()">解析XML</button>
			<button v-if="rows.length > 0" class="btn btn-primary" @click="saveXml()">保存</button>
		</div>
		<div class="">
			<el-table :data="rows" height="500">
				<el-table-column
					type="index"
					width="25">
				</el-table-column>
				 <el-table-column
					prop="name"
					label="名称"
					width="80"
					>
				</el-table-column>
				<el-table-column
					prop="property"
					label="属性"
					width="120"
					>
					<template slot-scope="scope">
						<el-select v-model="scope.row.property" placeholder="">
							<el-option
							:size="mini"
							v-for="p in propertyEnum"
							:key="p.value"
							:label="p.name"
							:value="p.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column
					prop="useDictionary"
					label="使用数据字典"
					width="80">
					<template slot-scope="scope">
						<el-select v-model="scope.row.useDictionary" placeholder="">
							<el-option
							:size="mini"
							v-for="p in useDictEnum"
							:key="p.value"
							:label="p.name"
							:value="p.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column
					prop="parameterization"
					label="参数化"
					>
					<template slot-scope="scope">
						<el-select v-model="scope.row.parameterization" placeholder="">
							<el-option
							:size="mini"
							v-for="p in parazationEnum"
							:key="p.value"
							:label="p.name"
							:value="p.value">
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column
					prop="defaultValue"
					label="固定值">
					<template slot-scope="scope">
						<el-input type="textarea" v-model="scope.row.defaultValue" placeholder="请输入内容"></el-input>
					</template>
				</el-table-column>
				<el-table-column
					prop="chName"
					label="中文名">
					<template slot-scope="scope">
					<el-input type="textarea" v-model="scope.row.chName" placeholder="请输入内容"></el-input>
					</template>
				</el-table-column>
			</el-table>
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