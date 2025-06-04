import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { SnackbarProvider } from "notistack";
import QuizModal from "./components/MiniGame1";
import ResultModal from "./components/ResultModal";
import CheckUserModal from "./components/CheckUserModal";
import Swal from "sweetalert2";
import MiniGame2 from "./components/MiniGame2";
import RulesGame from "./components/modal/rulesGame";
import { checkTokenUser } from "./services/api_service";

const snackbarStyle = {
  success: { backgroundColor: "#4caf50" },
  error: { backgroundColor: "#f44336" },
  warning: { backgroundColor: "#ff9800" },
  info: { backgroundColor: "#FC8F00" },
};

function App() {
  const [showCheckUser, setShowCheckUser] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [showRuleGame, setShowRuleGame] = useState(false);

  const [quizScore, setQuizScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [userData, setUserData] = useState(null);
  const [hasCompletedQuiz1, setHasCompletedQuiz1] = useState(false);
  const [hasCompletedQuiz2] = useState(false);
  const [showWordGuess, setShowWordGuess] = useState(false);
  const [currentGameType, setCurrentGameType] = useState(null);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      const resetToken = localStorage.getItem("resetToken");
      const name = localStorage.getItem("name");

      if (token && username) {
        let checkToken = await checkTokenUser(token);
        if (checkToken === 502 || checkToken === 404) {
          console.log("Token không hợp lệ hoặc lỗi server");
          localStorage.removeItem("token");
          setShowCheckUser(true);
          return;
        }

        let userData = {
          username,
          token,
          name,
          resetToken,
        };
        setUserData(userData);
        setShowWelcome(true);
      }
    };

    init();
  }, []);

  const handlePlayNow = () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const name = localStorage.getItem("name");
    const resetToken = localStorage.getItem("resetToken");

    if (token && username) {
      let userData = {
        username,
        token,
        name,
        resetToken,
      };
      setUserData(userData);
      setShowWelcome(true);
    } else {
      setShowCheckUser(true);
    }
  };

  const handleShowRuleGame = () => {
    setShowRuleGame(true);
  };
  const handleUserVerified = (userData) => {
    setUserData(userData);
    setShowCheckUser(false);

    if (hasCompletedQuiz1 && hasCompletedQuiz2) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn đã tham gia tất cả mini game, vui lòng quay lại khi có cập nhật mới!",
        icon: "info",
        confirmButtonColor: "#FC8F00",
      });
      return;
    }

    setShowWelcome(true);
  };

  const handleLogout = () => {
    const completedUsers = JSON.parse(
      localStorage.getItem("completed_users") || "[]"
    );
    if (userData && !completedUsers.includes(userData.username)) {
      completedUsers.push(userData.username);
      localStorage.setItem("completed_users", JSON.stringify(completedUsers));
    }

    setShowResult(false);
    setShowWelcome(false);
    setShowQuiz(false);
    setShowWordGuess(false);
    setQuizScore(0);
    setUserData(null);
    setShowCheckUser(false);
    setCurrentGameType(null);
  };

  const handleQuiz1Complete = (total, score) => {
    setTotalQuestions(total);
    setQuizScore(score);
    setShowQuiz(false);
    setCurrentGameType("quiz");
    setShowResult(true);
    setHasCompletedQuiz1(true);
  };

  const handleQuiz2Complete = (total, score) => {
    setTotalQuestions(total);
    setQuizScore(score);
    setShowWordGuess(false);
    setCurrentGameType("wordguess");
    setShowResult(true);
  };
  useEffect(() => {
    const isAnyModalOpen =
      showCheckUser || showWelcome || showQuiz || showResult || showWordGuess;
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCheckUser, showWelcome, showQuiz, showResult, showWordGuess]);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      classes={{
        variantSuccess: snackbarStyle.success,
        variantError: snackbarStyle.error,
        variantWarning: snackbarStyle.warning,
        variantInfo: snackbarStyle.info,
      }}
    >
      <div className="app">
        <Home
          onPlayNow={handlePlayNow}
          onShowRuleGame={handleShowRuleGame}
          userData={userData}
          hasCompletedQuiz1={hasCompletedQuiz1}
          hasCompletedQuiz2={hasCompletedQuiz2}
          onStartQuiz={handleQuiz1Complete}
          onStartWordGuess={handleQuiz2Complete}
        />

        <CheckUserModal
          isOpen={showCheckUser}
          onClose={() => setShowCheckUser(false)}
          onSuccess={handleUserVerified}
        />

        <QuizModal
          isOpen={showQuiz}
          onClose={() => {
            setShowQuiz(false);
            setShowWelcome(true);
          }}
          userData={userData}
          onComplete={handleQuiz1Complete}
        />

        <ResultModal
          isOpen={showResult}
          score={quizScore}
          totalQuestions={totalQuestions}
          gameType={currentGameType}
          onLogout={handleLogout}
        />

        <RulesGame
          isOpen={showRuleGame}
          onClose={() => setShowRuleGame(false)}
        />

        <MiniGame2
          isOpen={showWordGuess}
          onClose={() => {
            setShowWordGuess(false);
            setShowWelcome(true);
          }}
          userData={userData}
          onComplete={handleQuiz2Complete}
        />
      </div>
    </SnackbarProvider>
  );
}

export default App;
