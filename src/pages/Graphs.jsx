import React from "react";
import {
  Briefcase,
  CheckCircle,
  Clock,
  Users,
  Building2,
  DollarSign,
  Wallet,
  Hourglass,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Colors for pie chart
const COLORS = ["#4CAF50", "#FF9800", "#2196F3"];

function Graphs() {
  // Generate data
  const totalProjects = Math.floor(Math.random() * 100);
  const completedProjects = Math.floor(Math.random() * totalProjects);
  const pendingProjects = totalProjects - completedProjects;

  const stats = [
    { title: "Total Projects", icon: <Briefcase className="w-8 h-8 text-blue-600" />, count: totalProjects },
    { title: "Completed Projects", icon: <CheckCircle className="w-8 h-8 text-green-600" />, count: completedProjects },
    { title: "Pending Projects", icon: <Clock className="w-8 h-8 text-orange-600" />, count: pendingProjects },
    { title: "Total Clients", icon: <Users className="w-8 h-8 text-purple-600" />, count: Math.floor(Math.random() * 100) },
    { title: "Total Vendors", icon: <Building2 className="w-8 h-8 text-pink-600" />, count: Math.floor(Math.random() * 100) },
    { title: "Total Income", icon: <DollarSign className="w-8 h-8 text-green-700" />, count: Math.floor(Math.random() * 100000) },
    { title: "Total Expenses", icon: <Wallet className="w-8 h-8 text-red-600" />, count: Math.floor(Math.random() * 100000) },
    { title: "Pending Income", icon: <Hourglass className="w-8 h-8 text-yellow-600" />, count: Math.floor(Math.random() * 100000) },
    { title: "Upcoming Expenses", icon: <Calendar className="w-8 h-8 text-indigo-600" />, count: Math.floor(Math.random() * 100000) },
  ];

  // Pie chart data for projects
  const pieData = [
    { name: "Completed Projects", value: completedProjects },
    { name: "Pending Projects", value: pendingProjects },
    { name: "Total Projects", value: totalProjects },
  ];
  // Example monthly data
const chartData = [
  { month: "June", Projects: 40, Completed: 28, Pending: 12 },
  { month: "July", Projects: 55, Completed: 42, Pending: 13 },
  { month: "August", Projects: 70, Completed: 50, Pending: 20 },
];


  return (
    <div className="py-26 overflow-y-auto h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 px-45  lg:grid-cols-3 gap-6 mb-10">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#CFBAFF] rounded-3xl border-2 border-black shadow-[0_5px_20px_rgba(187,170,225,1)] p-6 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <h2 className="text-lg font-semibold">{item.title}</h2>
            </div>
            <p className="mt-2 text-5xl font-bold text-gray-700">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Graph + Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
   <div className="bg-[#CFBAFF] p-6 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">Statistics Overview (Past 3 Months)</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData} barGap={5}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      
      <Bar dataKey="Projects" fill="#8884d8">
        <LabelList dataKey="Projects" position="top" />
      </Bar>
      
      <Bar dataKey="Completed" fill="#4CAF50">
        <LabelList dataKey="Completed" position="top" />
      </Bar>
      
      <Bar dataKey="Pending" fill="#FF9800">
        <LabelList dataKey="Pending" position="top" />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</div>


        {/* Pie Chart */}
    <div className="bg-[#CFBAFF] p-6 rounded-2xl shadow-md">
  <h2 className="text-xl font-semibold mb-4">Projects Breakdown</h2>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label={({ name, percent }) =>
          `${name} ${(percent * 100).toFixed(0)}%`
        } // custom label
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`${value}`, "Count"]} />
      <Legend
        verticalAlign="bottom"
        height={36}
        iconType="circle"
      />
    </PieChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );
}

export default Graphs;
