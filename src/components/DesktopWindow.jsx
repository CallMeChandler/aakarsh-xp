import { Rnd } from "react-rnd";

export default function DesktopWindow() {
  return (
    <Rnd
      default={{
        x: 100,
        y: 100,
        width: 400,
        height: 300,
      }}
      bounds="parent"
      className="border border-gray-500 bg-gray-100 shadow-lg"
    >
      <div className="bg-blue-700 text-white px-2 py-1 text-sm font-bold flex justify-between items-center">
        <span>About Me - Aakarsh</span>
        <button className="text-white hover:bg-red-500 px-2">✕</button>
      </div>
      <div className="p-4 text-sm">
        <p>Hello, I'm Aakarsh Agarwal. <br /> Full Stack Web Developer 👨‍💻</p>
      </div>
    </Rnd>
  );
}
