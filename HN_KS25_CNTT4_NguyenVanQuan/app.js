let employees = [
  {
    employeeCode: "EMP-001",
    fullName: "Ngô Thanh Tùng",
    department: "Phòng Kỹ Thuật",
    age: 28,
    experienceYears: 5,
  },
  {
    employeeCode: "EMP-002",
    fullName: "Hồ Thị Thu",
    department: "Phòng Nhân Sự",
    age: 35,
    experienceYears: 10,
  },
  {
    employeeCode: "EMP-003",
    fullName: "Mai Quốc Việt",
    department: "Phòng Kỹ Thuật",
    age: 24,
    experienceYears: 1,
  },
];

function showLines(lines) {
  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i]);
  }
  alert(lines.join("\n"));
}

function showMessage(message) {
  showLines([message]);
}

function normalizeText(rawText) {
  if (!rawText) {
    return "";
  }
  let words = rawText.trim().split(" ");
  let formattedWords = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {
      let word = words[i].toLowerCase();
      let capitalized = word.charAt(0).toUpperCase() + word.slice(1);
      formattedWords.push(capitalized);
    }
  }
  return formattedWords.join(" ");
}

function inputNonEmptyString(message) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmed = input.trim();
    if (trimmed.length > 0) {
      return normalizeText(trimmed);
    }
    showMessage("Lỗi: Dữ liệu nhập không được để trống. Vui lòng nhập lại!");
  }
}

function findEmployeeIndex(code) {
  if (!code) {
    return -1;
  }
  let searchCode = code.trim().toUpperCase();
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].employeeCode.toUpperCase() === searchCode) {
      return i;
    }
  }
  return -1;
}

function validateEmployeeCode(code) {
  if (!code || code.trim() === "") {
    return "Chưa nhập mã nhân viên";
  }
  let trimmedCode = code.trim();
  if (trimmedCode.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (!trimmedCode.startsWith("EMP-")) {
    return 'Sai tiền tố "EMP-"';
  }
  if (trimmedCode.includes(" ")) {
    return "Chứa khoảng trắng";
  }
  if (findEmployeeIndex(trimmedCode) !== -1) {
    return "Mã nhân viên đã tồn tại";
  }
  return "";
}

function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmed = input.trim();
    if (trimmed !== "") {
      let num = Number(trimmed);
      if (Number.isInteger(num) && num >= min && num <= max) {
        return num;
      }
    }
    showMessage(
      `Lỗi: Vui lòng nhập một số nguyên hợp lệ trong khoảng từ ${min} đến ${max}!`,
    );
  }
}

function displayEmployees(list) {
  if (!list || list.length === 0) {
    showMessage("Danh sách nhân viên trống");
    return;
  }

  let lines = [];
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    lines.push(
      `${i + 1}. ${item.employeeCode} - ${item.fullName} - ${item.department}`,
    );
    lines.push(
      `   Tuổi: ${item.age} | Số năm kinh nghiệm: ${item.experienceYears}`,
    );
  }
  lines.push(`Tổng: ${list.length} nhân viên`);

  showLines(lines);
}

function displayAllEmployees() {
  console.log("=====DANH SÁCH NHÂN VIÊN=====");
  displayEmployees(employees);
}

function addNewEmployee() {
  console.log("=====THÊM NHÂN VIÊN MỚI=====");

  let rawCode = prompt("Nhập mã nhân viên mới (ví dụ EMP-004):");
  if (rawCode === null) {
    showMessage("Hủy thao tác thêm nhân viên.");
    return;
  }

  let normalizedCode = rawCode.trim().toUpperCase();
  let validationError = validateEmployeeCode(normalizedCode);
  if (validationError !== "") {
    showMessage(`Lỗi: ${validationError}`);
    return;
  }

  let fullName = inputNonEmptyString("Nhập họ tên nhân viên:");
  if (fullName === null) {
    showMessage("Hủy thao tác thêm nhân viên.");
    return;
  }

  let department = inputNonEmptyString("Nhập phòng ban:");
  if (department === null) {
    showMessage("Hủy thao tác thêm nhân viên.");
    return;
  }

  let age = inputIntegerInRange("Nhập tuổi (từ 18 đến 60):", 18, 60);
  if (age === null) {
    showMessage("Hủy thao tác thêm nhân viên.");
    return;
  }

  let experienceYears = inputIntegerInRange(
    "Nhập số năm kinh nghiệm (từ 0 đến 40):",
    0,
    40,
  );
  if (experienceYears === null) {
    showMessage("Hủy thao tác thêm nhân viên.");
    return;
  }

  let newEmployee = {
    employeeCode: normalizedCode,
    fullName: fullName,
    department: department,
    age: age,
    experienceYears: experienceYears,
  };

  employees.push(newEmployee);

  showLines([
    "THÊM NHÂN VIÊN THÀNH CÔNG! THÔNG TIN CHI TIẾT:",
    `Mã nhân viên       : ${newEmployee.employeeCode}`,
    `Họ tên             : ${newEmployee.fullName}`,
    `Phòng ban          : ${newEmployee.department}`,
    `Tuổi               : ${newEmployee.age}`,
    `Số năm kinh nghiệm : ${newEmployee.experienceYears}`,
  ]);
}

