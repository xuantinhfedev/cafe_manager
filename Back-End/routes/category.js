// Khai báo biến, thư viện sử dụng
const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

// API thêm danh mục
router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let category = req.body;
    var query = "insert into category (name) values(?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({
                message: "Danh mục được thêm thành công."
            });
        } else {
            return res.status(500).json(err);
        }
    });
})

// API lấy danh sách danh mục
router.get('/get', auth.authenticateToken, (req, res) => {

    var query = "select * from category order by id asc";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// API cập nhật tên danh mục
router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res) => {

    let category = req.body;
    var query = "update category set name=? where id=?";
    connection.query(query, [category.name, category.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {    
                return res.status(404).json({
                    message: "ID danh mục không được tìm thấy."
                });
            } else {
                return res.status(200).json({
                    message: "Danh mục được cập nhật thành công."
                });
            }
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;