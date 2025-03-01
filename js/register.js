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
        }
    });
    
    // 表单提交验证
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validateForm()) {
            // 获取用户输入的数据
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            // 检查用户名是否已存在
            if (isUsernameTaken(username)) {
                showError(document.getElementById('username'), '该用户名已被注册');
                return;
            }
            
            // 收集表单数据
            const userData = {
                username: username,
                password: password,
                gender: document.querySelector('input[name="gender"]:checked')?.value || '',
                hobbies: getSelectedHobbies(),
                education: document.getElementById('education').value,
                introduction: document.getElementById('introduction').value
            };
            
            // 保存用户数据
            registerUser(userData);
            
            // 表单验证通过后的提交逻辑
            alert('注册信息已提交成功！您现在可以使用新账号登录了。');
            // 重置表单
            form.reset();
            otherHobbyContainer.style.display = 'none';
            // 跳转到登录页面
            window.location.href = 'index.html';
        }
    });
    
    // 实时验证密码一致性
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    // 两个密码输入框都需要监听变化
    password.addEventListener('input', function() {
        if (confirmPassword.value !== '') {// 如果确认密码不为空
            validatePasswordMatch();// 验证密码一致性
        }
    });
    
    confirmPassword.addEventListener('input', function() {
        validatePasswordMatch();// 验证密码一致性
    });
    
    // 获取选中的爱好
    function getSelectedHobbies() {
        const checkboxes = document.querySelectorAll('input[name="hobbies"]:checked');
        const hobbies = Array.from(checkboxes).map(cb => cb.value);
        
        // 如果选中了"其他"，添加其他爱好的具体内容
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
        // 从本地存储中获取现有用户列表
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
        
        // 更新本地存储
        localStorage.setItem('userList', JSON.stringify(userList));
    }
    
    // 表单验证函数
    function validateForm() {
        let isValid = true;
        
        // 重置所有错误提示
        const errorElements = document.querySelectorAll('.error-message, .ok-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.classList.remove('error');
            input.classList.remove('valid');
        });
        
        // 验证用户名
        const username = document.getElementById('username');
        if (username.value.trim() === '') {
            showError(username, '用户名不能为空');
            isValid = false;
        } else if (username.value.length < 3) {
            showError(username, '用户名长度不能少于3个字符');
            isValid = false;
        }
        
        // 验证密码
        const password = document.getElementById('password');
        if (password.value === '') {
            showError(password, '密码不能为空');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, '密码长度不能少于6个字符');
            isValid = false;
        }
        
        // 验证确认密码
        if (!validatePasswordMatch()) {
            isValid = false;
        }
        
        // 验证性别
        const genderChecked = document.querySelector('input[name="gender"]:checked');
        if (!genderChecked) {
            document.getElementById('gender-error').textContent = '请选择性别';
            isValid = false;
        }
        
        // 验证学历
        const education = document.getElementById('education');
        if (education.value === '') {
            showError(education, '请选择学历');
            isValid = false;
        }
        
        // 验证其他爱好
        if (otherCheckbox.checked && otherHobbyInput.value.trim() === '') {
            showError(otherHobbyInput, '请说明其他兴趣爱好');
            isValid = false;
        }
        
        return isValid;
    }
    
    // 验证密码一致性
    function validatePasswordMatch() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPassword-error');// 获取错误提示元素
        const confirmPasswordOk = document.getElementById('confirmPassword-ok');// 获取正确提示元素
        
        // 先清除之前的提示
        confirmPasswordError.textContent = '';
        confirmPasswordOk.textContent = '';
        confirmPassword.classList.remove('error');// 移除error类
        confirmPassword.classList.remove('valid');// 移除valid类
        
        // 如果确认密码为空
        if (confirmPassword.value === '') {
            showError(confirmPassword, '请确认密码');
            return false;
        } 
        // 如果两次密码不一致
        else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, '两次输入的密码不一致');
            return false;
        } 
        // 如果两次密码一致
        else {
            confirmPasswordOk.textContent = '密码一致';
            confirmPassword.classList.add('valid');
            confirmPassword.classList.remove('error');
            return true;
        }
    }
    
    // 显示错误信息
    function showError(input, message) {
        const errorId = input.id + '-error'; /* 生成错误信息的id */
        const errorElement = document.getElementById(errorId); /* 获取错误信息的元素 */
        if (errorElement) { /* 如果错误信息元素存在 */
            errorElement.textContent = message; /* 显示错误信息 */
        }
        input.classList.add('error'); /* 为输入框添加error类 */
        input.classList.remove('valid'); /* 移除valid类 */
    }
});
