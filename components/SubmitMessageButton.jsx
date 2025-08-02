import { MessageCircleDashed } from "lucide-react";
import { useFormStatus } from "react-dom";

function SubmitMessageButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
      disabled={pending}
      type="submit"
    >
      <MessageCircleDashed className="fas fa-paper-plane mr-2"></MessageCircleDashed>{" "}
      {pending ? "sending..." : "send message"}
    </button>
  );
}

export default SubmitMessageButton;
