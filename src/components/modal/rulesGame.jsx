import ModalHeader from "../../assets/images/modal-header.png";
import { CloseModalButton } from "../../utils/svg";

const RulesGame = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-70">
      <div className="relative bg-white rounded-2xl p-4 max-w-[425px] shadow-xl text-sm sm:text-base">
        <div
          className="w-[236px] h-[40px] uppercase flex items-center justify-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2"
          style={{
            backgroundImage: `url(${ModalHeader})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="text-white font-bold">thể lệ trò chơi</span>
        </div>

        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={onClose}
        >
          <CloseModalButton />
        </div>

        <h2 className="w-[80%] mx-auto text-lg font-bold text-center text-[#0667FF] mb-3 mt-10">
          CHI TIẾT SỰ KIỆN THAM GIA MINIGAME CÙNG F8BET
        </h2>

        <div className="space-y-3 text-black leading-relaxed">
          <div>
            <strong>📌 Thể lệ tham gia:</strong>
            <ul>
              <li>
                Hệ thống sẽ đưa các câu hỏi và hình ảnh để hội viên trả lời.
              </li>
              <li>Các câu hỏi và hình ảnh sẽ được xáo trộn ngẫu nhiên.</li>
              <li>
                Nhiệm vụ của người chơi là đoán ra đúng đáp án thông qua hình
                ảnh hoặc lựa chọn các đáp án có sẵn.
              </li>
              <li>Mỗi người chỉ được tham gia 1 lần/ngày.</li>
            </ul>
          </div>

          <div>
            <strong>🏆 Cách tính điểm & trúng thưởng:</strong>
            <ul>
              <li>
                Người chơi trả lời đúng và nhanh nhất sẽ nhận code quà tặng hấp
                dẫn.
              </li>
              <li>
                Ưu tiên người trả lời sớm nhất, điểm thưởng cao nhất 1,888,000
                VNĐ .
              </li>
              <li>
                Các hội viên trả lời chậm, hoặc có câu sai sẽ được phần thưởng
                ít hơn.
              </li>
              <li>
                Code sẽ được gửi trong hòm thư nội bộ sau khi hội viên hoàn
                thành.
              </li>
            </ul>
          </div>

          <div>
            <strong>⛔️ Quy định khác:</strong>
            <ul>
              <li>Nghiêm cấm sao chép, dùng tool, spam.</li>
              <li>
                Hệ thống có quyền từ chối trao thưởng nếu phát hiện hành vi gian
                lận.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-6 mb-10">
          <button
            onClick={onClose}
            className="w-[250px] h-[50px] shadow-md transform scale-100 hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{
              borderRadius: "23.983px",
              border: "0.727px solid #FFF",
              background: "linear-gradient(0deg, #2C70DE 0%, #00B2FF 100%)",
              boxShadow: "0px 2.331px 2.331px 0px #08F",
            }}
          >
            <span className="text-white font-bold">ĐÃ HIỂU</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesGame;
