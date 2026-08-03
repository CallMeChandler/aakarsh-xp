import { Rnd } from "react-rnd";

export default function AboutWindow({ onClose }) {
  return (
    <Rnd
      default={{ x: 200, y: 100, width: 400, height: 300 }}
      bounds="parent"
      className="border border-gray-500 bg-white shadow-lg"
    >
      <div className="bg-blue-700 text-white px-2 py-1 text-sm font-bold flex justify-between items-center">
        <span>About Me - Aakarsh</span>
        <button onClick={onClose} className="hover:bg-red-500 px-2">✕</button>
      </div>
      <div className="p-4 text-sm text-black">
        <p>Hello, I'm Aakarsh Agarwal. Full Stack Web Dev 😎</p>
      </div>
    </Rnd>
  );
}
