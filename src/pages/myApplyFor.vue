<template>
	<div id="backlog">
		<el-form :inline="true" status-icon label-position="right" label-width="100px" :model="formInline" :ref="formInline" class="demo-form-inline">
			<el-form-item label="时间">
	         	 <el-date-picker
			      v-model="formInline.startdate"
			      type="date"
			      placeholder="选择日期">
	   			 </el-date-picker>
	      		</el-form-item>
	   		<el-form-item label="虚拟机名称">
	           <el-input v-model="formInline.vmname"></el-input>
	        </el-form-item>
	    	<el-form-item label="用途">
	           <el-input v-model="formInline.application"></el-input>
	        </el-form-item>
		    <el-button type="primary" siza="medium" icon="el-icon-search" @click="ApplyForFn">搜素</el-button>
		    <el-button type="primary" siza="medium" icon="el-icon-refresh" @click="resetForm">重置</el-button>
		</el-form>
		<div class="tableWrapper">
	      <el-table border stripe   :data="tableData" style="width: 100%">
	        <el-table-column align='center' :show-overflow-tooltip="true" :prop="item.prop" :label="item.label" :width="item.width" v-for="item in tableCols" :key="item.prop" :formatter="item.formatter"></el-table-column>
	      	<el-table-column align='center' label="操作" width="180">
	          <template slot-scope="scope">
	 					<!--<el-button type="text" @click="fn(scope)">详情</el-button>-->
	 					<el-button v-show="scope.row.state == '已同意'"  @click="open3(scope)">续约</el-button>
	 					<el-button type="text" @click="fn(scope)">详情</el-button>
	         </template>
	        </el-table-column>
	      </el-table>
		    <div class="pagerWrapper" style="float: right;">
		      <div class="block">
		        <el-pagination  @size-change="" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
		        </el-pagination>
		      </div>
		    </div>
    	</div>
    	<new-add ref='newAdd'></new-add>
	</div>
</template>

<script>
	import {
    	dateFormat
 	} from '@/common/js/public.js'
	import newAdd from '@/components/newAdd'
	export default {
		components: {
			newAdd
		},
		data() {
			return {
			formInline: {
				startdate: '',
				vmname: '',
				application: ''
			},
			tableData: [{
		          id: 1,
		          section: 'vvvev11111111111',
		          vmname: 'wevwe',
		          systemname: 'ewew',
		          memory: 'weew',
		          ram: 'weew',
		          cpu: 'ewew',
		          number: 122,
		          startdate: '2019-1-23',
		          enddate: '2019-1-23',
		          remark: '测试嗷嗷嗷啊啊嗷嗷嗷啊啊嗷嗷嗷啊啊'
			}],
			tableCols: [{
				prop: 'applicant',
		        label: '申请人',
		        width: ''
		        }, {
		        prop: 'section',
		        label: '申请部门',
		        width: ''
		        }, {
		        prop: 'vmname',
		        label: '虚拟机名称',
		        width: ''
		        }, {
		        prop: 'systemname',
		        label: '操作系统',
		        width: ''
		        },
//		        }, {
//		        prop: 'ram',
//		        label: '内存',
//		        width: '80'
//		        }, {
//		        prop: 'memory',
//		        label: '硬盘',
//		        width: ''
//		        }, {
//		        prop: 'cpu',
//		        label: 'CPU',
//		        width: ''
//		        }, {
				{
		        prop: 'number',
		        label: '数量',
		        width: '70'
		        }, {
		        prop: 'startdate',
		        label: '开始时间',
		        width: '',
		        formatter: (row, column) => {
		          if (row.startdate) {
		             return row.startdate ? dateFormat(new Date(row.startdate * 1), "yyyy-MM-dd") : '';
		          } else {
		            return ''
		          	}
		         }
		        }, {
		        prop: 'enddate',
		        label: '结束时间',
		        width: '',
		        formatter: (row, column) => {
		          if (row.enddate) {
		             return row.enddate ? dateFormat(new Date(row.enddate * 1), "yyyy-MM-dd") : '';
		          } else {
		            return ''
		          	}
		         }
		        }, {
		        prop: 'remark',
		        label: '备注',
		        width: ''
		        }, {
		        prop: 'state',
		        label: '状态',
		        width: ''
		        }],
		        total: 0,
			    pageSize: 15,
			    pageNum: 1
			}
		},
		methods: {
			fn(scope) {
				this.$refs.newAdd.dialogFn(scope)
			},
			 handleCurrentChange(val) {
			      this.pageNum = val;
			      this.ApplyForFn();
			 },
			ApplyForFn() {
				this.$axios.post('application/historyApplication', {
					...this.formInline,
					id: sessionStorage.userId,
					pagesize: this.pageSize,
					currentpage: this.pageNum
				}).then(res => {
					this.tableData = res.data.totalList;
					this.total = res.data.totalRecord;
				})
			},
			resetForm() {
		       this.formInline = {
					startdate: '',
					vmname: '',
					application: ''
				}
		   	},
			  open3(scope) {
		        this.$prompt('请输入续约天数', '续约', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          inputPattern: /^[1-9]\d*$/,
		          inputErrorMessage: '请输入1-9的阿拉伯数字'
		        }).then(({ value }) => {
		        		this.$axios.post('application/xmApplication', {
		        			...scope.row,
		        			increasethetime: value
		        		}).then(res => {
		        			console.log(res);
		        		})
		          this.$message({
		            type: 'success',
		            message: '你的邮箱是: ' + value
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '取消续约'
		          });       
		        });
		      }
		},
		mounted() {
			this.ApplyForFn()
		}
	}
</script>

<style scoped lang="scss">
	#backlog{
		.el-form {
			background:#a2aec1;
			padding-top:25px;	
		}
		.el-dialog {
			.el-form {
				background:white ;
				.el-input {
					width: 300px !important;
				}
			}
		}
		.el-dialog__body{
			padding: 0 !important;
		}
	}
</style>