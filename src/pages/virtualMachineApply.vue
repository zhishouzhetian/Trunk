<template>
	<div id="apply-content">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="100px" class="demo-ruleForm">
		  <el-row>
				<el-col :span="12">
					<el-form-item label="申请人" prop="applicant">
						<el-input :disabled="true" v-model="ruleForm.applicant"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item  label="申请部门" prop="section">
						<el-input :disabled="true" v-model="ruleForm.section"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="用途" prop="application">
						<el-input v-model="ruleForm.application"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="虚拟名称" prop="vmname">
						<el-input v-model="ruleForm.vmname"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
				<el-form-item label="操作系统" style="position:relative">
	          <el-select v-model.trim="ruleForm.systemname" filterable size="15">
	            <el-option :label="value.name" :value="value.name" :key="value.id" v-for="value in SystemList"></el-option>
	          </el-select>
		      <span v-show="systemnameInfor===ruleForm.systemname" class="systemname-infor">//&nbsp;Centos7.2-CloudStar-test-temp系统，内存>1G,存储>200G。</span>
	        </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="内存g" prop="ram">
						<el-input v-model="ruleForm.ram"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="硬盘g" prop="memory">
						<el-input v-model="ruleForm.memory"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="CPU" prop="cpu">
						<el-input v-model="ruleForm.cpu"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		   <el-row>
				<el-col :span="12">
					<el-form-item label="数量" prop="number">
						<el-input v-model="ruleForm.number"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		  <el-row>
				<el-col :span="12">
					<el-form-item label="开始时间" >
	         <el-date-picker
	          :picker-options="pickerOptions"
		      v-model="ruleForm.startdate"
		      type="date"
		      placeholder="选择日期"
		      >
		    </el-date-picker>
       	 </el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="结束时间"  >
	         <el-date-picker
	         :picker-options="pickerOptions"
		      v-model="ruleForm.enddate"
		      type="date"
		      placeholder="选择日期"
		      >
		    </el-date-picker>
       	 </el-form-item>
				</el-col>
			</el-row> 
			<el-row> 
				<el-form-item label="备注" prop="remark">
		    <el-input type="textarea" v-model="ruleForm.remark"></el-input>
		  </el-form-item>
		  </el-row> 
		<el-button type="primary" style="margin-left: 100px;"  @click="Submit">提交</el-button>
		<el-button type="info" @click="resetForm">取消</el-button>
		</el-form>
	</div>
</template>
<script>
  export default {
    data() {
    	const newDate = new Date();
        newDate.setTime(newDate.getTime() - 3600 * 1000 * 24);
//      let date = new Date();
//      date = new Date();
    	const validateAcquaintance = (rule, value, callback) => {
		  if (!value) {
		    callback(new Error('不能为空'))
		  }
		  value = Number(value)
		  if (typeof value === 'number' && !isNaN(value)) {
		      callback()
		  } else {
		    callback(new Error('必须为阿拉伯数字'))
		  }
		}
      return {
				SystemList: [],
			  systemnameInfor: 'Centos7.2-CloudStar-test-temp',
				pickerOptions: {
								disabledDate(time) {
									return time.getTime() < newDate;
								}
					},
        ruleForm: {
		// 虚拟机名称
		vmname: '',
		// 用途
		application: '',
		// 系统
		 systemname: '',
		// 内存(G)
		 ram: '',
		// 硬盘空间存储大小(G)
		 memory: '',
		// CPU是几核的
		cpu: '',
		// 数量(台)
		 number: '',
		// 申请人
		applicant: '',
		// 申请部门
		section: '',
		// 开始使用日期
		startdate: '',
		// 使用结束日期
		enddate: '',
		// 备注
		remark: ''
        },
        rules: {
          applicant: [
            { required: true, message: '请输入申请人名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          section: [
            { required: true, message: '请输入所属部门', trigger: 'blur' }
          ],
          application: [
            { required: true, message: '请输入用途', trigger: 'blur' }
          ],
          vmname: [
            { required: true, message: '请输入虚拟机名称', trigger: 'blur' }
          ],
          systemname: [
            { required: true, message: '1.Centos7.2-CloudStar-test-temp系统，内存最小能选择1G,存储最小能选择200G。', trigger: 'blur' }
          ],
          ram: [
            { required: true, message: '请输入内存容量', trigger: 'blur' }
          ],
          memory: [
            { required: true, message: '请输入硬盘型号', trigger: 'blur' }
          ],
          cpu: [
            { required: true, message: '请输入CPU型号', trigger: 'blur' }
          ],
          number: [
            { required: true, message: '请输入数量', trigger: 'blur' },
            {validator: validateAcquaintance, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      	   	// 时间判断
		    showLog () {
		          if (this.ruleForm.startdate && this.ruleForm.enddate) {
		            if (this.ruleForm.startdate > this.ruleForm.enddate) {
		            	 this.$alert('结束时间不能小于开始时间', '提示', {
				            confirmButtonText: '确定'
				          });
		             	 return false
		            } else {
		              return true
		            }
		          } else {
				          this.$alert('日期不能为空', '提示', {
				            confirmButtonText: '确定'
				          });
				    	return false
		          }
		    },
		    resetForm() {
		        this.$refs['ruleForm'].resetFields();
		    },
		    Submit() {
					this.$refs['ruleForm'].validate((valid) => {
			         	if (valid) {
				          	let flag = this.showLog();
				          	if (flag) {
				          	  this.$axios.post('application/xmApplication', {
				          	  	applicantid: sessionStorage.userId,
				          	  	...this.ruleForm
				          		}).then(res => {
				          	  		if (res.status === 200) {
				          	  			 this.$message({
								          message: '申请成功',
								          type: 'success'
								        });
								        setTimeout(_ => {
											this.$router.push('/myApplyFor');
										}, 300)
				          	  		}
				          	  	})
				          	}
			          	} else {
			            	 this.$alert('请将表单填写完整', '提示', {
				            confirmButtonText: '确定'
				          });
			           	    return false;
			          }
		       	 });
		      },
		      getSystemListFn() {
		      	this.$axios.get('getSystemName').then(res => {
		      		this.SystemList = res.data
		      	})
		      }
    },
    mounted() {
    	this.getSystemListFn();
    	this.ruleForm.applicant = sessionStorage.relName;
		// 申请部门
		this.ruleForm.section = sessionStorage.mySection;
    }
  }
</script>
<style scoped lang="scss">

</style>
<style type="text/css">
.demo-ruleForm{
	width: 868px;
}
.systemname-infor{
	width: 500px;
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
}
#apply-content .demo-ruleForm .el-input {
	width: auto;
}
#apply-content .demo-ruleForm .el-input__inner {
	width: 300px !important;
}
#apply-content .demo-ruleForm .el-textarea__inner {
			width: 735px;
			height: 110px;
}
</style>
