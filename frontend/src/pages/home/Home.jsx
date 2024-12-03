import MessageComponent from "../../components/messages/MessageComponent";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageComponent />
    </div>
  );
};

export default Home;
