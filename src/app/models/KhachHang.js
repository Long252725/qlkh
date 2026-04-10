
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const KhachHang  = new Schema({
  Ho: {type: String, required: true},
  Ten: {type: String, required: true},
  HoTen: {type: String},
  sdt: {type: String, default: 'Null'},
  email: {type: String, default: 'Null'},
  dateOfBirth: {type: Date},
  gender: {type: String},
  tinh_tpho: {type: String, default: 'Null'},
  phuong_xa: {type: String, default: 'Null'},
  thon_xom: {type: String, default: 'Null'},
  dateDisplay: {type: String},
  customerId: {type: String, required: true, unique: true},
  slug: { type: String, slug: 'ten' }
}, {
  timestamps: true
});

module.exports = mongoose.model('KhachHang', KhachHang);