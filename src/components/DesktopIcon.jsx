import { Rnd } from "react-rnd";

export default function DesktopIcon({ icon, label, onDoubleClick, x = 80, y = 80 }) {
    return (
        <Rnd
            default={{
                x: x,
                y: y,
                width: 80,
                height: 100
            }}
            bounds="parent"
            disableDragging={true}
            enableResizing={false}
            className="flex flex-col items-center cursor-pointer select-none">
            <div onDoubleClick={onDoubleClick} className="flex flex-col items-center">
                <img src={icon} alt={label} className="w-14 h-14 mb-1" />
                <p className="text-white text-sm font-semibold text-center">{label}</p>
                
            </div>
        </Rnd>
    );
}