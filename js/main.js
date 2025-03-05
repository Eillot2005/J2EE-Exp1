function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function checkLoginStatus() {
    if (!isLoggedIn()) {
        alert('请先登录');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function setLoginStatus(username) {
    localStorage.setItem('isLoggedIn', 'true');
    if (username) {
        localStorage.setItem('username', username);
    }
}

function clearLoginStatus() {
    localStorage.removeItem('isLoggedIn');
}

function displayUserInfo() {
    const userElement = document.getElementById('currentUser');
    if (userElement) {
        const username = localStorage.getItem('currentUser')||'???';
        userElement.textContent = username;
    }
}

function logout() {
    clearLoginStatus();
    window.location.href = 'index.html';
}

// 初始化页面功能
function initPage() {
    displayUserInfo();
    const logoutBtn = document.querySelector('.logout');
    logoutBtn?.removeEventListener('click', logout);
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('确定要退出登录吗？')) {
                logout();
            }else{
                alert('取消退出');
            }
        });
    }
}

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
    const protectedPages = ['main.html', 'dream.html', 'life.html', 'study.html', 'resume.html','map.html'];
    const currentPage = window.location.pathname.split('/').pop();
    if (protectedPages.includes(currentPage)) {
        console.log("当前页面需要登录保护:", currentPage);
        if (!protectPage()) {
            return;
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