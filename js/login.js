// 说明：登录表单验证和用户身份验证
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录表单元素
    const loginForm = document.getElementById('loginForm');
    
    // 默认用户列表（如果本地存储中没有用户）
    const defaultUsers = [
        { username: 'admin', password: 'admin123' },
        { username: 'user1', password: 'password123' },
        { username: 'test', password: 'test123' }
    ];
    
    // 初始化用户数据
    initializeUserData();
    
    // 监听表单提交事件
    loginForm.addEventListener('submit', function(event) {
        // 阻止表单默认提交行为
        event.preventDefault();
        
        // 获取用户名和密码
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // 表单验证
        if (validateForm(username, password)) {
            // 验证用户身份
            if (authenticateUser(username, password)) {
                // 登录成功，跳转到主页
                alert('登录成功！');
                // 保存登录状态
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', username);
                // 跳转到主页
                window.location.href = 'main.html';
            } else {
                // 登录失败，显示错误信息
                showError('用户名或密码错误，请重试！');
            }
        }
    });
    
    // 创建错误信息容器（如果不存在）
    const createErrorContainer = () => {
        let errorContainer = document.getElementById('error-container');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'error-container';
            errorContainer.className = 'error-container';
            // 将错误容器插入到表单前面
            loginForm.parentNode.insertBefore(errorContainer, loginForm);
        }
        return errorContainer;
    };
    
    // 显示错误信息
    function showError(message) {
        const errorContainer = createErrorContainer();
        errorContainer.textContent = message;
        errorContainer.style.display = 'block';
        
        // 给输入框添加错误样式
        document.getElementById('username').classList.add('error');
        document.getElementById('password').classList.add('error');
        
        // 3秒后自动隐藏错误信息
        setTimeout(() => {
            errorContainer.style.display = 'none';
            // 移除输入框错误样式
            document.getElementById('username').classList.remove('error');
            document.getElementById('password').classList.remove('error');
        }, 3000);
    }
    
    // 表单验证函数
    function validateForm(username, password) {
        // 验证用户名
        if (username === '') {
            showError('请输入用户名');
            return false;
        }
        
        // 验证密码
        if (password === '') {
            showError('请输入密码');
            return false;
        }
        
        return true;
    }
    
    // 初始化用户数据
    function initializeUserData() {
        // 如果本地存储中没有用户数据，则使用默认用户列表
        if (!localStorage.getItem('userList')) {
            localStorage.setItem('userList', JSON.stringify(defaultUsers));
        }
    }
    
    // 用户身份验证
    function authenticateUser(username, password) {
        // 从本地存储中获取用户列表
        const userList = JSON.parse(localStorage.getItem('userList')) || [];
        
        // 在用户列表中查找匹配的用户
        const user = userList.find(user => 
            user.username === username && user.password === password
        );
        
        return !!user; // 转换为布尔值，如果找到用户则返回true，否则返回false
    }
    
    // 输入时清除错误样式
    document.getElementById('username').addEventListener('input', function() {
        this.classList.remove('error');
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
    });
    
    document.getElementById('password').addEventListener('input', function() {
        this.classList.remove('error');
        const errorContainer = document.getElementById('error-container');
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
    });
    
    // 添加记住我功能（可选）
    const rememberMeCheckbox = document.getElementById('rememberMe');
    if (rememberMeCheckbox) {
        // 如果之前有保存用户名，则自动填充
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            document.getElementById('username').value = savedUsername;
            rememberMeCheckbox.checked = true;
        }
        
        // 保存或清除记住的用户名
        loginForm.addEventListener('submit', function() {
            const username = document.getElementById('username').value.trim();
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
        });
    }
});