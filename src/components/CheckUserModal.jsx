import { useState } from "react";
import { checkUser } from "../services/api_service";
import BankIcon from "./icons/BankIcon";
import SiginBG from "../assets/images/signin-bg.webp";
import SiginButton from "../assets/images/signin-btn.webp";
import { UserIcon } from "../utils/svg";

const CheckUserModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    bankLastDigits: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.username || !formData.bankLastDigits) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First verify user credentials
      const userVerified = await checkUser(
        formData.username,
        formData.bankLastDigits
      );

      console.log(userVerified);

      if (!userVerified.valid) {
        setError(
          userVerified.text_mess ?? "Thông tin tài khoản không chính xác!"
        );
        return;
      }

      localStorage.setItem("token", userVerified.result?.token);
      localStorage.setItem("resetToken", userVerified.result?.resetToken);
      localStorage.setItem("name", userVerified.result?.name);
      localStorage.setItem("username", userVerified.result?.account);

      onSuccess(formData);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    setFormData({ username: "", bankLastDigits: "" });
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div
        className="relative w-full max-w-[394px] h-[308px] p-6 flex flex-col items-center justify-end "
        style={{
          backgroundImage: `url(${SiginBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-white hover:opacity-80"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex w-[90%] flex-col gap-3">
          <div
            className="flex items-center gap-2 px-2 py-2.5"
            style={{
              borderRadius: "7.464px",
              border: "1.066px solid #62C5FF",
              background: "#FFF",
            }}
          >
            <UserIcon />
            <input
              type="text"
              placeholder="Vui lòng nhập tên tài khoản"
              className="flex-1 bg-transparent outline-none text-[#383838]"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </div>

          <div
            className="flex items-center gap-2 px-2 py-2.5"
            style={{
              borderRadius: "7.464px",
              border: "1.066px solid #62C5FF",
              background: "#FFF",
            }}
          >
            <BankIcon />
            <input
              type="text"
              placeholder="Nhập 4 số cuối STK ngân hàng"
              className="flex-1 bg-transparent outline-none text-[#383838]"
              maxLength="4"
              value={formData.bankLastDigits}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bankLastDigits: e.target.value,
                }))
              }
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-[170px] h-[50px] text-white font-bold scale-100 hover:scale-105 transform transition-all duration-300 cursor-pointer ${
              loading ? "opacity-50" : ""
            }`}
            style={{
              backgroundImage: `url(${SiginButton})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            KIỂM TRA
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckUserModal;
