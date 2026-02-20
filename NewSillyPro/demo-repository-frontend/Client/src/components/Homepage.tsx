import React, { useState } from "react";

/* shadcn/ui components */
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* Lucide React Icons */
import {
    Search,
    Bell,
    User,
    Home,
    BookOpen,
    Cpu,
    Star,
    Zap,
    TrendingUp,
    Target,
    Calendar,
    MessageSquare,
    FileText,
    Settings,
    ChevronRight,
    HelpCircle,
    Globe,
    Database,
    Code,
    Lock,
    CheckCircle,
    Clock,
    Award,
    Flame,
    Trophy,
    BarChart3,
    Users,
    Sparkles,
} from "lucide-react";

/* Recharts for graphs */
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Area,
    AreaChart,
} from "recharts";

export default function Homepage() {
    const [activeTab, setActiveTab] = useState("home");

    // Sample user data
    const user = {
        name: "Alex",
        level: 7,
        xp: 4200,
        xpToNext: 5000,
        streak: 14,
        rank: "Top 15%",
        avatarUrl: null,
    };

    // Progress chart data
    const progressData = [
        { day: "Mon", xp: 1200 },
        { day: "Tue", xp: 1900 },
        { day: "Wed", xp: 1500 },
        { day: "Thu", xp: 2200 },
        { day: "Fri", xp: 1800 },
        { day: "Sat", xp: 2500 },
        { day: "Sun", xp: 2800 },
    ];

    // Course/Labs data
    const courses = [
        {
            id: 1,
            title: "Data Structures & Algorithms",
            description: "Master core algorithms and data structures",
            difficulty: "Intermediate",
            progress: 30,
            icon: Code,
            color: "bg-blue-500",
            lessons: 24,
            time: "45 min",
        },
        {
            id: 2,
            title: "Git & GitHub",
            description: "Version control and collaboration workflows",
            difficulty: "Beginner",
            progress: 70,
            icon: Database,
            color: "bg-purple-500",
            lessons: 18,
            time: "30 min",
        },
        {
            id: 3,
            title: "Docker Essentials",
            description: "Containerization and deployment",
            difficulty: "Intermediate",
            progress: 10,
            icon: Cpu,
            color: "bg-cyan-500",
            lessons: 32,
            time: "60 min",
        },
    ];

    // Notes data
    const notes = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Note ${i + 1}`,
        date: "2024-01-15",
        preview: "This is a sample note preview...",
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white">
            {/* MAIN LAYOUT - Sidebar + Content */}
            <div className="flex">
                {/* SIDEBAR */}
                <aside className="hidden lg:flex w-64 flex-col border-r border-gray-800 bg-gray-900/50">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">PHLUXO</h1>
                                <p className="text-xs text-gray-400">Learning Platform</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "home"
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        : "hover:bg-gray-800/50"
                                    }`}
                                onClick={() => setActiveTab("home")}
                            >
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </button>
                            <button
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "learn"
                                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        : "hover:bg-gray-800/50"
                                    }`}
                                onClick={() => setActiveTab("learn")}
                            >
                                <BookOpen className="w-5 h-5" />
                                <span>Learn</span>
                            </button>
                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-gray-800/50"
                            >
                                <Cpu className="w-5 h-5" />
                                <span>UAS</span>
                            </button>
                            <button
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-gray-800/50"
                            >
                                <Globe className="w-5 h-5" />
                                <span>Robot</span>
                            </button>
                        </nav>

                        <div className="mt-12">
                            <h3 className="text-sm font-semibold text-gray-400 mb-3">PAGE</h3>
                            <div className="space-y-2">
                                <button className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-800/50">
                                    Dashboard
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-800/50">
                                    Analytics
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-800/50">
                                    Settings
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-gray-400 mb-3">NOTE</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {notes.slice(0, 6).map((note) => (
                                    <button
                                        key={note.id}
                                        className="w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-gray-800/50 flex items-center justify-between"
                                    >
                                        <span>{note.title}</span>
                                        <FileText className="w-4 h-4 text-gray-500" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-sm font-semibold text-gray-400 mb-3">PROFILE</h3>
                            <div className="flex items-center gap-3 px-4 py-3">
                                <Avatar>
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500">
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-gray-400">Level {user.level}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-auto">
                    {/* TOP NAVBAR */}
                    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/95 backdrop-blur">
                        <div className="px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="lg:hidden p-2">
                                        <Home className="w-5 h-5" />
                                    </button>
                                    <h2 className="text-xl font-bold">Home</h2>
                                    
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-sm w-64 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-gray-800/50 relative">
                                        <Bell className="w-5 h-5" />
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                    </button>
                                    <Avatar>
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500">
                                            {user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>

                            {/* Mobile Navigation */}
                            <div className="flex items-center gap-6 mt-4 md:hidden overflow-x-auto">
                                <button className={`px-4 py-2 rounded-lg ${activeTab === "home" ? "bg-blue-500/20 text-blue-400" : "text-gray-400"}`}>
                                    Home
                                </button>
                                <button className="px-4 py-2 rounded-lg text-gray-400">Learn</button>
                                <button className="px-4 py-2 rounded-lg text-gray-400">UAS</button>
                                <button className="px-4 py-2 rounded-lg text-gray-400">Robot</button>
                            </div>
                        </div>
                    </header>

                    {/* CONTENT AREA */}
                    <div className="p-6">
                        {/* WELCOME SECTION */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{user.name}</span>
                            </h1>
                            <p className="text-gray-400">
                                "The only way to learn is by doing." Keep pushing forward!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* LEFT COLUMN - Courses */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* COURSES SECTION */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold">Your Courses</h2>
                                            <Button variant="ghost" className="text-blue-400">
                                                View All <ChevronRight className="w-4 h-4 ml-1" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {courses.map((course) => {
                                                const Icon = course.icon;
                                                return (
                                                    <div key={course.id} className="p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`p-3 rounded-lg ${course.color} bg-opacity-20`}>
                                                                    <Icon className="w-6 h-6" />
                                                                </div>
                                                                <div>
                                                                    <h3 className="font-bold">{course.title}</h3>
                                                                    <p className="text-sm text-gray-400">{course.description}</p>
                                                                </div>
                                                            </div>
                                                            <Badge className={
                                                                course.difficulty === "Beginner" ? "bg-green-500/20 text-green-400" :
                                                                    course.difficulty === "Intermediate" ? "bg-blue-500/20 text-blue-400" :
                                                                        "bg-purple-500/20 text-purple-400"
                                                            }>
                                                                {course.difficulty}
                                                            </Badge>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <div>
                                                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                                                    <span>Progress</span>
                                                                    <span>{course.progress}%</span>
                                                                </div>
                                                                <Progress value={course.progress} className="h-2" />
                                                            </div>

                                                            <div className="flex items-center justify-between text-sm">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <Clock className="w-4 h-4 text-gray-500" />
                                                                        <span className="text-gray-400">{course.time}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <BookOpen className="w-4 h-4 text-gray-500" />
                                                                        <span className="text-gray-400">{course.lessons} lessons</span>
                                                                    </div>
                                                                </div>
                                                                <Button variant="outline" size="sm">
                                                                    Continue
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* CHALLENGE OF THE DAY */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <h2 className="text-xl font-bold">Challenge of the Day</h2>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 rounded-lg bg-blue-500/20">
                                                    <Target className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg">Build a Web Crawler</h3>
                                                    <p className="text-gray-400 text-sm">Crawl and analyze website structure</p>
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <p className="text-gray-300 mb-4">
                                                    Create a web crawler that can navigate through pages, extract data,
                                                    and handle different types of content. Focus on performance and
                                                    respectful crawling practices.
                                                </p>

                                                <div className="flex items-center gap-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Zap className="w-4 h-4 text-amber-500" />
                                                        <span className="text-gray-300">Intermediate</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-500" />
                                                        <span className="text-gray-400">2-3 hours</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Button className="flex-1">Start Challenge</Button>
                                                <Button variant="outline">View Details</Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* QUESTION SECTION */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <h2 className="text-xl font-bold">Community Question</h2>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                                            <div className="flex items-start gap-4">
                                                <MessageSquare className="w-8 h-8 text-purple-400 mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-lg mb-2">What is the best way to learn?</h3>
                                                    <p className="text-gray-300 mb-4">
                                                        Share your learning strategies and tips with the community.
                                                        How do you approach new topics and retain information?
                                                    </p>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4 text-gray-500" />
                                                            <span className="text-gray-400">42 responses</span>
                                                        </div>
                                                        <Button variant="outline" size="sm">Join Discussion</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* RIGHT COLUMN - Stats & Notes */}
                            <div className="space-y-6">
                                {/* USER STATS */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <h2 className="text-xl font-bold">Your Stats</h2>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-blue-500/20">
                                                        <Flame className="w-5 h-5 text-orange-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">Streak</p>
                                                        <p className="text-2xl font-bold">{user.streak} days</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-400">Rank</p>
                                                    <p className="text-2xl font-bold">{user.rank}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-700">
                                                    <p className="text-sm text-gray-400 mb-1">Level</p>
                                                    <p className="text-2xl font-bold">{user.level}</p>
                                                    <Progress value={(user.xp / user.xpToNext) * 100} className="mt-2 h-1" />
                                                </div>
                                                <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-700">
                                                    <p className="text-sm text-gray-400 mb-1">XP</p>
                                                    <p className="text-2xl font-bold">{user.xp}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{user.xpToNext - user.xp} to next</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* WEEKLY PROGRESS CHART */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Weekly Progress</p>
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                            </div>
                                            <div className="h-32">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart data={progressData}>
                                                        <defs>
                                                            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                                        <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: '#1F2937',
                                                                border: '1px solid #374151',
                                                                borderRadius: '8px'
                                                            }}
                                                        />
                                                        <Area
                                                            type="monotone"
                                                            dataKey="xp"
                                                            stroke="#3B82F6"
                                                            strokeWidth={2}
                                                            fill="url(#colorXp)"
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>

                                        {/* ACHIEVEMENTS */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Recent Achievements</p>
                                                <Award className="w-4 h-4 text-amber-500" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                                    <div
                                                        key={item}
                                                        className="aspect-square rounded-lg bg-gray-900/50 border border-gray-700 flex items-center justify-center"
                                                    >
                                                        {item <= 3 ? (
                                                            <Trophy className="w-6 h-6 text-amber-500" />
                                                        ) : (
                                                            <Lock className="w-6 h-6 text-gray-600" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* QUICK NOTES */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold">Quick Notes</h2>
                                            <Button variant="ghost" size="sm">
                                                <FileText className="w-4 h-4 mr-2" />
                                                New
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3 max-h-64 overflow-y-auto">
                                            {notes.map((note) => (
                                                <div
                                                    key={note.id}
                                                    className="p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-medium">{note.title}</span>
                                                        <span className="text-xs text-gray-500">{note.date}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-400 truncate">{note.preview}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* UPCOMING */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <h2 className="text-xl font-bold">Upcoming</h2>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
                                                <Calendar className="w-5 h-5 text-blue-400" />
                                                <div>
                                                    <p className="font-medium">Team Workshop</p>
                                                    <p className="text-sm text-gray-400">Tomorrow, 2:00 PM</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
                                                <CheckCircle className="w-5 h-5 text-green-400" />
                                                <div>
                                                    <p className="font-medium">Assignment Due</p>
                                                    <p className="text-sm text-gray-400">In 2 days</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}