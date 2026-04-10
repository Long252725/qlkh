const provinceSelect = document.getElementById('province');
const districtSelect = document.getElementById('district');
const wardSelect = document.getElementById('ward');

fetch('https://provinces.open-api.vn/api/v2/p/?depth=2')
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
      console.log(p)
      provinceSelect.innerHTML += `<option value="${p.code}">${p.name}</option>`;
    });
  });


provinceSelect.addEventListener('change', (e) => {
  const pCode = e.target.value;
  districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
  wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
  if (pCode) {
    console.log("pCode", pCode)
    fetch(`https://provinces.open-api.vn/api/v2/p/${pCode}?depth=2`)
      .then(res => res.json())
      .then(data => {
        data.wards.forEach(d => {
          districtSelect.innerHTML += `<option value="${d.code}">${d.name}</option>`;
        });
      });
  }
});

districtSelect.addEventListener('change', (e) => {
  const dCode = e.target.value;
  wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
  if (dCode) {
    console.log("dCode", dCode)
    fetch(`https://provinces.open-api.vn/api/v2/w/${dCode}/to-legacies/`)
      .then(res => res.json())
      .then(data => {
        data.forEach(w => {
          wardSelect.innerHTML += `<option value="${w.code}">${w.name}</option>`;
        });
      });
  }
});

wardSelect.addEventListener('change', (e) => {
  const wCode = e.target.value;
  if (wCode) {
    const wName = wardSelect.options[wardSelect.selectedIndex].text;
  }
});

// Thay thế đoạn code lấy Name cũ của bạn bằng cách này để chính xác hơn
const getSelectedText = (selectEl) => {
    return selectEl.selectedIndex > 0 ? selectEl.options[selectEl.selectedIndex].text : null;
};

const ho = document.getElementById('ho');
const ten = document.getElementById('ten');
const email = document.getElementById('email');
const sdt = document.getElementById('sdt');
const dateOfBirth = document.getElementById('dateOfBirth');
const gender = document.getElementById('gender');
const queQuan = document.getElementById('queQuan');
const btnSubmit = document.getElementById('btnSubmit');
const btnUpdate = document.getElementById('btnUpdate');
const boxShow = document.getElementById('box-show');
const btnList = document.getElementById('btnList');
if(btnList) {
  btnList.addEventListener('click', () => {
    window.location.href = '/list';
});
}


var dateOfBirth2 = dateOfBirth.value;
var selectedProvinceName = '';
var selectedDistrictName = '';
var selectedWardName = '';
dateOfBirth.addEventListener('change', function() {
    dateOfBirth2 = this.value;
});
provinceSelect.addEventListener('change', function() {
    const selectedProvinceId = this.value;
    selectedProvinceName = this.options[this.selectedIndex].text;
});
districtSelect.addEventListener('change', function() {
    const selectedProvinceId = this.value;
    selectedDistrictName = this.options[this.selectedIndex].text;
});
wardSelect.addEventListener('change', function() {
    const selectedProvinceId = this.value;
    selectedWardName = this.options[this.selectedIndex].text;
});

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Hàm kiểm tra SDT đúng định dạng Việt Nam: bắt đầu bằng 0 và dài 10 chữ số
function isValidPhone(phone) {
    const phoneRegex = /^0[0-9]{9}$/;
    return phoneRegex.test(phone);
}

// Hàm validation form
function validateForm() {
    if (!ho.value.trim()) {
        alert('Vui lòng nhập Họ');
        ho.focus();
        return false;
    }
    if (!ten.value.trim()) {
        alert('Vui lòng nhập Tên');
        ten.focus();
        return false;
    }
    if (!email.value.trim()) {
        alert('Vui lòng nhập Email');
        email.focus();
        return false;
    }
    if (!isValidEmail(email.value.trim())) {
        alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email');
        email.focus();
        return false;
    }
    if (!sdt.value.trim()) {
        alert('Vui lòng nhập Số điện thoại');
        sdt.focus();
        return false;
    }
    if (!isValidPhone(sdt.value.trim())) {
        alert('Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số và bắt đầu bằng 0');
        sdt.focus();
        return false;
    }
    return true;
}

if (btnSubmit) {
  btnSubmit.addEventListener('click', () => {

    if (!validateForm()) {
        return;
    }
    console.log(dateOfBirth2)

    var customerId = "KH" + Date.now();
    if (boxShow) {
        console.log('Element btn-show tồn tại');
    boxShow.innerHTML = `
        <div class="user-item">
            <button class="btn-show" data-id="${customerId}" id="btnShow">Show ID</button>
        </div>
    `;
    let btnShow = document.getElementById('btnShow');
    btnShow.addEventListener('click', () => {
        window.location.href = `/form/show/${customerId}`;
    });
} else {
    console.warn('Element btn-show không tồn tại');
}

  const data = {
    Ho: ho.value,
    Ten: ten.value,
    HoTen: ho.value + ' ' + ten.value,
    email: email.value,
    sdt: sdt.value,
    dateOfBirth: dateOfBirth2,
    gender: gender.value,
    tinh_tpho: selectedProvinceName,
    phuong_xa: selectedDistrictName,
    thon_xom: selectedWardName,
    customerId: customerId,
    dateDisplay: new Date(dateOfBirth2).toLocaleDateString('vi-VN')

  };
    fetch('/form/khach-hang', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    
    console.log('Success:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });

});
}
if (btnUpdate) {
    btnUpdate.addEventListener('click', () => {
        const customerId = document.getElementById('customerId').value;

        // Lấy thông tin địa chỉ (chỉ lấy nếu người dùng có chọn lại)
        const pName = provinceSelect.selectedIndex > 0 ? provinceSelect.options[provinceSelect.selectedIndex].text : null;
        const dName = districtSelect.selectedIndex > 0 ? districtSelect.options[districtSelect.selectedIndex].text : null;
        const wName = wardSelect.selectedIndex > 0 ? wardSelect.options[wardSelect.selectedIndex].text : null;

        // Khởi tạo đối tượng data với các trường cơ bản luôn thay đổi
        const data = {
            Ho: ho.value,
            Ten: ten.value,
            HoTen: ho.value + ' ' + ten.value,
            email: email.value,
            sdt: sdt.value,
            gender: gender.value,
            customerId: customerId

        };

        // --- LOGIC KIỂM TRA NGÀY SINH ---
        // Nếu ô input date có giá trị (người dùng chọn mới hoặc giữ nguyên giá trị hợp lệ)
        if (dateOfBirth.value) {
            data.dateOfBirth = dateOfBirth.value;
            data.dateDisplay = new Date(dateOfBirth.value).toLocaleDateString('vi-VN')
        }
        // -------------------------------

        // Kiểm tra và thêm địa chỉ nếu có thay đổi
        if (pName) data.tinh_tpho = pName;
        if (dName) data.phuong_xa = dName;
        if (wName) data.thon_xom = wName;

        console.log('Dữ liệu gửi đi:', data);

        fetch('/form/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(response => {
            console.log('Update Success:', response);
            window.location.href = `/list`;
        })
        .catch(error => console.error('Error:', error));
    });
}




