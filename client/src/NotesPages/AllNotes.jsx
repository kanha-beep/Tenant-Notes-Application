/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import AllNotesCards from "../NotesPages/NotesCards/AllNotesCards.jsx";
export default function AllNotes({ toShowAdmin, filterNotes, setFilterNotes}) {
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");
  // console.log("admin will see ", filterNotes);
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filterNotes &&
          filterNotes.map((n) => (
            <div key={n._id} className="mt-2">
              <AllNotesCards
                n={n}
                token={token}
                setFilterNotes={setFilterNotes}
                userRole={userRole}
                toShowAdmin={toShowAdmin}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
