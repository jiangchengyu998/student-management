// 模拟一个简单的管理员信息
const adminCredentials = {
    username: 'admin',
    password: 'password123'
};

// 处理登录表单提交
function handleLogin(event) {
    event.preventDefault();  // 阻止默认表单提交行为

    // 获取输入的用户名和密码
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 检查用户名和密码是否匹配
    if (username === adminCredentials.username && password === adminCredentials.password) {
        // 保存登录状态
        sessionStorage.setItem('loggedIn', true);
        sessionStorage.setItem("userName", username);
        // 登录成功，重定向到管理系统页面
        window.location.href = 'index.html';
    } else {
        // 显示错误消息
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = '用户名或密码错误，请重试。';
    }

}

