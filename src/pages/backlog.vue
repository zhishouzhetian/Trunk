<template>
	<div id="backlog">
		<div class="tableWrapper">
	      <el-table border stripe   :data="tableData" style="width: 100%">
	        <el-table-column align='center' :show-overflow-tooltip="true" :prop="item.prop" :label="item.label" :width="item.width" v-for="item in tableCols" :key="item.prop" :formatter="item.formatter"></el-table-column>
	        <el-table-column align='center' label="操作" width="220">
	          <template slot-scope="scope">
	 					<el-button  @click="fn(scope)">同意</el-button>
	 					<el-button  @click="repulseFn(scope)">拒绝</el-button>
	 					<el-button type="text" @click="detailsFn(scope)">详情</el-button>
	         </template>
	        </el-table-column>
	      </el-table>
    	</div>
    	<div class="pagerWrapper" style="float: right;">
	      <div class="block">
	        <el-pagination  @size-change="" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
	        </el-pagination>
	      </div>
	    </div>
    	<new-add ref='newAdd'></new-add>
    	<el-dialog
		  title="配置"
		  :visible.sync="dialogVisible"
		  width="50%"
		  :before-close="handleClose">
		   <el-form :model="ruleForm" :disabled="formFlag"  ref="ruleForm"  label-width="100px" class="demo-ruleForm">
			  <el-form-item label="虚拟机用户名" prop="applicant">
			    <el-input v-model="ruleForm.username"></el-input>
			  </el-form-item>
			   <el-form-item label="虚拟机密码" prop="section">
			    <el-input v-model="ruleForm.password"></el-input>
			  </el-form-item>
			  <el-form-item label="云环境">
	          <el-select v-model.trim="ruleForm.environment" filterable size="15">
	            <el-option :label="value.name" :value="value.name" :key="value.id" v-for="value in EnvironmentList"></el-option>
	          </el-select>
	        </el-form-item>
			  <el-form-item label="ip地址" prop="systemname">
			    <el-input v-model="ruleForm.ip"></el-input>
			  </el-form-item>
		  	</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="consentFn">确 定</el-button>
		  </span>
		</el-dialog>
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
			appStateId: '',
			recordId: '',
			dialogVisible: false,
			formFlag: false,
			ruleForm: {
				username: '', 
				password: '',    
				environment: '天熠云',  
				ip: ''           
			},
			EnvironmentList: [],
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
		          remark: '测试嗷嗷嗷啊啊嗷嗷嗷牛牛牛牛牛牛啊啊嗷嗷嗷啊啊'
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
		        }],
		        total: 0,
			    pageSize: 15,
			    pageNum: 1,
			    enddate: ''
			}
		},
		methods: {
			 handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		     },
			detailsFn(scope) {
				this.$refs.newAdd.dialogFn(scope, 'backlog')
			},
			fn(scope) {
				this.recordId = scope.row.id;
				this.dialogVisible = true;
				this.enddate = scope.row.enddate;
				if (scope.row.appState) {
					// 续约  ip
					this.appStateId = scope.row.appState;
					this.ruleForm = {
						username: scope.row.username, 
						password: scope.row.password,    
						environment: scope.row.environment,  
						ip: scope.row.ip
					}
					this.formFlag = true;
				} else {
					// 单纯同意
						this.appStateId = '';
						this.formFlag = false;
						this.ruleForm = {
						username: '', 
						password: '',    
						environment: '天熠云',  
						ip: ''  
					}
			  	}
			},
			handleCurrentChange(val) {
			      this.pageNum = val;
			      this.tableFn();
			 },
			tableFn() {
				this.$axios.post('VM/myApplication', {
					pagesize: this.pageSize,
					currentpage: this.pageNum
				}).then(res => {
					this.tableData = res.data.totalList;
					this.total = res.data.totalRecord;
				})
			},
			consentFn() {
				let {password, username, environment, ip} = this.ruleForm;
				if (password != '' && username != '' && environment != '' && ip != '') {
						this.$axios.post('VM/transitionToOrder', {
								...this.ruleForm,
								adminid: sessionStorage.userId,
								admin: sessionStorage.userInfo,
								id: this.recordId,
								enddate: this.enddate,
								appState: this.appStateId
								
					}).then(res => {
						if (res.status === 200) {
							this.dialogVisible = false;
				          	  this.$message({
								    message: '操作成功',
								       type: 'success'
								 });
							setTimeout(_ => {
								this.tableFn();
							}, 300)
				        }
					})
				} else {
					this.dialogVisible = true;
					this.$alert('请将表单填写完整', '提示', {
				            confirmButtonText: '确定'
				          });
				}
			},
			repulseFn(scope) {
						this.$axios.post('VM/disTransitionToOrder', {
								id: scope.row.id
					}).then(res => {
						if (res.status === 200) {
							this.dialogVisible = false;
				          	  this.$message({
								    message: '操作成功',
								       type: 'success'
								 });
							setTimeout(_ => {
								this.tableFn();
							}, 300)
				        }
					})
			},
			getEnvironment() {
				this.$axios.get('dic/getEnvironment').then(res => {
					this.EnvironmentList = res.data;
				})
			}
		},
		mounted() {
			this.tableFn()
			this.getEnvironment();
		}
	}
</script>

<style>
</style>