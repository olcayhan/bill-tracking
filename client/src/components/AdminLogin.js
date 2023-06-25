import React, { useRef, useState } from "react";
import { validAdmin } from "../axios";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import { useSignIn } from "react-auth-kit";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
    const adminRef = useRef("");
    const adminPassRef = useRef("");
    const [isVisible, setVisible] = useState(false);
    const signIn = useSignIn()

    return (
        <form className="sign-up-htm"
            onSubmit={(e) => {
                e.preventDefault()
                validAdmin({ email: adminRef.current.value, password: adminPassRef.current.value })
                    .then((req, res) => {
                        localStorage.setItem("adminID", req.data.admin._id)
                        signIn({
                            token: req.data.token,
                            expiresIn: 3600,
                            tokenType: "Bearer",
                            authState: { email: adminRef.current.value }
                        })
                        toast.success("Giriş Başarılı")
                        window.location.pathname = "/admin"
                    })
                    .catch((err) => toast.error(err?.response.data.message))
            }}>
            <div className="group">
                <label htmlFor="admin" className="label">Yönetici Mail</label>
                <input id="admin" type="email" className="input" ref={adminRef} required />
            </div>
            <div className="group">
                <label htmlFor="adminpass" className="label">Şifre</label>
                <input id="adminpass" type={!isVisible ? "password" : "text"} className="input" ref={adminPassRef} required />
                <span onClick={() => { setVisible(!isVisible) }} className="hideButton">{isVisible ? <BsEyeFill /> : <BsEyeSlashFill />}</span>

            </div>
            <div className="group">
                <input type="submit" className="button" value="Giriş Yap" />
            </div>
            <div className="hr"></div>
        </form>
    )
}
