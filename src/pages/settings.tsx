import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Placeholder from "@/components/placeholder";

const Settings = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="settings" />
      <br />

      <div className="container text-center">
        <Placeholder />
      </div>
    </div>
  );
}

export default Settings;
