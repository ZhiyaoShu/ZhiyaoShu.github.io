import Login from "./Login";
import Papers from "./FetchPapers";

const Mendeley: React.FC = () => {
  return (
    <div>
      <h1>Mendeley Papers</h1>
      <Login />
      <Papers />
    </div>
  );
}