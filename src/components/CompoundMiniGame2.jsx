import { ModalProvider } from "./CompondModal";
import Swal from "sweetalert2";
import { useModal } from "./CompondModal";
import MiniGame2 from "./MiniGame2";

function Minigame2Trigger({ completed }) {
  const { openModal } = useModal();
  return (
    <ModalProvider.Trigger>
      <button
        onClick={() => {
          if (completed) {
            Swal.fire({
              title: "Thông báo",
              text: "Bạn đã hoàn thành mini game này!",
              icon: "info",
              confirmButtonColor: "#2C70DE",
            });
            return;
          }
          openModal();
        }}
        className={`w-[274px] h-[50px] scale-100 hover:scale-105 transform transition-all duration-300 cursor-pointer ${
          completed ? "opacity-50" : ""
        }`}
        style={{
          borderRadius: "27.138px",
          border: "0.822px solid #FFF",
          background: "linear-gradient(0deg, #2C70DE 0%, #00B2FF 100%)",
          boxShadow: "0px 2.638px 2.638px 0px #08F",
        }}
      >
        <span className="text-white font-bold uppercase">
          ĐUỔI HÌNH BẮT CHỮ
        </span>
        {completed && (
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Đã hoàn thành
          </div>
        )}
      </button>
    </ModalProvider.Trigger>
  );
}

export default function CompoundMiniGame2({ completed, userData, onComplete }) {
  return (
    <ModalProvider>
      <Minigame2Trigger completed={completed} />
      <ModalProvider.Content
        render={(open, closeModal) => (
          <MiniGame2
            isOpen={open}
            onClose={() => {
              closeModal();
            }}
            userData={userData}
            onComplete={onComplete}
          />
        )}
      />
    </ModalProvider>
  );
}
