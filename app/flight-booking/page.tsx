"use client";
import { useState } from "react";

export default function FlightBookingPage() {
  const [flightNo, setFlightNo] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("/api/flight-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flightNo, name, contact }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flight Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Flight No.</label>
          <input
            value={flightNo}
            onChange={e => setFlightNo(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Contact</label>
          <input
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book"}
        </button>
      </form>
      <div className="mt-6">
        {response && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Response</h2>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
            {response.markdown && (
              <div className="mt-4">
                <h3 className="font-semibold">Markdown Preview</h3>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: response.markdown.replace(/\n/g, "<br/>")
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 