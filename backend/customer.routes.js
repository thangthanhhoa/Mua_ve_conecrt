const express = require('express');
const router = express.Router();
const customerController = require('./customer.controller');

// Lấy danh sách khách hàng
router.get('/', customerController.getAllCustomers);
// Lấy chi tiết khách hàng
router.get('/:id', customerController.getCustomerById);
// Thêm khách hàng mới
router.post('/', customerController.createCustomer);
// Cập nhật thông tin khách hàng
router.put('/:id', customerController.updateCustomer);
// Xóa khách hàng
router.delete('/:id', customerController.deleteCustomer);

module.exports = router; 