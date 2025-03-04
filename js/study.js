// 动画进度条
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    // 初始隐藏所有进度条
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        index=1;
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 1000);
    });
}

// 为课程列表添加动画效果
function animateCourseItems() {
    const courseItems = document.querySelectorAll('.study-list li');
    courseItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 200 + (index * 100));
    });
}

// 为类别添加动画效果
function animateCategoryItems() {
    const categories = document.querySelectorAll('.study-category');
    categories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        setTimeout(() => {
            category.style.transition = 'all 0.5s ease';
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

// 为文件项添加动画效果
function animateFileItems() {
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.5)';
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 200 + (index * 70));
    });
}

// 生成随机颜色并应用到文件项
function setRandomFileColors() {
    const fileItems = document.querySelectorAll('.file-item');/* 获取所有文件项，querySelectorAll返回的是一个NodeList */
    fileItems.forEach(item => {
        const r = Math.round(Math.random() * 256);
        const g = Math.round(Math.random() * 256);
        const b = Math.round(Math.random() * 256);
        const randomColor = `rgb(${r}, ${g}, ${b})`;
        // 设置文件项的颜色
        item.style.setProperty('--file-color', randomColor);
        // 设置图标颜色
        const iconElement = item.querySelector('.file-icon i');/* 获取文件项中的图标 */
        if (iconElement) {/* 如果图标存在 */
            iconElement.style.color = randomColor;/* 设置图标的颜色 */
        }
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否是保护页面并且已经登录
    if (window.location.pathname.includes('study.html')&&window.isLoggedIn()) {
        setTimeout(animateProgressBars, 500);
        animateCourseItems();
        animateCategoryItems();
        // 设置文件项随机颜色
        setRandomFileColors();
        // 延迟加载文件项动画
        setTimeout(animateFileItems, 800);
        // 返回按钮效果
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', function() {
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 300);
            });
        }
    }
});