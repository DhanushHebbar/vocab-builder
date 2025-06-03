import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { 
  Trophy, Brain, Target, TrendingUp, Calendar, Clock,
  Award, BookOpen, Heart, BarChart
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { vocabularyData } from '../data/vocabularyData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProfilePage: React.FC = () => {
  const { userProgress } = useUser();

  // Ensure userProgress data is available
  if (!userProgress) {
    return <p className="text-center text-lg">Loading progress...</p>;
  }
  
  const totalWords = vocabularyData.length;
  const learnedPercentage = (userProgress.learned.length / totalWords) * 100;
  const quizzedPercentage = (userProgress.quizzed.length / totalWords) * 100;

  // Chart Data
  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Words Learned',
        data: [4, 6, 8, 12, 15, 18, 20],
        fill: true,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-800">Your Learning Journey</h1>
            <p className="text-neutral-600 mt-1">Keep track of your vocabulary learning progress</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Current Streak"
          value={`${userProgress.streak} days`}
          icon={<Calendar className="w-6 h-6 text-primary-500" />}
          trend="+2 from last week"
        />
        <StatsCard 
          title="Words Learned"
          value={userProgress.learned.length.toString()}
          icon={<Brain className="w-6 h-6 text-accent-500" />}
          trend={`${learnedPercentage.toFixed(1)}% of total`}
        />
        <StatsCard 
          title="Quiz Performance"
          value={`${quizzedPercentage.toFixed(1)}%`}
          icon={<Target className="w-6 h-6 text-green-500" />}
          trend="Average score"
        />
        <StatsCard 
          title="Study Time"
          value="12.5 hrs"
          icon={<Clock className="w-6 h-6 text-purple-500" />}
          trend="This month"
        />
      </div>

      {/* Progress Chart */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          Learning Progress
        </h2>
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>
    </div>
  );
};

// StatsCard Component
interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md p-6"
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
  >
    <div className="flex justify-between items-start">
      {icon}
      <span className="text-xs text-neutral-500">{trend}</span>
    </div>
    <h3 className="text-neutral-600 text-sm mt-4">{title}</h3>
    <p className="text-2xl font-bold text-neutral-800 mt-1">{value}</p>
  </motion.div>
);


