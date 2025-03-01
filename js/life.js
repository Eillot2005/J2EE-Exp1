// 作用：实现照片画廊的3D旋转效果
document.addEventListener("DOMContentLoaded", function () {
  // 照片数据
  const photos = [
    { url: "../images/bowenlou.jpg", caption: "美丽的学校日落" },
    { url: "../images/food.jpg", caption: "周末烹饪的美食" },
    { url: "../images/jiangjing.jpg", caption: "出门旅游的快乐时光" },
    { url: "../images/bowuguan.jpg", caption: "博物馆的文化学习" },
    { url: "../images/part.jpg", caption: "与朋友们的聚会" },
    { url: "../images/shijian.jpg", caption: "难忘的实践活动" },
    { url: "../images/train.jpg", caption: "漫无目的的随处闲逛" },
    { url: "../images/huanghelou.jpg", caption: "城市的夜晚" },
  ];

  const container = document.getElementById("photoContainer");
  const totalPhotos = photos.length;

  // 修改：增加相册半径，减少照片重叠
  const radius = 400; // 增大半径

  // 为每张照片创建元素
  photos.forEach((photo, index) => {
    // 计算每个照片的旋转角度
    const angle = (360 / totalPhotos) * index;
    // 计算变换样式 - 根据角度围绕Y轴分布
    const transform = `rotateY(${angle}deg) translateZ(${radius}px)`; // 使用变量控制半径

    // 创建照片元素
    const photoItem = document.createElement("div");
    photoItem.className = "photo-item";
    photoItem.style.backgroundImage = `url(${photo.url})`;
    photoItem.style.transform = transform;

    // 创建标题
    const caption = document.createElement("div");
    caption.className = "photo-caption";
    caption.textContent = photo.caption;

    // 添加到DOM
    photoItem.appendChild(caption);
    container.appendChild(photoItem);

    // 添加鼠标事件，防止事件冒泡
    photoItem.addEventListener("mouseenter", function (e) {
      e.stopPropagation();
    });

    photoItem.addEventListener("mouseleave", function (e) {
      e.stopPropagation();
    });
  });

  // 添加全局控制：鼠标在整个画廊上时暂停旋转
  document
    .querySelector(".photo-gallery")
    .addEventListener("mouseenter", function () {
      document.querySelector(".photo-container").style.animationPlayState =
        "paused";
    });

  document
    .querySelector(".photo-gallery")
    .addEventListener("mouseleave", function () {
      document.querySelector(".photo-container").style.animationPlayState =
        "running";
    });
});
