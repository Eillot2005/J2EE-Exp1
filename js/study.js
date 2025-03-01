/**
 * 学习页面的交互特效
 * 包含进度条动画和其他页面增强功能
 */

// 动画进度条
function animateProgressBars() {
    // 选择所有进度条
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // 初始隐藏所有进度条
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        
        // 延迟显示动画效果
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });
}

// 为课程列表添加动画效果
function animateCourseItems() {
    const courseItems = document.querySelectorAll('.study-list li');
    
    courseItems.forEach((item, index) => {
        // 设置初始状态
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        
        // 添加动画效果
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
        // 设置初始状态
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        
        // 添加动画效果
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
        // 设置初始状态
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        // 添加动画效果，使用交错延迟
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 200 + (index * 70));
    });
}

// 添加文件项悬停效果
function setupFileHoverEffects() {
    const fileItems = document.querySelectorAll('.file-item');
    
    fileItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.03)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 生成随机颜色并应用到文件项
function setRandomFileColors() {
    const fileItems = document.querySelectorAll('.file-item');/* 获取所有文件项，querySelectorAll返回的是一个NodeList */
    fileItems.forEach(item => {
        // 使用已有的panduan逻辑生成随机颜色
        const r = Math.round(Math.random() * 256)-20;
        const g = Math.round(Math.random() * 256)-20;
        const b = Math.round(Math.random() * 256)-20;
        const randomColor = `rgb(${r}, ${g}, ${b})`;
        
        // 设置文件项的颜色
        item.style.setProperty('--file-color', randomColor);/* 设置文件项的颜色,setProperty()方法设置一个新的或已更新的CSS属性的值,--file-color是自定义属性 */
        
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
    if (window.location.pathname.includes('study.html')) {
        console.log("study.js: 初始化页面");
        
        // 应用动画效果
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

function panduan() {
    var result = document.getElementById('result');
    var r = Math.round(Math.random() * 256);
    var g = Math.round(Math.random() * 256);
    var b = Math.round(Math.random() * 256);
    result.style.background = "rgb(" + r + "," + g + "," + b + ")";
}