const cityData = {
    wuhan: {
        name: "武汉",
        images: [
            "../images/wuhan1.JPG",
            "../images/wuhan2.JPG",
            "../images/wuhan3.JPG",
            "../images/wuhan4.JPG",
            "../images/wuhan5.JPG"
        ],
        description: "武汉，湖北省省会，是中部六省唯一的副省级市，特大城市，国家中心城市，超大城市。位于江汉平原东部、长江中游，是长江经济带核心城市，也是中国内陆最大的水陆空交通枢纽。黄鹤楼、东湖、长江大桥等是武汉著名的旅游景点。"
    },
    nanjing: {
        name: "南京",
        images: [
            "../images/南京1.png",
            "../images/南京2.png",
            "../images/南京3.png",
            "../images/南京4.png",
            "../images/南京5.png",
        ],
        description: "南京，江苏省省会，副省级市，特大城市，国家中心城市，南京都市圈核心城市。有着\"六朝古都\"之称，历史悠久，文化底蕴深厚。夫子庙、中山陵、明孝陵、总统府等是南京著名的旅游景点。"
    },
    changsha: {
        name: "长沙",
        images: [
            "../images/changsha1.jpg",
            "../images/changsha2.jpg"
        ],
        description: "长沙，湖南省省会，副省级市，特大城市，长江中游城市群核心城市。有着\"楚汉名城\"的美誉，是国家历史文化名城。岳麓山、橘子洲头、湖南省博物馆等是长沙著名的旅游景点。"
    },
    luoyang: {
        name: "洛阳",
        images: [
            "../images/luoyang1.png",
            "../images/luoyang2.png",
            "../images/luoyang3.png",
            "../images/luoyang4.png",
            "../images/luoyang5.png"
        ],
        description: "洛阳，河南省地级市，中华文明的发祥地之一，是中国历史文化名城，被誉为\"世界文化遗产之都\"。白马寺、龙门石窟、洛阳古城等是洛阳著名的旅游景点。"
    },
    dali: {
        name: "大理",
        images: [
            "../images/dali1.png",
            "../images/dali2.png",
            "../images/dali3.png"
        ],
        description: "大理，云南省地级市，是中国历史文化名城，有着\"文化名邦、风景胜地\"的美誉。大理古城、苍山、洱海等是大理著名的旅游景点。"
    }
};

// 获取所有城市标记点
const cityMarkers = document.querySelectorAll('.city-marker');
const cityNameElement = document.getElementById('city-name');
const cityImageElement = document.getElementById('city-image');
const cityDescriptionElement = document.getElementById('city-description');

// 当前城市和当前显示的图片索引
let currentCity = null;
let currentImageIndex = 0;
let slideInterval = null;

cityMarkers.forEach(marker => {
    marker.addEventListener('click', function() {
        const city = this.getAttribute('data-city');
        // 清除之前的自动轮播
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        if (cityData[city]) {
            currentCity = city;
            currentImageIndex = 0;
            
            updateCityInfo();
            startSlideshow();
        }
        
        // 突出显示选中的城市标记
        cityMarkers.forEach(m => m.style.backgroundColor = 'red');
        this.style.backgroundColor = '#ff9900';
    });
});

function updateCityInfo() {
    if (!currentCity) return;
    
    const city = cityData[currentCity];
    cityNameElement.textContent = city.name;
    cityImageElement.src = city.images[currentImageIndex];
    cityImageElement.style.display = 'block';
    cityImageElement.alt = `${city.name}风景`;
    cityDescriptionElement.textContent = city.description;
    
    updateNavigationDots();
}

function startSlideshow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
    slideInterval = setInterval(() => {
        nextImage();
    }, 2000);
}

function nextImage() {
    if (!currentCity) return;
    
    const totalImages = cityData[currentCity].images.length;
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    updateCityInfo();
}

function prevImage() {
    if (!currentCity) return;
    
    const totalImages = cityData[currentCity].images.length;
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    updateCityInfo();
}

// 创建和更新导航点
function updateNavigationDots() {
    const navContainer = document.getElementById('image-nav');
    navContainer.innerHTML = '';
    
    if (!currentCity) return;
    
    const images = cityData[currentCity].images;
    // 创建导航点
    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement('span');
        dot.className = 'nav-dot';
        if (i === currentImageIndex) {
            dot.classList.add('active');
        }
        // 添加点击事件，直接跳转到相应的图片
        dot.addEventListener('click', () => {
            currentImageIndex = i;
            updateCityInfo();
            resetSlideshowTimer();
        });
        
        navContainer.appendChild(dot);
    }
}

function resetSlideshowTimer() {
    if (slideInterval) {
        clearInterval(slideInterval);
        startSlideshow();
    }
}

// 添加鼠标悬停提示效果
cityMarkers.forEach(marker => {
    marker.addEventListener('mouseenter', function() {
        const city = this.getAttribute('data-city');
        if (cityData[city]) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = cityData[city].name;
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '14px';
            tooltip.style.left = `${this.offsetLeft + 25}px`;
            tooltip.style.top = `${this.offsetTop - 10}px`;
            tooltip.style.zIndex = '1000';
            
            document.querySelector('.map-container').appendChild(tooltip);
            this._tooltip = tooltip;
        }
    });
    
    marker.addEventListener('mouseleave', function() {
        if (this._tooltip) {
            this._tooltip.remove();
            this._tooltip = null;
        }
    });
});

// 初始化信息
cityNameElement.textContent = "点击地图上的红点查看城市风景";

// 为左右箭头按钮添加事件监听器
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('prev-btn').addEventListener('click', function(e) {
        e.preventDefault();
        prevImage();
        resetSlideshowTimer();
    });
    
    document.getElementById('next-btn').addEventListener('click', function(e) {
        e.preventDefault();
        nextImage();
        resetSlideshowTimer();
    });
});
