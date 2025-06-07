import bg from "../assets/images/bg.webp";
import logo from "../assets/images/logo.webp";
import minigame from "../assets/images/minigame.webp";
import CompoundGameHistoryModal from "../components/CompoundGameHistoryModal";
import CompoundMiniGame1 from "../components/CompoundMiniGame1";
import CompoundMiniGame2 from "../components/CompoundMiniGame2";
import { ButtonIcon } from "../utils/svg";

const Home = ({
  onPlayNow,
  onShowRuleGame,
  userData,
  hasCompletedQuiz1,
  hasCompletedQuiz2,
  handleQuiz1Complete,
  handleQuiz2Complete,
}) => {
  return (
    <div
      className="md:w-[500px] mx-auto flex flex-col relative overflow-y-auto overflow-x-hidden"
      style={{
        background: `url(${bg}) center/cover no-repeat`,
        WebkitOverflowScrolling: "touch",
        minHeight: "100dvh", // Dynamic viewport height for better mobile support
      }}
    >
      <div className="flex flex-col items-center pb-8">
        <a
          className="max-w-[300px] mt-8 flex"
          href="https://f8beta2.com/"
          alt="Truy cập trang chủ F8BET"
          rel="dofollow"
        >
          <img
            src={logo}
            alt="F8BET nhà cái uy tín"
            className="w-full h-auto"
          />
        </a>

        <img
          src={minigame}
          alt="F8BET Minigame - Đuổi Hình Đoán Chữ, Trò Chơi Giải Đố Hấp Dẫn"
          className="w-4/5 mt-6"
        />
      </div>

      <div className="flex flex-col gap-4 items-center mt-5 pb-8">
        {userData === null && (
          <button
            className="w-[282px] h-[53px] mt-1 text-lg scale-95 hover:scale-100 transform transition-all duration-300 cursor-pointer"
            style={{
              borderRadius: "27.138px",
              border: "0.822px solid #FFF",
              background: "linear-gradient(0deg, #2C70DE 0%, #00B2FF 100%)",
              boxShadow: "0px 2.638px 2.638px 0px #08F",
            }}
            onClick={onPlayNow}
          >
            <span className="text-white font-bold uppercase">BẮT ĐẦU</span>
          </button>
        )}

        {userData !== null && (
          <>
            <CompoundMiniGame1
              completed={hasCompletedQuiz1}
              userData={userData}
              onComplete={handleQuiz1Complete}
            />

            <CompoundMiniGame2
              completed={hasCompletedQuiz2}
              userData={userData}
              onComplete={handleQuiz2Complete}
            />
          </>
        )}

        <button
          onClick={onShowRuleGame}
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
            Thể lệ trò chơi
            <ButtonIcon />
          </span>
        </button>

        {userData !== null && <CompoundGameHistoryModal userData={userData} />}
      </div>
    </div>
  );
};

export default Home;
