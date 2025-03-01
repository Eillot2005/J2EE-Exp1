/**
 * 用户登录状态管理与页面功能
 * 包含登录检查、用户信息显示和登出功能
 */

// 检查用户是否已登录 - 返回布尔值，不进行重定向
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 检查用户是否已登录，如果没有登录则重定向到登录页
function checkLoginStatus() {
    if (!isLoggedIn()) {
        alert('请先登录');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// 设置用户登录状态
function setLoginStatus(username) {
    localStorage.setItem('isLoggedIn', 'true');
    if (username) {
        localStorage.setItem('username', username);
    }
}

// 清除用户登录状态
function clearLoginStatus() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
}

// 展示当前用户信息
function displayUserInfo() {
    const userElement = document.getElementById('currentUser');
    if (userElement) {
        const username = localStorage.getItem('username') || '访客';
        userElement.textContent = username;
    }
}

// 处理退出登录 - 可从HTML直接调用
function logout() {
    clearLoginStatus();
    alert('您已成功退出登录');
    window.location.href = 'index.html';
}

// 初始化页面功能
function initPage() {
    // 显示用户信息
    displayUserInfo();
    
    // 页面交互增强可以在此处添加
    const boxes = document.querySelectorAll('.box');
    if (boxes.length > 0) {
        boxes.forEach(box => {
            box.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            box.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
    }
    
    // 添加退出登录按钮的事件监听
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.removeEventListener('click', logout); // 移除旧的事件监听器，防止重复
        logoutBtn.addEventListener('click', logout);
        console.log("退出按钮事件已绑定");
    }
}

// 保护页面 - 适用于所有需要登录才能访问的页面
function protectPage() {
    if (!isLoggedIn()) {
        alert('请先登录');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面加载 - 当前路径:", window.location.pathname);
    
    // 检查当前是否在需要保护的页面
    const protectedPages = ['main.html', 'dream.html', 'life.html', 'study.html', 'resume.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        console.log("当前页面需要登录保护:", currentPage);
        if (!protectPage()) {
            return; // 如果验证不通过，停止执行后续代码
        }
    }
    
    // 初始化所有页面共有的功能
    if (document.querySelector('.user-info')) {
        displayUserInfo();
    }
    
    // 针对特定页面的初始化
    if (currentPage === 'main.html') {
        initPage();
    }
});

// 确保全局可访问退出函数
window.logout = logout;
window.checkLoginStatus = checkLoginStatus;
window.isLoggedIn = isLoggedIn;
