import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import WeeklyBarChart from "../components/charts/WeeklyBarChart";
import TrendLineChart from "../components/charts/TrendLineChart";
import LanguagePieChart from "../components/charts/LanguagePieChart";
import ProductivityScoreCard from "../components/ProductivityScoreCard";
import SuggestionsPanel from "../components/SuggestionsPanel";
import api from "../services/api";
import Loader from "../components/Loader";

const Analytics = () => {
  const [weekly, setWeekly] = useState([]);
  const [trend, setTrend] = useState([]);
  const [languages, setLanguages] = useState({});
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // const fetchAnalytics = async () => {
  //   setLoading(true);

  //   const weeklyRes = await api.get("/analytics/weekly");
  //   const scoreRes = await api.get("/analytics/productivity-score");
  //   const suggestionRes = await api.get("/analytics/suggestions");

  //   console.log("Weekly Data  : " + weeklyRes.data);
  //   console.log("Score Data  : " + scoreRes.data.productivityScore);
  //   console.log("Suggestion Data  : " + suggestionRes.data.suggestions);

  //   setSuggestions(suggestionRes.data.suggestions);
  //   setScore(scoreRes.data.productivityScore);
  //   setSuggestions(
  //     Array.isArray(suggestionRes.data.suggestions)
  //       ? suggestionRes.data.suggestions
  //       : [],
  //   );

  //   setLoading(false);
  // };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const weeklyRes = await api.get("/analytics/weekly");
      const scoreRes = await api.get("/analytics/productivity-score");
      const suggestionRes = await api.get("/analytics/suggestions");

      const logs = weeklyRes.data?.logs || [];

      // ==============================
      // 🔹 WEEKLY + TREND DATA
      // ==============================

      const dayCountMap = {};
      const dayDurationMap = {};
      const languageMap = {};

      logs.forEach((log) => {
        const dateObj = new Date(log.date);

        const formattedDate = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        // ✅ FIX: Count each date only once
        if (!dayCountMap[formattedDate]) {
          dayCountMap[formattedDate] = 1;
        }

        // Sum minutes per day (unchanged)
        dayDurationMap[formattedDate] =
          (dayDurationMap[formattedDate] || 0) + log.duration;

        // Sum minutes per language (unchanged)
        languageMap[log.language] =
          (languageMap[log.language] || 0) + log.duration;
      });

      // Sort dates chronologically (unchanged)
      const sortedDates = Object.keys(dayDurationMap).sort(
        (a, b) => new Date(a) - new Date(b),
      );

      // Format Weekly Bar Data (unchanged structure)
      const formattedWeekly = sortedDates.map((date) => ({
        week: date,
        days: dayCountMap[date],
      }));

      // Format Trend Line Data (unchanged)
      const formattedTrend = sortedDates.map((date) => ({
        date,
        duration: dayDurationMap[date],
      }));

      // ==============================
      // 🔹 SET STATE (unchanged)
      // ==============================

      setWeekly(formattedWeekly);
      setTrend(formattedTrend);
      setLanguages(languageMap);
      setScore(scoreRes.data?.productivityScore || 0);

      setSuggestions(
        Array.isArray(suggestionRes.data?.suggestions)
          ? suggestionRes.data.suggestions
          : [],
      );
    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <DashboardLayout>
      {loading && <Loader />}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <ProductivityScoreCard score={score} />
        <SuggestionsPanel suggestions={suggestions} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow">
          <WeeklyBarChart data={weekly} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <TrendLineChart data={trend} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow md:col-span-2">
          <LanguagePieChart data={languages} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
