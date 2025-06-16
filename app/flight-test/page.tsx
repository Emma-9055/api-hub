"use client";
import { useState } from "react";

export default function FlightTestPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, date }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "请求失败" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">航班查询测试</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">出发地</label>
          <input value={from} onChange={e => setFrom(e.target.value)} className="border px-2 py-1 w-full" required />
        </div>
        <div>
          <label className="block mb-1">目的地</label>
          <input value={to} onChange={e => setTo(e.target.value)} className="border px-2 py-1 w-full" required />
        </div>
        <div>
          <label className="block mb-1">出发日期</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border px-2 py-1 w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "查询中..." : "查询"}
        </button>
      </form>
      <div className="mt-6">
        {response && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Response</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">{JSON.stringify(response, null, 2)}</pre>
            {response.markdown && (
              <div className="mt-4">
                <h3 className="font-semibold">Markdown 渲染效果</h3>
                <div className="prose" dangerouslySetInnerHTML={{ __html: response.markdown.replace(/\n/g, '<br/>') }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 