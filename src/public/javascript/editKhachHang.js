const btnUpdate = document.getElementById('btnUpdate');

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
            customerId: customerId,
            
        };

        // --- LOGIC KIỂM TRA NGÀY SINH ---
        // Nếu ô input date có giá trị (người dùng chọn mới hoặc giữ nguyên giá trị hợp lệ)
        if (dateOfBirth.value) {
            data.dateOfBirth = dateOfBirth.value;
            data.dateDispay = 
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