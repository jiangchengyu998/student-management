// 初始化假数据
const initialStudents = [
    { id: 1, name: "Alice", age: 20, class: "Class A" },
    { id: 2, name: "Bob", age: 22, class: "Class B" },
    { id: 3, name: "Charlie", age: 21, class: "Class A" },
    { id: 4, name: "Charlie", age: 21, class: "Class A" },
    { id: 5, name: "Charlie", age: 21, class: "Class A" },
    { id: 6, name: "Charlie", age: 21, class: "Class A" },
    { id: 7, name: "Charlie", age: 21, class: "Class A" },
    { id: 8, name: "Charlie", age: 21, class: "Class A" },
    { id: 9, name: "Charlie", age: 21, class: "Class A" },
];

const initialClasses = [
    { id: 1, className: "Class A", teacher: "Mr. Smith", studentsCount: 2 },
    { id: 2, className: "Class B", teacher: "Ms. Johnson", studentsCount: 1 },
];

const initialTeachers = [
    { id: 1, name: "Mr. Smith", subject: "Mathematics", class: "Class A" },
    { id: 2, name: "Ms. Johnson", subject: "English", class: "Class B" },
];

const initialAdmins = [
    { id: 1, name: "John Doe", role: "System Administrator", email: "admin1@example.com" },
    { id: 2, name: "Jane Doe", role: "Super Admin", email: "admin2@example.com" },
];

// 加载假数据到数组中
students = [...initialStudents];
classes = [...initialClasses];
teachers = [...initialTeachers];
admins = [...initialAdmins];

// 页面加载时渲染初始数据
document.addEventListener("DOMContentLoaded", () => {
    renderStudents();
    renderClasses();
    renderTeachers();
    renderAdmins();
});

/* 页面切换逻辑 */
function showPage(pageId, event) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const activePage = document.getElementById(pageId);
    activePage.classList.add('active');

    const navItems = document.querySelectorAll('.sidebar ul li');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
}

// 分页的通用函数
function paginate(dataArray, rowsPerPage, page) {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataArray.slice(start, end);
}

function setupPagination(dataArray, rowsPerPage, containerId, renderFunc) {
    const totalPages = Math.ceil(dataArray.length / rowsPerPage);
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('pagination-btn');
        button.addEventListener('click', () => {
            const paginatedData = paginate(dataArray, rowsPerPage, i);
            renderFunc(paginatedData);
        });
        container.appendChild(button);
    }
}

/* 学生管理 */
function showAddStudentForm() {
    document.getElementById('add-student-form').style.display = 'block';
}

function addStudent() {
    const name = document.getElementById('student-name').value;
    const age = document.getElementById('student-age').value;
    const className = document.getElementById('student-class').value;

    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age,
        class: className
    };
    students.push(newStudent);
    renderStudents(paginate(students, 5, 1));
}