function updateEmployee() {
  console.log("=====CẬP NHẬT THÔNG TIN NHÂN VIÊN======");

  let rawCode = prompt("Nhập mã nhân viên cần cập nhật:");
  if (rawCode === null) {
    showMessage("Đã hủy thao tác cập nhật.");
    return;
  }

  let code = rawCode.trim().toUpperCase();
  let index = findEmployeeIndex(code);

  if (index === -1) {
    showMessage(`Không tìm thấy nhân viên có mã ${code}`);
    return;
  }

  let targetEmployee = employees[index];

  let newAge = inputIntegerInRange(
    `[${targetEmployee.employeeCode}] Nhập tuổi mới (18 - 60):`,
    18,
    60,
  );
  if (newAge === null) {
    showMessage("Đã hủy cập nhật");
    return;
  }

  let newExperienceYears = inputIntegerInRange(
    `[${targetEmployee.employeeCode}] Nhập số năm kinh nghiệm mới (0 - 40):`,
    0,
    40,
  );
  if (newExperienceYears === null) {
    showMessage("Đã hủy cập nhật");
    return;
  }

  targetEmployee.age = newAge;
  targetEmployee.experienceYears = newExperienceYears;

  showLines([
    `Mã nhân viên       : ${targetEmployee.employeeCode}`,
    `Tuổi mới           : ${targetEmployee.age}`,
    `Kinh nghiệm mới    : ${targetEmployee.experienceYears}`,
    "Kết quả            : Cập nhật thành công",
  ]);
}

function deleteEmployee() {
  console.log("=====XÓA NHÂN VIÊN=====");

  let rawCode = prompt("Nhập mã nhân viên cần xóa:");
  if (rawCode === null) {
    showMessage(`Đã hủy thao tác xóa, còn ${employees.length} nhân viên`);
    return;
  }

  let code = rawCode.trim().toUpperCase();
  let index = findEmployeeIndex(code);

  if (index === -1) {
    showMessage(`Không tìm thấy nhân viên có mã ${code}`);
    return;
  }

  let confirmChoice = prompt(
    `Bạn có chắc chắn muốn xóa nhân viên ${code}? (Nhập Y để xác nhận):`,
  );

  if (confirmChoice !== null && confirmChoice.trim().toLowerCase() === "y") {
    employees.splice(index, 1);
    showMessage(`Xóa thành công, còn ${employees.length} nhân viên`);
  } else {
    showMessage(`Đã hủy thao tác xóa, còn ${employees.length} nhân viên`);
  }
}

function searchEmployeesByDepartment() {
  console.log("=====TÌM KIẾM NHÂN VIÊN THEO PHÒNG BAN======");
  let keywordInput = prompt("Nhập từ khóa phòng ban cần tìm:");
  if (keywordInput === null || keywordInput.trim() === "") {
    showMessage("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  let keyword = keywordInput.trim().toLowerCase();
  let searchResults = [];

  for (let i = 0; i < employees.length; i++) {
    if (employees[i].department.toLowerCase().includes(keyword)) {
      searchResults.push(employees[i]);
    }
  }

  if (searchResults.length === 0) {
    showMessage("Không tìm thấy nhân viên phù hợp");
  } else {
    displayEmployees(searchResults);
  }
}

function runMenu() {
  let choice;

  do {
    let menuPrompt = `===========================================
     HỆ THỐNG QUẢN LÝ NHÂN VIÊN CÔNG TY SKYTECH
===========================================
1. Hiển thị danh sách nhân viên
2. Thêm nhân viên mới
3. Cập nhật thông tin nhân viên
4. Xóa nhân viên
5. Tìm kiếm nhân viên theo phòng ban
0. Thoát chương trình
===========================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`;

    let choiceInput = prompt(menuPrompt);

    if (choiceInput === null) {
      showMessage("Lựa chọn không hợp lệ! Vui lòng chọn một số từ 0 đến 5.");
      choice = -1;
      continue;
    }

    let trimmedChoice = choiceInput.trim();

    if (
      trimmedChoice === "" ||
      isNaN(trimmedChoice) ||
      Number(trimmedChoice) < 0 ||
      Number(trimmedChoice) > 5 ||
      !Number.isInteger(Number(trimmedChoice))
    ) {
      showMessage("Lựa chọn không hợp lệ! Vui lòng chọn một số từ 0 đến 5.");
      choice = -1;
      continue;
    }

    choice = Number(trimmedChoice);

    switch (choice) {
      case 1:
        displayAllEmployees();
        break;
      case 2:
        addNewEmployee();
        break;
      case 3:
        updateEmployee();
        break;
      case 4:
        deleteEmployee();
        break;
      case 5:
        searchEmployeesByDepartment();
        break;
      case 0:
        showMessage(
          "Cảm ơn bạn đã sử dụng hệ thống Quản lý Nhân viên SkyTech. Tạm biệt!",
        );
        break;
      default:
        showMessage("Lựa chọn không hợp lệ! Vui lòng chọn một số từ 0 đến 5.");
        break;
    }
  } while (choice !== 0);
}

runMenu();
