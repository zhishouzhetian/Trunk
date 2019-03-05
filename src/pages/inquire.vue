<template>
	<div id="inquire-content">
		<el-form :inline="true" status-icon label-position="right" label-width="54px" :model="formInline" :ref="formInline" class="demo-form-inline">
			<el-form-item label="时间">
	         	 <el-date-picker
			      v-model="formInline.timer"
			      type="date"
			      placeholder="选择日期">
	   			 </el-date-picker>
	      		</el-form-item>
	   		<el-form-item label="申请人">
	           <el-input v-model="formInline.applyName"></el-input>
	        </el-form-item>
	    	<el-form-item label="云环境">
	           <el-input v-model="formInline.theCloud"></el-input>
	        </el-form-item>
		    <el-button type="primary" siza="medium" icon="el-icon-search" @click="searchFn">搜素</el-button>
		    <el-button type="primary" siza="medium" icon="el-icon-refresh" @click="resetForm">重置</el-button>
		    <el-button  type="primary" siza="medium" icon="el-icon-upload2" @click="centerDialogVisible = true">导入</el-button>
		    <el-button  type="primary" siza="medium" icon="el-icon-download" @click="daochuFn('arraybuffer')">导出</el-button>
		</el-form>
		<div class="tableWrapper">
	      <el-table border stripe v-loading="loading" :data="tableData" style="width: 100%">
	        <el-table-column align='center' :prop="item.prop" :label="item.label" :width="item.width" v-for="item in tableCols" :key="item.prop" :formatter="item.formatter"></el-table-column>
	        <el-table-column align='center' label="操作" width="70">
	          <template slot-scope="scope">
	 					<el-button type="text" @click="fn(scope)">详情</el-button>
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
	    <el-dialog
		  title="导入"
		  :visible.sync="centerDialogVisible"
		  width="30%"
		  center>
		 	<el-upload
		 	  style="text-align: center;"
			  class="upload-demo"
			  drag
			  action="VM/importData"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
			</el-upload>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDialogVisible = false">关闭</el-button>
		    <!--<el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
		  </span>
		</el-dialog>
		<el-dialog title="详情"  :visible.sync="dialogFormVisible" width='60%'>
		  <el-form :model="ruleForm" :disabled="formFlag"  ref="ruleForm"  label-width="200px" class="demo-ruleForm">
		  <el-form-item label="申请人" prop="applicant">
		    <el-input v-model="ruleForm.applicant"></el-input>
		  </el-form-item>
		   <el-form-item label="申请部门" prop="section">
		    <el-input v-model="ruleForm.section"></el-input>
		  </el-form-item>
		   <el-form-item label="虚拟名称" prop="vmname">
		    <el-input v-model="ruleForm.vmname"></el-input>
		  </el-form-item>
		  <el-form-item label="操作系统" prop="systemname">
		    <el-input v-model="ruleForm.systemname"></el-input>
		  </el-form-item>
		  <el-form-item label="内存" prop="ram">
		     <el-input v-model="ruleForm.ram"></el-input>
		  </el-form-item>
		  <el-form-item label="硬盘" prop="memory">
		    <el-input v-model="ruleForm.memory"></el-input>
		  </el-form-item>
		  <el-form-item label="CPU" prop="cpu">
		    <el-input v-model="ruleForm.cpu"></el-input>
		  </el-form-item>
		  <el-form-item label="数量" prop="number">
		    <el-input v-model="ruleForm.number"></el-input>
		  </el-form-item>
		  <el-form-item label="开始时间" >
	         <el-date-picker
		      v-model="ruleForm.startdate"
		      type="date"
		      placeholder="选择日期"
		      >
		    </el-date-picker>
       	 </el-form-item>
       	  <el-form-item label="结束时间" >
	         <el-date-picker
		      v-model="ruleForm.enddate"
		      type="date"
		      placeholder="选择日期"
		      >
		    </el-date-picker>
       	 </el-form-item>
       	  <el-form-item label="备注" prop="remark">
		    <el-input type="textarea" v-model="ruleForm.remark" style="width: 300px;"></el-input>
		  </el-form-item>
		  <el-form-item label="登陆用户名" prop="username">
		    <el-input v-model="ruleForm.number"></el-input>
		  </el-form-item>
		  <el-form-item label="登陆密码" prop="password">
		    <el-input v-model="ruleForm.number"></el-input>
		  </el-form-item>
		  <el-form-item label="代办人" prop="admin">
		    <el-input v-model="ruleForm.number"></el-input>
		  </el-form-item>
		  <el-form-item label="云环境" prop="number">
		    <el-input v-model="ruleForm.environment"></el-input>
		  </el-form-item>
		  <el-form-item label="虚拟机IP" prop="number">
		    <el-input v-model="ruleForm.ip"></el-input>
		  </el-form-item>
		</el-form>
		  <div slot="footer" class="dialog-footer">
		    <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
		    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import {
    dateFormat
  } from '@/common/js/public.js'
	export default {
		data() {
//			const date = new Date()
			return {
			centerDialogVisible: false,
			formFlag: true,
			dialogFormVisible: false,
			loading: false,
			formInline: {
					timer: '',
					applyName: '',
					theCloud: ''
				},
			tableData: [],
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
//		        prop: 'memory',
//		        label: '内存',
//		        width: ''
//		        }, {
//		        prop: 'rem',
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
		        width: ''
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
		        }],
		        ruleForm: {
		          applicant: '',
		          section: '',
		          vmname: '',
		          systemname: '',
		          memory: '',
		          ram: '',
		          cpu: '',
		          number: 0,
		          startdate: '',
		          enddate: '',
		          remark: '',
		        // 登录用户名
				 username: '',
				// 登录密码
				 password: '',
				// 代办人
				 admin: '',
				// 云环境
				 environment: '',
				// 虚拟机ip
				  ip: ''
	        	},
		        total: 0,
			    pageSize: 15,
			    pageNum: 1
		  	}
		},
		methods: {
			fn(scope) {
				this.dialogFormVisible = true;
				this.ruleForm = scope.row;
				console.log(scope.row)
			},
			resetForm() {
		       this.formInline = {
					timer: '',
					applyName: '',
					theCloud: ''
				}
		   },
		   handleCurrentChange(val) {
			      this.pageNum = val;
			      this.searchFn();
			 },
		   // 搜索
		   searchFn() {
		   	console.log(this.formInline.timer)
		   	this.$axios.post('VM/selectVM', {
		   			state: '已同意', 
		   			startdate: this.formInline.timer,
		   			applicant: this.formInline.applyName,
		   			environment: this.formInline.theCloud,
		   			pagesize: this.pageSize,
					currentpage: this.pageNum,
					id: 1
		   	}).then(res => {
		   		this.tableData = res.data.totalList;
				this.total = res.data.totalRecord;
		   	})
		   },
		   beforeAvatarUpload(file) {
			   	let arr = file.name.split('.');
		    	let brr = arr[arr.length - 1];
	//	        const isLt200M = file.size / 1024 / 1024 < 200;
			    if (brr == 'excel' || brr == 'xlsx' || brr == "xls") {
			     	 return true
			    } else {
			    	 this.$message.error('上传文件只能是 excel 或 xlsx 格式!');
			    	 return false
			    }
			},
			handleAvatarSuccess(res) {
				console.log(res)
			},
			daochuFn(arraybvffer) {
//				exportExcelNew('VM/exportData', {
//					id: sessionStorage.userId
//				})
				let arraybuffeer = arraybvffer;
				this.$axios.post('VM/exportData', {
					id: sessionStorage.userId}, {responseType: arraybuffeer}).then(res => {
//					var blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=utf-8'})
					let blob = new Blob([res.data], { type: 'application/x-xls' });
//					let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
			   	    var filename = sessionStorage.getItem('filename') || "download.xls";
					var a = document.createElement('a');
					var url = window.URL.createObjectURL(blob);
					a.href = url;
					a.download = filename;
					var body = document.getElementsByTagName('body')[0];
					body.appendChild(a);
					a.click();
					body.removeChild(a);
					window.URL.revokeObjectURL(url);
					})
			}
		},
		mounted() {
			this.searchFn();
		}
	}
</script>

<style scoped lang="scss">
	#inquire-content{
		.el-form {
			background:#a2aec1;
			padding-top:25px;	
			.el-form-item {
				margin-right: 0px !important;
			}
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