// 修改渲染函数为分页
function renderStudents(paginatedStudents = paginate(students, 5, 1)) {
    const tbody = document.getElementById('student-table-body');
    tbody.innerHTML = '';
    paginatedStudents.forEach(student => {
        const row = `<tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.class}</td>
                        <td><button onclick="deleteStudent(${student.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
    setupPagination(students, 5, 'student-pagination', renderStudents);
}

function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    renderStudents(paginate(students, 5, 1));
}

/* 班级管理 */
function showAddClassForm() {
    document.getElementById('add-class-form').style.display = 'block';
}

function addClass() {
    const className = document.getElementById('class-name').value;
    const classTeacher = document.getElementById('class-teacher').value;

    const newClass = {
        id: classes.length + 1,
        className: className,
        teacher: classTeacher,
        studentsCount: 0
    };
    classes.push(newClass);
    renderClasses();
}

function renderClasses() {
    const tbody = document.getElementById('class-table-body');
    tbody.innerHTML = '';
    classes.forEach(cls => {
        const row = `<tr>
                        <td>${cls.id}</td>
                        <td>${cls.className}</td>
                        <td>${cls.teacher}</td>
                        <td>${cls.studentsCount}</td>
                        <td><button onclick="deleteClass(${cls.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

function deleteClass(id) {
    classes = classes.filter(cls => cls.id !== id);
    renderClasses();
}

/* 教师管理 */
function showAddTeacherForm() {
    document.getElementById('add-teacher-form').style.display = 'block';
}

function addTeacher() {
    const name = document.getElementById('teacher-name').value;
    const subject = document.getElementById('teacher-subject').value;
    const className = document.getElementById('teacher-class').value;

    const newTeacher = {
        id: teachers.length + 1,
        name: name,
        subject: subject,
        class: className
    };
    teachers.push(newTeacher);
    renderTeachers();
}

function renderTeachers() {
    const tbody = document.getElementById('teacher-table-body');
    tbody.innerHTML = '';
    teachers.forEach(teacher => {
        const row = `<tr>
                        <td>${teacher.id}</td>
                        <td>${teacher.name}</td>
                        <td>${teacher.subject}</td>
                        <td>${teacher.class}</td>
                        <td><button onclick="deleteTeacher(${teacher.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

function deleteTeacher(id) {
    teachers = teachers.filter(teacher => teacher.id !== id);
    renderTeachers();
}

/* 管理员管理 */
function showAddAdminForm() {
    document.getElementById('add-admin-form').style.display = 'block';
}

function addAdmin() {
    const name = document.getElementById('admin-name').value;
    const role = document.getElementById('admin-role').value;
    const email = document.getElementById('admin-email').value;

    const newAdmin = {
        id: admins.length + 1,
        name: name,
        role: role,
        email: email
    };
    admins.push(newAdmin);
    renderAdmins();
}

function renderAdmins() {
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = '';
    admins.forEach(admin => {
        const row = `<tr>
                        <td>${admin.id}</td>
                        <td>${admin.name}</td>
                        <td>${admin.role}</td>
                        <td>${admin.email}</td>
                        <td><button onclick="deleteAdmin(${admin.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

function deleteAdmin(id) {
    admins = admins.filter(admin => admin.id !== id);
    renderAdmins();
}


const resizer = document.querySelector('.sidebar-resizer');
const sidebar = document.querySelector('.sidebar');

resizer.addEventListener('mousedown', function(e) {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    // 通过鼠标位置来动态调整 sidebar 的宽度
    const newWidth = e.clientX;
    if (newWidth > 150 && newWidth < 400) {  // 限制最小和最大宽度
        sidebar.style.width = newWidth + 'px';
    }
}

function stopResize() {
    // 停止拖动时移除监听
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}


/* 学生搜索功能 */
function searchStudent() {
    const searchValue = document.getElementById('student-search').value.toLowerCase();
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchValue) ||
        student.class.toLowerCase().includes(searchValue)
    );
    renderFilteredStudents(filteredStudents);
}

function renderFilteredStudents(filteredStudents) {
    const tbody = document.getElementById('student-table-body');
    tbody.innerHTML = '';
    filteredStudents.forEach(student => {
        const row = `<tr>
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.class}</td>
                        <td><button onclick="deleteStudent(${student.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

/* 班级搜索功能 */
function searchClass() {
    const searchValue = document.getElementById('class-search').value.toLowerCase();
    const filteredClasses = classes.filter(cls =>
        cls.className.toLowerCase().includes(searchValue) ||
        cls.teacher.toLowerCase().includes(searchValue)
    );
    renderFilteredClasses(filteredClasses);
}

function renderFilteredClasses(filteredClasses) {
    const tbody = document.getElementById('class-table-body');
    tbody.innerHTML = '';
    filteredClasses.forEach(cls => {
        const row = `<tr>
                        <td>${cls.id}</td>
                        <td>${cls.className}</td>
                        <td>${cls.teacher}</td>
                        <td>${cls.studentsCount}</td>
                        <td><button onclick="deleteClass(${cls.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

/* 教师搜索功能 */
function searchTeacher() {
    const searchValue = document.getElementById('teacher-search').value.toLowerCase();
    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchValue) ||
        teacher.subject.toLowerCase().includes(searchValue) ||
        teacher.class.toLowerCase().includes(searchValue)
    );
    renderFilteredTeachers(filteredTeachers);
}

function renderFilteredTeachers(filteredTeachers) {
    const tbody = document.getElementById('teacher-table-body');
    tbody.innerHTML = '';
    filteredTeachers.forEach(teacher => {
        const row = `<tr>
                        <td>${teacher.id}</td>
                        <td>${teacher.name}</td>
                        <td>${teacher.subject}</td>
                        <td>${teacher.class}</td>
                        <td><button onclick="deleteTeacher(${teacher.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}

/* 管理员搜索功能 */
function searchAdmin() {
    const searchValue = document.getElementById('admin-search').value.toLowerCase();
    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchValue) ||
        admin.role.toLowerCase().includes(searchValue) ||
        admin.email.toLowerCase().includes(searchValue)
    );
    renderFilteredAdmins(filteredAdmins);
}

function renderFilteredAdmins(filteredAdmins) {
    const tbody = document.getElementById('admin-table-body');
    tbody.innerHTML = '';
    filteredAdmins.forEach(admin => {
        const row = `<tr>
                        <td>${admin.id}</td>
                        <td>${admin.name}</td>
                        <td>${admin.role}</td>
                        <td>${admin.email}</td>
                        <td><button onclick="deleteAdmin(${admin.id})">Delete</button></td>
                     </tr>`;
        tbody.innerHTML += row;
    });
}
