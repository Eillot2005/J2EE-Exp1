// 进度条加载动画
document.addEventListener("DOMContentLoaded", function() {
    const progressBars = document.querySelectorAll('.progress-fill');
    setTimeout(() => {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = "0";
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }, 300);
});