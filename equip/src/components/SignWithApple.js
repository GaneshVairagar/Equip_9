import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInWithApple() {
  function appleLogin() {
    const provider = new OAuthProvider("apple.com"); // Apple provider
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        if (user) {
          const additionalUserInfo = result.additionalUserInfo?.profile || {};
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email || additionalUserInfo.email || "No email",
            firstName: additionalUserInfo.firstName || "User",
            lastName: additionalUserInfo.lastName || "",
            photo: user.photoURL || "",
          });
          toast.success("User logged in successfully!", {
            position: "top-center",
          });
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        console.error("Error during Apple sign-in:", error);
        toast.error("Apple sign-in failed.", {
          position: "top-center",
        });
      });
  }

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={appleLogin}
      >
        <img src={require("../apple.png")} width={"60%"} />
      </div>
    </div>
  );
}

export default SignInWithApple;
