document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  // 默认用户列表（如果本地存储中没有用户）
  const defaultUsers = [{ username: "admin", password: "admin123" }];
  initializeUserData();
  loginForm.addEventListener("submit", function (event) {
    // 阻止表单默认提交行为
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (validateForm(username, password)) {
      if (authenticateUser(username, password)) {
        alert("登录成功！");
        // 保存登录状态
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", username);

        window.location.href = "main.html";
      } else {
        showError("用户名或密码错误，请重试！");
      }
    }
  });

  // 创建错误信息容器
  const createErrorContainer = () => {
    let errorContainer = document.getElementById("error-container");
    if (!errorContainer) {
      errorContainer = document.createElement("div");
      errorContainer.id = "error-container";
      errorContainer.className = "error-container";
      // 将错误容器插入到表单前面
      loginForm.parentNode.insertBefore(errorContainer, loginForm);
    }
    return errorContainer;
  };

  // 显示错误信息
  function showError(message) {
    const errorContainer = createErrorContainer();
    errorContainer.textContent = message;
    errorContainer.style.display = "block";
    // 给输入框添加错误样式
    document.getElementById("username").classList.add("error");
    document.getElementById("password").classList.add("error");
  }

  function validateForm(username, password) {
    if (username === "") {
      showError("请输入用户名");
      return false;
    }
    if (password === "") {
      showError("请输入密码");
      return false;
    }
    return true;
  }

  function initializeUserData() {
    if (!localStorage.getItem("userList")) {
      localStorage.setItem("userList", JSON.stringify(defaultUsers));/*JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串。*/
    }
  }

  // 用户身份验证
  function authenticateUser(username, password) {
    // 从本地存储中获取用户列表
    const userList = JSON.parse(localStorage.getItem("userList"));

    const user = userList.find(
      (user) => user.username === username && user.password === password
    );
    return !!user;//!!是将一个值转换为布尔值
  }

  // 输入时清除错误样式
  document.getElementById("username").addEventListener("input", function () {
    this.classList.remove("error");
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.style.display = "none";
    }
  });

  document.getElementById("password").addEventListener("input", function () {
    this.classList.remove("error");
    const errorContainer = document.getElementById("error-container");
    if (errorContainer) {
      errorContainer.style.display = "none";
    }
  });

  // 添加记住我功能
  const rememberMeCheckbox = document.getElementById("rememberMe");
  if (rememberMeCheckbox) {
    // 如果之前有保存用户名，则自动填充
    const savedUsername = localStorage.getItem("rememberedUsername");
    const savedPassword = localStorage.getItem("rememberedPassword");
    if (savedUsername&&savedPassword) {
      document.getElementById("username").value = savedUsername;
      document.getElementById("password").value = savedPassword
      rememberMeCheckbox.checked = true;
    }
    // 保存或清除记住的用户名
    loginForm.addEventListener("submit", function () {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;
      if (rememberMeCheckbox.checked) {
        localStorage.setItem("rememberedUsername", username);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
      }
    });
  }
});