<template>
	<div id="login-content" @keydown.enter="login()">
		<div class="login-middle">
			<h1 class="header">
	        	<img src="/static/img/logo.png" width="84" height="84"/>虚拟机管理平台
      		</h1>
      		<div class="form-vessel">
      			<div class="form-vessel-top">
      				用户登陆
      			</div>
      			<div class="form-vessel-bottom">
      				<el-form :ref="'loginForm'" :model="formInline" :rules="rules" label-width="80px" label-position="top">
	      				<el-form-item label="用户名"  prop="name" >
		                	<el-input v-model.trim="formInline.name"   placeholder='请输入用户名'></el-input>
		              </el-form-item>
		              <el-form-item label="密码"  prop="password" >
		                <el-input v-model.trim="formInline.password" type="password" placeholder='请输入密码'></el-input>
		              </el-form-item>
		               <el-button type="primary"  @click="login()" style="width: 100%;margin-top: 15px;">登录</el-button>
      				</el-form>
      			</div>
      		</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			let checkUser = (rule, value, callback) => {
		      if (!value) {
		        return callback(new Error("请输入用户名"));
		      } else {
		        callback();
		      }
		    };
		    let checkPwd = (rule, value, callback) => {
		      if (!value) {
		        return callback(new Error("请输入密码"));
		      } else {
		        callback();
		      }
		    };
			return {
				formInline: {
					name: '',
					password: ''
				},
				rules: {
		        name: [{ validator: checkUser, trigger: "blur" }],
		        password: [{ validator: checkPwd, trigger: "blur" }]
		      	}
			}
		},
		methods: {
			login() {
				  this.$refs.loginForm.validate(valid => {
				    if (valid) {
				    		this.$axios.post('login', {
				    			...this.formInline
				    		}).then(res => {
				    			if (res.data !== "用户名密码不匹配!") {
				    				this.$axios.get('getUserInfo').then(res => {
				    						this.loginMenuFn(res.data)
				    						sessionStorage.token = true;
				    						sessionStorage.userInfo = res.data.name;
				    						sessionStorage.userId = res.data.id;
				    						sessionStorage.relName = res.data.relName;
											sessionStorage.mySection = res.data.mySection;
				    				})
				    			} else {
				    				this.$alert(res.data, '提示', {
				           			 confirmButtonText: '确定'
				          			});
			           	  		 return false;
				    			}
				    		})
					} else {
						 this.$alert('请输入用户名和密码', '提示', {
				            confirmButtonText: '确定'
				          });
			           	   return false;
					}
		     	})
			},
			loginMenuFn(data) {
				this.$axios.post('permission/afterLogin', {
		    		...data
		    	}).then(res => {
		    		let webUrl = "/" + res.data.address
		    		this.$router.push(webUrl);
		    		sessionStorage.menu = JSON.stringify(res.data.menuList);
		    	})
			}
		}
	}
</script>
<style scoped lang="scss">
#login-content {
	width: 100%;
	height: 100%;
	background: url(/static/img/login_bg.png) no-repeat center / cover;
	.login-middle {
		position: relative;
   		margin: 0 auto;
    	padding-top: 100px;
		.header {
			font-family: MicrosoftYaHei-Bold;
    		font-size: 38px;
		    color: #d8e2ff;
		    letter-spacing: 3.62px;
		    text-align: center;
		    img {
		    	 vertical-align: middle;
		    }
		}
		.form-vessel {
			    width: 360px;
			    background: #f9fafc;
			    box-shadow: 0 0 20px 0 rgba(0,0,0,.2);
			    border-radius: 4px;
			    margin: 20px auto 0;
			    .form-vessel-top {
			    	height: 60px;
				    line-height: 60px;
				    padding-left: 30px;
				    font-family: MicrosoftYaHei-Bold;
				    font-size: 18px;
				    color: #fff;
				    letter-spacing: 0;
				    background: #0099fa;
				    border-radius: 4px 4px 0 0;
			    }
			    .form-vessel-bottom {
			    	padding:  30px;
    				position: relative;
			    }
		}
		
	}
}
</style>