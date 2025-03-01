// 列表项滑入动画效果
function animateDreamList() {
    try {
        const listItems = document.querySelectorAll(".dream-list li");
        if (listItems.length === 0) return;
        
        listItems.forEach((item, index) => {
            // 初始状态设置 - 透明且偏移
            item.style.opacity = "0";
            item.style.transform = "translateX(-20px)";
            
            // 使用setTimeout创建依次动画
            setTimeout(() => {
                item.style.transition = "all 1s ease";/* 0.5秒的过渡效果 */
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
            }, 500 * index); // 每个项目间隔500ms
        });
        console.log("列表动画已应用于", listItems.length, "个元素");
    } catch (error) {
        console.error("列表动画应用失败:", error);
    }
}

// 表格行动画效果
function animateTableRows() {
    try {
        const tableRows = document.querySelectorAll(".dream-table tr:not(:first-child)");
        if (tableRows.length === 0) return;
        
        tableRows.forEach((row, index) => {
            // 初始状态
            row.style.opacity = "0";
            row.style.transform = "translateY(10px)";
            
            // 延迟显示
            setTimeout(() => {
                row.style.transition = "all 0.4s ease";
                row.style.opacity = "1";
                row.style.transform = "translateY(0)";
            }, 100 * index);
        });
    } catch (error) {
        console.error("表格动画应用失败:", error);
    }
}

// 页面登录检查与初始化
document.addEventListener("DOMContentLoaded", function() {
    // 检查是否是保护页面并且已经登录
    if (
        window.location.pathname.includes('dream.html') && 
        (typeof window.isLoggedIn === "function" && window.isLoggedIn())
    ) {
        console.log("dream.js: 用户已登录，初始化页面");
        
        // 应用动画效果
        animateDreamList();
        animateTableRows();
        
        // 绑定其他事件
        const backButton = document.querySelector(".back-button");
        if (backButton) {
            backButton.addEventListener("click", function(e) {
                // 添加返回按钮点击效果
                this.classList.add("clicked");
                setTimeout(() => {
                    this.classList.remove("clicked");
                }, 200);
            });
        }
        
    } else if (window.location.pathname.includes('dream.html')) {
        console.warn("dream.js: 用户未登录，但尝试访问受保护页面");
    }
});

// 在页面加载前添加CSS类
(function() {
    document.documentElement.classList.add('js-enabled');
})();
