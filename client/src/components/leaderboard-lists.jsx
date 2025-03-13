import { useState, useEffect } from "react"
import { StarIcon, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import axios from "axios"
import ProfileCard from "./user-card"

export function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [leaderboardData, setLeaderBoardData] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalFilteredUsers, setTotalFilteredUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [selectedUserDetails, setSelectedUserDetails] = useState(null)
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
      setCurrentPage(1) // Reset to first page on new search
    }, 500)
    
    return () => clearTimeout(timer)
  }, [searchQuery])
  
  const getLeaderboardLists = async (pageNum, search = "") => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getLeaderboardLists?page=${pageNum}&search=${search}`
      )
      if(response.status === 200){
        setLeaderBoardData(response.data.leaderboardData)
        setTotalUsers(response.data.totalUsers) // Always shows total users regardless of search
        setTotalFilteredUsers(response.data.totalFilteredUsers)
        setTotalPages(response.data.totalPages)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const getUserDetails = async (username) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/getUserDetailsByUsername`,
        { username }
      )
      if (response.status === 200) {
        setSelectedUserDetails(response.data.userData)
        setShowProfileModal(true)
      }
    } catch (error) {
      console.log("Error fetching user details:", error)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleViewDetails = (username) => {
    getUserDetails(username)
  }
  
  const closeProfileModal = () => {
    setShowProfileModal(false)
    setSelectedUserDetails(null)
  }
  
  // Fetch data on component mount and when search or pagination changes
  useEffect(() => {
    getLeaderboardLists(currentPage, debouncedSearch)
  }, [currentPage, debouncedSearch])
  
  const handleNextPage = () => {
    if(currentPage < totalPages){
      setCurrentPage(currentPage + 1)
    }
  }
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-cyan-400/20 mb-4"></div>
          <div className="h-4 w-48 bg-slate-700 rounded mb-2"></div>
          <div className="h-3 w-32 bg-slate-700 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User Count Header */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-4 rounded-lg border border-indigo-800/50 shadow-lg">
        <h2 className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Developer Leaderboard
        </h2>
        <p className="text-center mt-1 text-lg">
          <span className="font-bold text-cyan-300">{totalUsers}</span>
          <span className="text-slate-300"> developers competing for the top spot</span>
          {debouncedSearch && (
            <span className="text-slate-300 ml-2">
              ({totalFilteredUsers} matching "{debouncedSearch}")
            </span>
          )}
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <Input
          type="text"
          placeholder="Search by username, nickname or location..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 bg-slate-800/50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500 text-slate-200 placeholder-slate-400"
        />
      </div>
      
      {/* Leaderboard Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-700 hover:bg-slate-800/50">
              <TableHead className="w-12 text-center">Rank</TableHead>
              <TableHead>Developer</TableHead>
              <TableHead className="hidden sm:table-cell">Nickname</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <StarIcon className="h-4 w-4 text-amber-300" />
                  <span>Score</span>
                </div>
              </TableHead>
              <TableHead className="text-center">Profile Card</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.length > 0 ? (
              leaderboardData.map((user, index) => (
                <TableRow
                  key={user._id || index}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-center">
                    <Badge
                      variant="outline"
                      className={`
                        ${
                          (user.rank === 1)
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                            : (user.rank === 2)
                              ? "bg-slate-400/20 text-slate-300 border-slate-400/50"
                              : (user.rank === 3)
                                ? "bg-amber-700/20 text-amber-600 border-amber-700/50"
                                : "bg-slate-800 text-slate-400 border-slate-700"
                        }
                      `}
                    >
                      {user.rank}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="border border-slate-700">
                        <AvatarImage src={user.avatar_url} alt={user.username} />
                        <AvatarFallback className="bg-slate-800">
                          {user.username ? user.username.substring(0, 2).toUpperCase() : "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{user.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-slate-300">
                    {user.nickname || "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-slate-400">
                    {user.location || "Not specified"}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className={`text-lg font-bold ${
                        (user.rank <= 3) ? "text-cyan-400" : "text-slate-300"
                      }`}>
                        {user.score}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-indigo-900/50 hover:bg-indigo-800 text-cyan-300 border-indigo-800/50"
                      onClick={() => handleViewDetails(user.username)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                  {debouncedSearch 
                    ? `No results found for "${debouncedSearch}"`
                    : "No leaderboard data available"
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          <span className="flex items-center px-4 py-2 text-slate-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
      
      {/* Profile Card Modal */}
      {showProfileModal && selectedUserDetails && (
        <ProfileCard 
          userDetails={selectedUserDetails}
          onClose={closeProfileModal}
        />
      )}
    </div>
  )
}