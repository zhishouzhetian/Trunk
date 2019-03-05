<template>
	<div id="dialog">
		<el-dialog title="详情"  :visible.sync="dialogFormVisible" width='70%'>
		  <el-form :model="ruleForm" :disabled="formFlag"  ref="ruleForm"  label-width="200px" class="demo-ruleForm">
		  <el-form-item label="申请人" prop="id">
		    <el-input v-model="ruleForm.applicant"></el-input>
		  </el-form-item>
		   <el-form-item label="申请部门" prop="section">
		    <el-input v-model="ruleForm.section"></el-input>
		  </el-form-item>
		  <el-form-item label="用途" prop="vmname">
		    <el-input v-model="ruleForm.application"></el-input>
		  </el-form-item>
		   <el-form-item label="虚拟名称" prop="vmname">
		    <el-input v-model="ruleForm.vmname"></el-input>
		  </el-form-item>
		  <el-form-item label="操作系统" prop="systemname">
		    <el-input v-model="ruleForm.systemname"></el-input>
		  </el-form-item>
		  <el-form-item label="内存" prop="memory">
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
		  <el-form-item label="登陆用户名" prop="username" v-show="formShow !='backlog'">
		    <el-input v-model="ruleForm.username"></el-input>
		  </el-form-item>
		  <el-form-item label="登陆密码" prop="password"  v-show="formShow !='backlog'">
		    <el-input v-model="ruleForm.password"></el-input>
		  </el-form-item>
		  <el-form-item label="代办人" prop="admin"  v-show="formShow !='backlog'">
		    <el-input v-model="ruleForm.admin"></el-input>
		  </el-form-item>
		  <el-form-item label="云环境" prop="number"  v-show="formShow !='backlog'">
		    <el-input v-model="ruleForm.environment"></el-input>
		  </el-form-item>
		  <el-form-item label="虚拟机IP" prop="number"  v-show="formShow !='backlog'">
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
	export default {
		data() {
			return {
				dialogFormVisible: false,
				formFlag: true,
				formShow: '',
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
	        	}
			}
		},
		methods: {
			dialogFn(scope, val) {
				this.dialogFormVisible = true;
				this.ruleForm = scope.row;
				this.formShow = val;
			}
		}
	}
</script>

<style lang="scss" scoped>
	#dialog {
		.el-dialog {
			.el-form {
				background:white;
				.el-input {
					width: 300px !important;
				}
			}
		}
	}
</style>