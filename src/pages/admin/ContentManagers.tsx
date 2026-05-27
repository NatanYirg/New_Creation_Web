import { useEffect, useState } from "react";
import { getManagers, updateManagerStatus } from "../../api/admin";

export default function ContentManagers() {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    getManagers().then(res => setManagers(res.data.data));
  }, []);

  const toggle = (id: string, current: string) => {
    const newStatus = current === "active" ? "deactivated" : "active";
    updateManagerStatus(id, newStatus).then(() => {
      setManagers(m => m.map(cm => cm._id === id ? { ...cm, status: newStatus } : cm));
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Content Managers</h1>
      <table className="w-full mt-4 border">
        <tbody>
          {managers.map((m: any) => (
            <tr key={m._id} className="border">
              <td className="p-2">{m.first_name} {m.middle_name}</td>
              <td className="p-2">{m.email}</td>
              <td className="p-2">{m.status}</td>
              <td className="p-2">
                <button 
                  onClick={() => toggle(m._id, m.status)} 
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Toggle Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}