import { ButtonIcon } from "../utils/svg";
import { ModalProvider } from "./CompondModal";
import GameHistoryModal from "./GameHistoryModal";

export default function CompoundGameHistoryModal({ userData }) {
  return (
    <ModalProvider>
      <ModalProvider.Trigger>
        <button
          className="w-[274px] h-[42px] scale-95 hover:scale-100 transform transition-all duration-300 cursor-pointer px-3.5"
          style={{
            borderRadius: "47.696px",
            border: "0.822px solid #B8D2FF",
            background: "#F5F9FF",
            boxShadow:
              "1.645px 2.467px 3.372px 0px rgba(47, 110, 255, 0.20), 0px 2.588px 7.377px 7.118px rgba(49, 73, 133, 0.02), 0px 0px 5.565px 5.177px rgba(164, 190, 255, 0.25) inset",
          }}
        >
          <span className="text-[#3A5177] font-bold uppercase flex items-center justify-between">
            Lịch sử mini game
            <ButtonIcon />
          </span>
        </button>
      </ModalProvider.Trigger>
      <ModalProvider.Content
        render={(open, closeModal) => (
          <GameHistoryModal
            isOpen={open}
            onClose={closeModal}
            userData={userData}
          />
        )}
      />
    </ModalProvider>
  );
}
