/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import AllNotesCards from "../NotesPages/NotesCards/AllNotesCards.jsx";
export default function AllNotes({ toShowAdmin, filterNotes, setFilterNotes}) {
  const token = localStorage.getItem("tokens");
  const userRole = localStorage.getItem("role");
  // console.log("admin will see ", filterNotes);
  return (
    <div className="row">
      {filterNotes &&
        filterNotes.map((n) => (
          <AllNotesCards
            key={n._id}
            n={n}
            token={token}
            setFilterNotes={setFilterNotes}
            userRole={userRole}
            toShowAdmin={toShowAdmin}
          />
        ))}
    </div>
  );
}
