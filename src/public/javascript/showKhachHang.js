const btnSearch = document.getElementById('btnSearch');
// Giữ nguyên tham chiếu đến Element, không nên ghi đè
const searchInput = document.getElementById('searchInput'); 
const cardBody = document.querySelector('.card-body');

btnSearch.addEventListener('click', function(event) {
    // Lấy giá trị tại thời điểm click và loại bỏ khoảng trắng thừa
    const searchTerm = searchInput.value.trim();
    
    console.log('Đang tìm kiếm: ', searchTerm);

    if (!searchTerm) {
        alert('Vui lòng nhập tên khách hàng để tìm kiếm');
        return; 
    }

    // Hiệu ứng chờ (optional)
    cardBody.innerHTML = '<div class="text-center">Đang tìm kiếm...</div>';

    fetch(`/form/search?name=${encodeURIComponent(searchTerm)}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if (data.khachHang) {
                const kh = data.khachHang;
                
                // Định dạng lại ngày sinh nếu có
                const dob = kh.dateOfBirth ? new Date(kh.dateOfBirth).toLocaleDateString('vi-VN') : 'N/A';

                // Render HTML (Chỉ một lần, không lặp lại)
                cardBody.innerHTML = `
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Mã khách hàng</div>
                        <div class="col-sm-8 text-primary">${kh.customerId}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Họ và tên</div>
                        <div class="col-sm-8">${kh.Ho || ''} ${kh.Ten || ''}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Email</div>
                        <div class="col-sm-8">${kh.email || 'N/A'}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Số điện thoại</div>
                        <div class="col-sm-8">${kh.sdt || 'N/A'}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Ngày sinh</div>
                        <div class="col-sm-8">${dob}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Giới tính</div>
                        <div class="col-sm-8">${kh.gender || 'N/A'}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Tỉnh/Thành</div>
                        <div class="col-sm-8">${kh.tinh_tpho || 'N/A'}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Quận/Huyện</div>
                        <div class="col-sm-8">${kh.phuong_xa || 'N/A'}</div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4 font-weight-bold">Phường/Xã</div>
                        <div class="col-sm-8">${kh.thon_xom || 'N/A'}</div>
                    </div>`;
            } else {
                cardBody.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                        Không tìm thấy thông tin khách hàng "${searchTerm}".
                    </div>`;
            }
        })
        .catch(error => {
            console.error('Lỗi khi tìm kiếm khách hàng:', error);
            cardBody.innerHTML = `<div class="alert alert-danger">Đã xảy ra lỗi khi kết nối dữ liệu.</div>`;
        });
});