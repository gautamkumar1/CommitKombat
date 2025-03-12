import React from "react"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Code2Icon, ClockIcon } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function UsernameInput() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData,setUserData] = useState({
    usernames:""
  })
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      if (!userData?.usernames) {
        toast.error("Please provide valid usernames.");
        setIsLoading(false);
        return;
      }

      const usernames = userData.usernames.split(",").map(name => name.trim()); 
      const payload = {
        username: usernames[0] || "", 
        leetcodeUsername: usernames[1] || "" 
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/createScoreAndRoastMsg`,
        payload
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success(`${response.data.roastMsg.roast.roastMessage} \n`);
      } else {
        toast.warning(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); 
    }
};

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-slate-200">Join the CommitKombat Leaderboard</h2>
        <p className="text-gray-300 text-sm">
  <span className="font-medium text-yellow-500">Note:</span> First, enter your GitHub username, followed by your LeetCode username,  
  <span className="font-medium">separated by a comma</span>. <br /> 
  Example: <span className="text-white">gautamkumar1, gautam-kum4r</span> <br />
  <span className="text-red-500">Ensure you follow this format to avoid issues.</span>
</p>

      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Code2Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Your Github and LeetCode usernames"
            className="pl-10 bg-slate-900 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20"
            name="usernames"
            value={userData.usernames}
            onChange={handleChange}
          />
        </div>
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-blue-700/20 transition-all duration-200 hover:shadow-blue-700/40"
        >
          {isLoading ? (
            <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
          ) : (
            "Track My Progress"
          )}
        </Button>
      </form>

      <div className="mt-6 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-amber-300 bg-amber-300/10 p-3 rounded-lg border border-amber-300/20">
          <ClockIcon className="h-5 w-5" />
          <p className="text-sm font-medium">
            24-hour score board updates coming soon!
          </p>
        </div>
        <p className="text-xs text-slate-500">
          Data is refreshed every 24 hours. Your ranking is calculated based on your public GitHub and LeetCode activity.
        </p>
      </div>
      <ToastContainer
          position="bottom-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          limit={1}
          pauseOnHover
          theme="dark"
        />
    </div>
  );
}