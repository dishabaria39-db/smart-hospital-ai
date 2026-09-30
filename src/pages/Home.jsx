import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

function Home({ setPage, user, viewAppointment }) {
  return (
    <>
      <Navbar
        setPage={setPage}
        user={user}
      />

      <Hero />
    </>
  );
}

export default Home;