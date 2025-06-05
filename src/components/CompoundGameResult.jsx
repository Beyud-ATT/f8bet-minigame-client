import { ModalProvider } from "./CompondModal";
import ModalHeader from "../assets/images/modal-header.png";
import Fail from "../assets/images/fail.webp";
import Pass from "../assets/images/pass.webp";
import { forwardRef, useImperativeHandle, useRef } from "react";

function Trigger() {
  return (
    <ModalProvider.Trigger>
      <button
        id="compoundGameResult"
        className="bg-[#00A3C6] text-white px-4 py-2 rounded hidden invisible opacity-0"
      >
        Open Modal
      </button>
    </ModalProvider.Trigger>
  );
}

const CompoundGameResult = forwardRef(
  ({ promoCode, msgBack, resetQuiz, submitAnswer }, ref) => {
    const closeButtonRef = useRef();

    useImperativeHandle(ref, () => ({
      open: () => {
        document.getElementById("compoundGameResult").click();
      },
      close: () => {
        closeButtonRef.current?.click();
      },
    }));

    return (
      <ModalProvider>
        <Trigger />
        <ModalProvider.Content
          render={(open, closeModal) =>
            open && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                <div className="relative w-[400px] h-[350px] flex flex-col items-center justify-center z-60 rounded-3xl bg-[#F5F9FF]">
                  <header
                    className="w-[236px] h-[40px] uppercase flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2"
                    style={{
                      backgroundImage: `url(${ModalHeader})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <span className="text-white font-bold">
                      kết quả mini game
                    </span>
                  </header>

                  <h2 className="mx-auto text-lg font-bold text-center text-[#0667FF] mb-3 mt-10 uppercase">
                    bạn đã hoàn thành bài kiểm tra
                  </h2>

                  <img
                    src={promoCode !== null ? Pass : Fail}
                    alt="image"
                    className={`${
                      promoCode !== null ? "w-[200px]" : "w-[126px]"
                    }`}
                  />

                  <p className="text-[#FF9300] font-bold uppercase mt-1">
                    số câu trả lời đúng: {submitAnswer?.correctAnswers}/
                    {submitAnswer?.totalQuestions}
                  </p>

                  {promoCode && (
                    <div>
                      <p className="text-[#106C3B] text-sm font-medium uppercase mt-1">
                        Chúc mừng ! Bạn bạn đã nhận được mã khuyến mãi
                      </p>
                      <div
                        className="cursor-pointer w-fit mx-auto"
                        onClick={() => navigator.clipboard.writeText(promoCode)}
                      >
                        <p className="text-[#106C3B] border border-[#106C3B] text-sm font-semibold text-center bg-green-200 mt-2 px-2 py-1 rounded-lg">
                          {promoCode}
                        </p>
                      </div>
                    </div>
                  )}

                  {msgBack && (
                    <div
                      className="text-[#AD2A32] text-[12px] text-center font-medium uppercase mt-1 py-1 w-[90%]"
                      style={{
                        borderRadius: "8.18px",
                        border: "0.682px solid #AD2A32",
                        background: "#FFE3E2",
                      }}
                    >
                      {msgBack}
                    </div>
                  )}

                  <footer className="flex justify-center my-6">
                    <button
                      ref={closeButtonRef}
                      onClick={() => {
                        closeModal();
                        resetQuiz();
                      }}
                      className="w-[115px] h-[26px] shadow-md transform scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
                      style={{
                        borderRadius: "16.348px",
                        border: "0.495px solid #FFF",
                        background:
                          "linear-gradient(0deg, #2C70DE 0%, #00B2FF 100%)",
                        boxShadow: "0px 1.589px 1.589px 0px #08F",
                      }}
                    >
                      <span className="text-white font-bold">Đóng</span>
                    </button>
                  </footer>
                </div>
              </div>
            )
          }
        />
      </ModalProvider>
    );
  }
);

export default CompoundGameResult;
