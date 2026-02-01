import { useState } from "react";
import Navbar from "./Navbar";
import {
  Layers,
  Database,
  Server,
  Code2,
  Sparkles,
  Send
} from "lucide-react";

export default function DashBoard() {
  const [requirement, setRequirement] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://high-level-to-low-level-architecture.onrender.com/business/generate";

  const generateSpec = async (reqText) => {
    if (!reqText.trim()) return;

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requirement: reqText }),
      });

      if (!res.ok) throw new Error("Failed to generate specification");

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 via-base-200 to-base-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* INPUT CARD */}
        <div className="card bg-base-100 shadow-2xl border border-base-300 p-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-primary" />
            <h2 className="text-3xl font-extrabold">
              Business Requirement
            </h2>
          </div>

          <textarea
            className="textarea textarea-bordered w-full min-h-[140px] text-lg"
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="Describe your business idea in plain English..."
          />

          <button
            onClick={() => generateSpec(requirement)}
            className="btn btn-primary btn-lg mt-5 gap-2 hover:scale-105 transition-transform"
            disabled={loading || !requirement.trim()}
          >
            <Send className="w-5 h-5" />
            {loading ? "Generating..." : "Generate Specification"}
          </button>

          {error && <p className="text-error mt-3">{error}</p>}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

        {/* OUTPUT */}
        {data && (
          <div className="space-y-16 animate-fade-in">

            <FancySection title="System Modules" icon={<Layers />}>
              {data.modules.map((mod, idx) => (
                <Card key={idx}>
                  <h3 className="font-bold text-xl mb-1">{mod.name}</h3>
                  <p className="text-base-content/70 mb-3">
                    {mod.responsibility}
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {mod.key_features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </FancySection>

            <FancySection title="Database Schema" icon={<Database />}>
              {data.database_schema.map((db, idx) => (
                <Card key={idx}>
                  <h3 className="font-bold text-xl mb-1">
                    {db.collection_name}
                  </h3>
                  <p className="text-sm mb-4 text-base-content/60">
                    {db.relationships}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="table table-zebra">
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {db.fields.map((f, i) => (
                          <tr key={i}>
                            <td>{f.name}</td>
                            <td>{f.type}</td>
                            <td>{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ))}
            </FancySection>

            <FancySection title="API Endpoints" icon={<Server />}>
              {data.api_endpoints.map((api, idx) => (
                <Card key={idx}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="badge badge-outline font-bold">
                      {api.method}
                    </span>
                    <code className="font-mono text-primary">
                      {api.endpoint}
                    </code>
                  </div>
                  <p className="mb-2">{api.description}</p>
                  <p className="text-sm">
                    <strong>Request:</strong> {api.request_body}
                  </p>
                  <p className="text-sm">
                    <strong>Response:</strong> {api.response_structure}
                  </p>
                </Card>
              ))}
            </FancySection>

            <FancySection title="Pseudocode" icon={<Code2 />}>
              <pre className="bg-black/90 text-green-400 p-6 rounded-xl shadow-xl overflow-x-auto text-sm font-mono">
                {data.pseudocode.join("\n")}
              </pre>
            </FancySection>

          </div>
        )}
      </div>
    </div>
  );
}

/* Reusable Components */
function FancySection({ title, icon, children }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-primary">{icon}</span>
        <h2 className="text-3xl font-extrabold">{title}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div className="card bg-base-100 shadow-xl p-6 border border-base-300 hover:shadow-2xl hover:-translate-y-1 transition-all">
      {children}
    </div>
  );
}

