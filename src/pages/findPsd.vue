<template>
  <div class="login"  @keydown.enter="login()">

    <div class="middle">
      <div class='wrapper'>
        <div class="content">
          <div class="title">
            修改密码
          </div>
          <div class="loginForm">
            <el-form ref="loginForm"  :model="formInline" :rules="rules" label-width="80px" label-position="top">
              <!--<el-form-item label="手机号" :class="{'is-error':userErr}" prop="mobile">
                <el-input v-model.trim="formInline.mobile" :maxlength='11' @change="userErr=false" placeholder='请输入手机号'></el-input>
                <i class="iconfont icon-yonghu" style="position: absolute; right: 0; top: 0; color: #B0BAC5;"></i>
              </el-form-item>-->
              <!--<el-form-item label="短信验证码" :class="{'is-error':codeErr}" prop="validationCode">
                <el-input placeholder='输入短信验证码' :maxlength='6' v-model.trim="formInline.checkCode" @change="codeErr=false" style="width: 180px;" ></el-input>
                <div class="inline-block checkCode">
                  <el-button type="primary" :loading="loading" @click="getCode()" style="width:100%;" :disabled='sendCk'>{{showT}}</el-button>
                </div>
              </el-form-item>-->
              <el-form-item label="当前密码" :class="{'is-error':userErr}" prop="currentPassword">
                <el-input placeholder='请输入当前密码' v-model.trim="formInline.currentPassword" type="password" @change="userErr=false"></el-input>
                <i class="iconfont icon-mima" style="position: absolute; right: 0; top: 0; color: #B0BAC5;"></i>
              </el-form-item>
              <el-form-item label="新密码" :class="{'is-error':userErr}" prop="password">
                <el-input placeholder='请输入新密码' v-model.trim="formInline.password" type="password" @change="userErr=false"></el-input>
                <i class="iconfont icon-mima" style="position: absolute; right: 0; top: 0; color: #B0BAC5;"></i>
              </el-form-item>
              <el-form-item label="确认密码" :class="{'is-error':userErr}" prop="newPassword">
                <el-input placeholder='请再次输入密码' v-model.trim="formInline.newPassword" type="password" @change="userErr=false"></el-input>
                <i class="iconfont icon-mima" style="position: absolute; right: 0; top: 0; color: #B0BAC5;"></i>
              </el-form-item>
            </el-form>
            <!--<span class="errorMsg" v-show="showMsg">{{errorMsg}}</span>-->
            <el-button type="primary" :disabled='allowClick'  @click="login" style="width: 100%;margin-top: 15px;">提交</el-button>
            <el-button type="primary"   @click="$router.push('/')" style="width: 100%;margin:15px 0 0 0;">返回登录页</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {jsMd5} from '../common/js/public.js'
  // import jsMd5 from 'js-md5'
  export default {
    name: 'login',
    data () {
    	let current = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入当前密码'));
        } else if (/^\w{5,15}$/.test(value)) {
          callback();
        } else {
          return callback(new Error('密码只能是数字、字母或下划线且长度在6-15位'));
        }
      };
      let checkPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入当前密码'));
        } else if (/^\w{6,15}$/.test(value)) {
          callback();
        } else {
          return callback(new Error('密码只能是数字、字母或下划线且长度在6-15位'));
        }
      };
      let checkPwdAgain = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请再次输入密码'));
        } else {
          if (this.formInline.password == this.formInline.newPassword) {
            callback();
          } else {
            callback(new Error('两次输入的密码不一致'));
          }
        }
      };
      let checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };

			let checkMobile = (rule, value, callback) => {
		        if (!value) {
				  this.sendCk = true;
		          return callback(new Error('手机号不能为空'));
		        } else {
					if (value.length < 11) {
						this.sendCk = true;
						callback();
					} else {
            this.sendCk = false;
            callback();
					}
	             }
		  	};
      return {
        formInline: {
          currentPassword: '',
          password: '',
          newPassword: '',
          checkCode: ''
        },
        account: '',
        showT: '发送验证码',
        showMsg: false,
        sendCk: true,
        checkTime: 0,
        errorMsg: '',
        codeErr: false,
        userErr: false,
        loading: false,
        rules: {
          mobile: [
            { validator: checkMobile, trigger: 'change' }
          ],
          newPassword: [
            { validator: checkPwdAgain, trigger: 'blur' }
          ], 
          currentPassword: [
            { validator: current, trigger: 'blur' }
          ],
          password: [
            { validator: checkPwd, trigger: 'blur' }
          ],
          checkCode: [
            { validator: checkCode, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      login () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$axios.post('permission/changePassword', {
                id: sessionStorage.userId,
								name: sessionStorage.userInfo,
								password: this.formInline.currentPassword,
								newPassword: this.formInline.password
            }).then(res => {
            	if (res.data !== "初始密码不正确!") {
				    				setTimeout(_ => {
				    					 this.$message({
								          message: '密码修改成功',
								          type: 'success'
								        });
								        this.$router.push('/')
				    				}, 300)
				    			} else {
				    				this.$alert(res.data, '提示', {
				           			 confirmButtonText: '确定'
				          			});
			           	  		 return false;
				    			}
            })
          } else {
            return false;
          }
        });
      }
    },
    created () {
      //	sessionStorage.clear();
    },
    computed: {
      allowClick () {
        if (this.formInline.newPassword == this.formInline.password && this.formInline.newPassword && (this.formInline.newPassword.length <= 15) && (this.formInline.password.length >= 6)) {
          return false
        } else {
          return true
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .find-psd{
    text-align:right;
    padding-top:10px;
    }
  .login{
    background: url("/static/img/login_bg.png") no-repeat center/cover;
    height: 100%;
    width: 100%;
    .middle {
      position: relative;
      margin: 0px auto;
      padding-top: 100px;
      .header {
        font-family: MicrosoftYaHei-Bold;
        font-size: 38px;
        color: #D8E2FF;
        letter-spacing: 3.62px;
        text-align: center;
        img {
          vertical-align: middle;
          margin-top: -5px;
        }
      }
    }
      .content {
        width: 360px;
        background: #F9FAFC;
        box-shadow: 0 0 20px 0 rgba(0,0,0,0.20);
        border-radius: 4px;
        margin: 20px auto 0;
        .title {
          height: 60px;
          line-height: 60px;
          padding-left: 30px;
          font-family: MicrosoftYaHei-Bold;
          font-size: 18px;
          color: #FFFFFF;
          letter-spacing: 0;
          background-image: linear-gradient(-179deg, #0099FA 0%, #0085DA 100%);
          border-radius: 4px 4px 0 0;
        }
        .loginForm {
          padding: 30px;
          position: relative;
          .checkCode {
            width: 116px;
            float: right;
            text-align: center;
            overflow: hidden;
          }
          .errorMsg {
            position: absolute;
            font-size: 12px;
            color: #FF4949;
            bottom: 77px;
          }
        }
      }
}
</style>
<style>
   .el-form-item__label{
      line-height:16px;
      padding: 11px 12px 11px 0;
    }
</style>
