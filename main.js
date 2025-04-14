let students = [
    {
        name: "Trần Minh Cường",
        mssv: "SV001",
        email: "cuongtm@gmail.com",
        Class: "@HN_ENG_KS24A"
    },
    {
        name: "Lu Nhựt Đình",
        mssv: "SV002",
        email: "dinh@gmail.com",
        Class: "HCM_KS24A"
    },
]

function renderData(studentList) {
    let tbody = document.querySelector("#renderData")
    let dataHtml = ``

    for (let i = 0; i < studentList.length; i++) {
        dataHtml += `
        <tr>
              <td>${studentList[i].name}</td>
              <td>${studentList[i].mssv}</td>
              <td>${studentList[i].email}</td>
              <td>${studentList[i].Class}</td>
              <td>
                <button onclick="loadStudentForm(${i})" type="button" class="btn btn-success">Sửa</button>
                <button onclick="deleteStudent(${i})" type="button" class="btn btn-danger">Xóa</button>
              </td>
            </tr>
        `
    }
    tbody.innerHTML = dataHtml
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function isValidMssv(mssv) {
    let check = students.some(student => student.mssv.includes(mssv))

    if (!mssv) check = true

    return check
}

function addStudent(event) {
    event.preventDefault()

    let form = event.target
    let name = form.name.value, mssv = form.mssv.value, email = form.email.value, Class = form.Class.value
    let notify = form.querySelectorAll(".notify")

    notify[0].classList.remove("notifyError")
    notify[1].classList.remove("notifyError")
    notify[2].classList.remove("notifyError")
    notify[3].classList.remove("notifyError")

    let isMssvCheck = isValidMssv(mssv)

    if (!name || isMssvCheck || !isValidEmail(email) || !Class) {
        if (isMssvCheck)
            notify[1].classList.add("notifyError")
        if (!isValidEmail(email))
            notify[2].classList.add("notifyError")
        if (!name)
            notify[0].classList.add("notifyError")
        if (!Class)
            notify[3].classList.add("notifyError")
        return
    }

    students.push({ name, mssv, email, Class })
    renderData(students)
    form.reset()
}

function deleteStudent(index) {
    if (confirm("Bạn có chắc là muốn xóa sinh viên này không ?")) {
        students.splice(index, 1)
        alert("Đã xóa thành công")
        renderData(students)
    }
}

function loadStudentForm(index) {
    let form = document.querySelector("form")
    let formButton = form.querySelector(".submitPlace")

    formButton.innerHTML = `<button onclick="updateData(${index})" type="button" class="btn btn-secondary">Cập nhật</button>
    `

    form.name.value = students[index].name
    form.mssv.value = students[index].mssv
    form.email.value = students[index].email
    form.Class.value = students[index].Class
}

function updateData(index) {
    let form = document.querySelector("form")
    let name = form.name.value, mssv = form.mssv.value, email = form.email.value, Class = form.Class.value
    let notify = form.querySelectorAll(".notify")

    notify[0].classList.remove("notifyError")
    notify[1].classList.remove("notifyError")
    notify[2].classList.remove("notifyError")
    notify[3].classList.remove("notifyError")

    let isMssvCheck = (mssv !== students[index].mssv) ? isValidMssv(mssv) : false

    if (!name || isMssvCheck || !isValidEmail(email) || !Class) {
        if (isMssvCheck)
            notify[1].classList.add("notifyError")
        if (!isValidEmail(email))
            notify[2].classList.add("notifyError")
        if (!name)
            notify[0].classList.add("notifyError")
        if (!Class)
            notify[3].classList.add("notifyError")
        return
    }

    if (!name || !mssv || !isValidEmail(email) || !Class) {
        if (!name)
            notify[0].classList.add("notifyError")
        if (!mssv)
            notify[1].classList.add("notifyError")
        if (!isValidEmail(email))
            notify[2].classList.add("notifyError")
        if (!Class)
            notify[3].classList.add("notifyError")

        return
    }

    if (!name || !mssv || !isValidEmail(email) || !Class) {
        return
    }

    let formButton = form.querySelector(".submitPlace")

    formButton.innerHTML = `<button type="submit" class="btn btn-primary" id="clickAdd">
              Thêm sinh viên
            </button>
    `

    students.splice(index, 1, { name, mssv, email, Class })
    form.reset()
    renderData(students)
    console.log(students)
    alert("Cập nhật thành công !!!")
}

function searchStudent() {
    let input = document.querySelector("#inputFind").value

    let filterArray = students.filter(student => {
        return student.name.toLowerCase().includes(input.toLowerCase())
    })

    console.log(filterArray)

    if (filterArray.length === 0) {
        renderData(students)
        return
    }

    renderData(filterArray)
}

renderData(students)