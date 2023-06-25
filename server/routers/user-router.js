const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body
        const admin = await User.findOne({ email: email })
        if (!admin) return res.status(400).json({ message: "E-mail ve Şifre Hatalı" })
        if (admin.password !== password) return res.status(400).json({ message: "Yanlış Şifre" })

        const jwtToken = jwt.sign(
            {email: admin.email},
            process.env.ACCESS_TOKEN_SECRET
        )

        return res.status(200).json({ admin, message: "Giriş Başarılı", token:jwtToken })

    } catch (e) {
        return res.send({ e: e, m: "error" });
    }

})

router.post("/add", async (req, res) => {


    try {
        const newAdmin = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
        });

        await newAdmin.save();

        console.log(req.body);

        return res.send({ message: "Yönetici Eklendi", admin: newAdmin });

    } catch (e) {

        return res.send({ e: e });

    }

});

module.exports = router;