let customers = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0901234567', email: 'a@gmail.com', totalOrders: 3 },
  { id: 2, name: 'Trần Thị B', phone: '0912345678', email: 'b@gmail.com', totalOrders: 2 }
];

exports.getAllCustomers = (req, res) => {
  res.json(customers);
};

exports.getCustomerById = (req, res) => {
  const customer = customers.find(c => c.id == req.params.id);
  if (!customer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
  res.json(customer);
};

exports.createCustomer = (req, res) => {
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) return res.status(400).json({ message: 'Thiếu thông tin' });
  const newCustomer = {
    id: customers.length ? customers[customers.length-1].id + 1 : 1,
    name, phone, email, totalOrders: 0
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};

exports.updateCustomer = (req, res) => {
  const customer = customers.find(c => c.id == req.params.id);
  if (!customer) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
  const { name, phone, email } = req.body;
  if (name) customer.name = name;
  if (phone) customer.phone = phone;
  if (email) customer.email = email;
  res.json(customer);
};

exports.deleteCustomer = (req, res) => {
  const idx = customers.findIndex(c => c.id == req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Không tìm thấy khách hàng' });
  customers.splice(idx, 1);
  res.json({ message: 'Đã xóa khách hàng' });
}; 