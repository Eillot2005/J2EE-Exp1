document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const otherCheckbox = document.getElementById('other');
    const otherHobbyInput = document.getElementById('otherHobby');
    const otherHobbyContainer = document.querySelector('.other-hobby');
    // 处理"其他"爱好选项的显示和隐藏
    otherCheckbox.addEventListener('change', function() {
        otherHobbyContainer.style.display = this.checked ? 'block' : 'none';
        if (!this.checked) {
            otherHobbyInput.value = '';
        }else{
            otherHobbyInput.addEventListener('blur',function(){
                if(otherHobbyInput.value.trim() === ''){
                    showError(otherHobbyInput, '请输入其他爱好');
                }else{
                    showFine(otherHobbyInput,'输入正确');
                }
            });
            otherHobbyInput.addEventListener('input',function(){
                if(otherHobbyInput.value.trim() === ''){
                    showError(otherHobbyInput, '请输入其他爱好');
                }else{
                    showFine(otherHobbyInput,'输入符合要求');
                }
            });
        }
    });

    education.addEventListener('blur', function() {
        if(education.value === ''){
            showError(education, '请选择学历');
        }
        else{
            showFine(education,'学历选择正确');
        }
    });
    education.addEventListener('input', function() {
        if(education.value === ''){
            showError(education, '请选择学历');
        }
        else{
            showFine(education,'学历选择正确');
        }
    });
    
    // 表单提交验证
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            // 收集表单数据
            const userData = {
                username: username,
                password: password,
                gender: document.querySelector('input[name="gender"]:checked')?.value || '',
                hobbies: getSelectedHobbies(),
                education: document.getElementById('education').value,
                introduction: document.getElementById('introduction').value
            };
            registerUser(userData);

            alert('注册信息已提交成功！您现在可以使用新账号登录了。');
            form.reset();
            otherHobbyContainer.style.display = 'none';
  
            window.location.href = 'index.html';
        }
    });
    
    // 实时验证密码一致性
    const userName=document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword'); 

    password.addEventListener('blur', function() {
        if (confirmPassword.value !== '') {// 如果确认密码不为空
            validatePasswordMatch();// 验证密码一致性
        }else if(password.value.length < 6){
            showError(password, '密码长度不能少于6个字符');
        }
        else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(password.value)){
            showError(password, '密码必须包含数字和字母');
        }
        else{
            showFine(password,'密码可用');
        }
        password.addEventListener('input', function() {
            if (confirmPassword.value !== '') {// 如果确认密码不为空
                validatePasswordMatch();// 验证密码一致性
            }else if(password.value.length < 6){
                showError(password, '密码长度不能少于6个字符');
            }
            else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(password.value)){
                showError(password, '密码必须包含数字和字母');
            }
            else{
                showFine(password,'密码可用');
            }
        });
    });
    confirmPassword.addEventListener('blur', function() {
        validatePasswordMatch();// 验证密码一致性
        confirmPassword.addEventListener('input', function() {
            validatePasswordMatch();// 验证密码一致性
        });
    });

    userName.addEventListener('blur', function() {
        if (isUsernameTaken(userName.value.trim())) {
            showError(userName, '该用户名已被注册');
        } else if(userName.value.trim() === ''){
            showError(userName, '用户名不能为空');
        }
        else if(userName.value.length < 3){
            showError(userName, '用户名长度不能少于3个字符');
        }
        else{
            showFine(userName,'用户名可用');
        }
        userName.addEventListener('input', function() {
            if (isUsernameTaken(userName.value.trim())) {
                showError(userName, '该用户名已被注册');
            } else if(userName.value.trim() === ''){
                showError(userName, '用户名不能为空');
            }
            else if(userName.value.length < 3){
                showError(userName, '用户名长度不能少于3个字符');
            }
            else{
                showFine(userName,'用户名可用');
            }
        });
    });
    
    // 获取选中的爱好
    function getSelectedHobbies() {
        const checkboxes = document.querySelectorAll('input[name="hobbies"]:checked');
        const hobbies = Array.from(checkboxes).map(cb => cb.value);

        if (hobbies.includes('other') && otherHobbyInput.value.trim() !== '') {
            hobbies.push(otherHobbyInput.value.trim());
        }
        return hobbies;
    }
    
    // 检查用户名是否已被注册
    function isUsernameTaken(username) {
        const userList = JSON.parse(localStorage.getItem('userList')) || [];
        return userList.some(user => user.username === username);
    }
    
    // 注册新用户
    function registerUser(userData) {
        const userList = JSON.parse(localStorage.getItem('userList')) || [];
        // 添加新用户
        userList.push({
            username: userData.username,
            password: userData.password,
            profile: {
                gender: userData.gender,
                hobbies: userData.hobbies,
                education: userData.education,
                introduction: userData.introduction
            }
        });

        localStorage.setItem('userList', JSON.stringify(userList));
    }
    
    // 表单验证函数
    function validateForm() {
        let isValid = true;
        // 重置所有错误提示,因为可能之前有错误提示
        const errorElements = document.querySelectorAll('.error-message, .ok-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('error');
            input.classList.remove('valid');
        });

        const genderChecked = document.querySelector('input[name="gender"]:checked');
        if (!genderChecked) {
            document.getElementById('gender-error').textContent = '请选择性别';
            isValid = false;
        }

        const education = document.getElementById('education');
        if (education.value === '') {
            showError(education, '请选择学历');
            isValid = false;
        }

        const captchaInput = document.getElementById('captcha');
        if (captchaInput.value.trim() === '') {
            showError(captchaInput, '请输入验证码');
            initCaptcha();
            isValid = false;
        } else if (captchaInput.value.toUpperCase() !== currentCaptcha) {
            showError(captchaInput, '验证码错误');
            initCaptcha();
            isValid = false;
        }

        return isValid;
    }
    
    // 验证密码一致性
    function validatePasswordMatch() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPassword-error');
        // 先清除之前的提示
        confirmPasswordError.textContent = '';
        confirmPassword.classList.remove('error');// 移除error类
        confirmPassword.classList.remove('valid');// 移除valid类
        if (confirmPassword.value === '') {
            showError(confirmPassword, '请确认密码');
            return false;
        } 
        else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, '两次输入的密码不一致');
            return false;
        } 
        else {
            showFine(confirmPassword,'密码一致');
            
            return true;
        }
    }
    
    // 显示错误信息
    function showError(input, message) {
        const errorId = input.id + '-error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message; /* 显示错误信息 */
            errorElement.style.color = 'red'; /* 设置错误信息的颜色为红色 */
        }
        input.classList.add('error');
        input.classList.remove('valid');
    }

    function showFine(input,message){
        const fineId = input.id + '-error';
        const fineElement = document.getElementById(fineId);
        if(fineElement){
            fineElement.textContent = message;
            fineElement.style.color = 'green';
        }
        input.classList.add('valid');
        input.classList.remove('error');
    }

    // 生成随机验证码
    function generateCaptcha() {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let captcha = '';
        for (let i = 0; i < 4; i++) {
            captcha += chars[Math.floor(Math.random() * chars.length)];
        }
        return captcha;
    }

    // 初始化验证码
    let currentCaptcha = '';
    function initCaptcha() {
        const captchaText = document.getElementById('captchaText');
        const refreshBtn = document.getElementById('refreshCaptcha');
        const captchaInput = document.getElementById('captcha');

        function refreshCaptcha() {
            currentCaptcha = generateCaptcha();
            captchaText.textContent = currentCaptcha;
        }

        refreshCaptcha(); // 初始生成验证码

        // 刷新验证码按钮事件
        refreshBtn.addEventListener('click', (e) => {
            e.preventDefault();
            refreshCaptcha();
            captchaInput.value = '';
        });
    }

    // 初始化验证码
    initCaptcha();
});
