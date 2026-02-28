import { useNavigate } from "react-router-dom";
import { useEnquiry } from "../context/EnquiryContext";

const Enquiries = () => {
  const { enquiries, deleteEnquiry } = useEnquiry();
  const navigate = useNavigate()

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
       <p
        onClick={() => navigate("/admin")}
        className="w-fit bg-red-300 px-2 py-1 hover:cursor-pointer hover:bg-red-600 hover:text-white font-semibold rounded"
      >
        X
      </p>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Enquiries</h2>

      {enquiries.length === 0 && (
        <p className="text-gray-500 text-center">No enquiries yet</p>
      )}

      <div className="space-y-4">
        {enquiries.map((e) => (
          <div
            key={e._id}
            className="bg-white p-4 sm:p-5 rounded-lg shadow flex flex-col gap-2"
          >
            {/* DETAILS */}
            <div className="space-y-1 break-words">
              <p className="text-sm sm:text-base">
                <b>Name:</b> {e.name}
              </p>

              <p className="text-sm sm:text-base break-all">
                <b>Email:</b> {e.email}
              </p>

              <p className="text-sm sm:text-base">
                <b>Message:</b> {e.message}
              </p>

              <p className="text-xs text-gray-500">{e.date}</p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-2 mt-2">
              {/* EMAIL */}
              <a
                href={`mailto:${e.email}?subject=Reply from A2V&body=Hello ${e.name},`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
              >
                Email
              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/?text=Hello ${e.name}, we received your enquiry`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
              >
                WhatsApp
              </a>

              {/* DELETE */}
              <button
                onClick={() => deleteEnquiry(e._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enquiries;