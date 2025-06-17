"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    department: "",
    arrive: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!form.name || !form.department || !form.arrive || !form.date) {
      setError("所有字段均为必填项");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: form.department,
          to: form.arrive,
          date: form.date,
        }),
      });
      const data = await res.json();
      setResult(data.markdown || JSON.stringify(data));
    } catch (err) {
      setError("查询失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">API Feature List</h1>
      <form
        className="bg-white rounded shadow p-8 flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">机票查询</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">姓名</label>
          <input
            id="name"
            name="name"
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="department" className="font-medium">出发地</label>
          <input
            id="department"
            name="department"
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="arrive" className="font-medium">目的地</label>
          <input
            id="arrive"
            name="arrive"
            type="text"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.arrive}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-medium">出发日期</label>
          <input
            id="date"
            name="date"
            type="date"
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "查询中..." : "查询"}
        </button>
      </form>
      {result && (
        <div className="bg-white rounded shadow p-6 mt-4 w-full max-w-2xl overflow-x-auto">
          <h3 className="text-lg font-bold mb-2">查询结果</h3>
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>').replace(/\|/g, '&#124;') }} />
        </div>
      )}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <a
          href="/flight-test"
          className="w-full px-4 py-3 rounded bg-blue-600 text-white text-center font-semibold shadow hover:bg-blue-700 transition"
        >
          Flight Search Test
        </a>
        <a
          href="/flight-booking"
          className="w-full px-4 py-3 rounded bg-green-600 text-white text-center font-semibold shadow hover:bg-green-700 transition"
        >
          Flight Booking
        </a>
        {/* Add more API entries here in the future */}
      </div>
    </div>
  );
}
