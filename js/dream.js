// 列表项滑入动画效果
function animateDreamList() {
    try {
        const listItems = document.querySelectorAll(".dream-list li");
        if (listItems.length === 0) return;
        listItems.forEach((item, index) => {
            // 初始状态设置 - 透明且偏移
            item.style.opacity = "0";
            item.style.transform = "translateX(-20px)";
            setTimeout(() => {
                item.style.transition = "all 1s ease";
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
            }, 1200 * index);
        });
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
            row.style.opacity = "0";
            row.style.transform = "translateY(10px)";
            setTimeout(() => {
                row.style.transition = "all 1s ease";
                row.style.opacity = "1";
                row.style.transform = "translateY(0)";
            }, 150 * index);
        });
    } catch (error) {
        console.error("表格动画应用失败:", error);
    }
}

// 页面登录检查与初始化
document.addEventListener("DOMContentLoaded", function() {
    if (
        window.location.pathname.includes('dream.html') && 
        (typeof window.isLoggedIn === "function" && window.isLoggedIn())
    ) {
        console.log("dream.js: 用户已登录，初始化页面");

        animateDreamList();
        animateTableRows();
        // 绑定其他事件
        const backButton = document.querySelector(".back-button");
        if (backButton) {
            backButton.addEventListener("click", function(e) {
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
