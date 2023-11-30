export default function Drawer({ isOpen, onClose, children }) {
    const drawerclassNamees = `fixed z-50 h-full w-64 bg-gray-800 text-white top-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform ease-in-out duration-300`;

    return (
        <div className={drawerclassNamees}>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold uppercase">Menu</h5>

                    <button className="p-2" onClick={onClose}>
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
