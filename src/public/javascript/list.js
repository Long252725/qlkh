document.addEventListener('DOMContentLoaded', () => {
    const selectAll = document.querySelector('.orderIPxoay-container-main-top-select--checkbox');
    const checkboxes = document.querySelectorAll('.orderIPxoay-container-main-box-select1--checkbox');
    const btnDelete = document.getElementById('btnDeleteSelected');
    const selectedCountSpan = document.getElementById('selectedCount');
    const themBtn = document.getElementById('themBtn');

    if(themBtn) {
        themBtn.addEventListener('click', () => {
        window.location.href = '/form';
    });
    }
    

    // Hàm cập nhật trạng thái nút Xóa
    const updateDeleteButton = () => {
        const checkedCount = document.querySelectorAll('.orderIPxoay-container-main-box-select1--checkbox:checked').length;
        selectedCountSpan.innerText = checkedCount;
        if (checkedCount > 0) {
            btnDelete.classList.remove('hidden');
            btnDelete.classList.add('flex');
        } else {
            btnDelete.classList.remove('flex');
            btnDelete.classList.add('hidden');
        }
    };

    // Sự kiện Chọn tất cả
    selectAll.addEventListener('change', () => {
        console.log(2)
        checkboxes.forEach(cb => cb.checked = selectAll.checked);
        updateDeleteButton();
    });

    // Sự kiện khi tick từng checkbox
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateDeleteButton);
    });

    // Xử lý gọi API xóa
    btnDelete.addEventListener('click', async () => {
        const selectedIds = Array.from(document.querySelectorAll('.orderIPxoay-container-main-box-select1--checkbox:checked'))
                                 .map(cb => cb.value);

        if (confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} khách hàng đã chọn?`)) {
            try {
                const response = await fetch('/list/delete-multiple', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ids: selectedIds })
                });

                const result = await response.json();
                if (result.success) {
                    alert('Đã xóa dữ liệu thành công');
                    window.location.reload(); // Load lại trang để cập nhật danh sách
                } else {
                    alert('Lỗi: ' + result.message);
                }
            } catch (err) {
                console.error('Lỗi khi xóa:', err);
                alert('Không thể kết nối với máy chủ');
            }
        }
    });
});