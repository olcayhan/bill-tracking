import React, { useRef, useState } from "react";
import { validUser } from "../axios";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
    const navigate = useNavigate()
    const studentRef = useRef("");
    const studentPassRef = useRef("");
    const [isVisible, setVisible] = useState(false);


    return (
        <form className="sign-in-htm" onSubmit={(e) => {
            e.preventDefault()
            validUser({ email: studentRef.current.value, password: studentPassRef.current.value })
                .then((res) => {
                    toast.success("Giriş Başarılı")
                    navigate(`/student/${res.data.student._id}`)
                })
                .catch((err) => { toast.error(err.response.data.message) })
        }}>
            <div className="group">
                <label htmlFor="user" className="label">Öğrenci Mail</label>
                <input id="user" type="email" className="input" ref={studentRef} required />
            </div>
            <div className="group">
                <label htmlFor="userpass" className="label">Şifre</label>
                <input id="userpass" type={!isVisible ? "password" : "text"} className="input" ref={studentPassRef} required />
                <span onClick={() => { setVisible(!isVisible) }} className="hideButton">{isVisible ? <BsEyeFill /> : <BsEyeSlashFill />}</span>
            </div>
            <div className="group">
                <input type="submit" className="button" value="Giriş Yap" />
            </div>
            <div className="hr"></div>
        </form>
    )
}
