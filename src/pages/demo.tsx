import NavBar from "@/components/navbar";
import DefaultHead from "@/components/default-head";
import Title from "@/components/title";
import Icon from "@/components/icon";

const Demo = () => {
  return (
    <div>
      <DefaultHead />
      <NavBar currentPage="demo" />
      <br />

      <div className="container text-center">
        <h5>How to use <strong><Title /><Icon size={20} /></strong></h5>
        {/* <video src="/demo-sub.mp4" className="object-fit-none border rounded"></video> */}
        <div className="ratio ratio-16x9">
          <iframe src="/demo-sub.mp4" className="border border-5 border-warning rounded-4" allowFullScreen title="demo_video"></iframe>
        </div>
      </div>
    </div>
  );
}

export default Demo;
