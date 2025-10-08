import React from "react";

export default function DownloadButton({ notes }) {
  const handleDownloadUsers = () => {
    //convert into csv
    const headers = Object.keys(notes).join(",") + "\n";
    const rows = notes.map((obj) => Object.values(obj).join(",")).join("\n");
    const usersArray = headers + rows;
    //create blob
    const blob = new Blob([usersArray], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "allUsersDownload.csv";
    document.body.append(link);
    link.click();
    link.remove();
  };
  return (
    <div>
      {" "}
      <button
        className="btn btn-primary rounded-5"
        onClick={handleDownloadUsers}
      >
        Download All Users Pdf
      </button>
    </div>
  );
}
