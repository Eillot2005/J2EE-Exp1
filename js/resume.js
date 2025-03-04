function anime() {
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar, index) => {
    // 保存目标宽度值
    const targetWidth =
      bar.getAttribute("style").match(/width:\s*(\d+)%/)[1] + "%";
    // 先将进度条设置为0
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = targetWidth;
    }, 500 * index);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (
    window.location.pathname.includes("resume.html") &&window.isLoggedIn()) {
    anime();
  }
});
