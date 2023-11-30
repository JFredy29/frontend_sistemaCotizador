export default function VentajasHome() {
    const iconoStyle = "flex flex-col justify-center items-center mb-6 md:mb-0 last:mb-0"

    return (
        <section className="bg-rose-500 w-full">
            <div className="contenedor py-12 md:grid md:grid-cols-3 gap-x-5">
                <div className={iconoStyle}>
                    <i className="fas fa-bolt text-white text-5xl"></i>
                    <h3 className="font-bold uppercase text-center text-white">Cotización Rápida</h3>
                    <p className="text-center text-white text-lg font-semibold">Contacto en el menor tiempo posible</p>
                </div>

                <div className={iconoStyle}>
                    <i className="fa fa-handshake text-white text-5xl"></i>
                    <h3 className="font-bold uppercase text-center text-white">Trabajos Garantizado</h3>
                    <p className="text-center text-white text-lg font-semibold">Productos elaborados con los mayores estándares de calidad</p>
                </div>

                <div className={iconoStyle}>
                    <i className="fas fa-book-open text-white text-5xl"></i>
                    <h3 className="font-bold uppercase text-center text-white">Amplio Catálogo</h3>
                    <p className="text-center text-white text-lg font-semibold">Gran variedad de productos impresos, publicidad y souvenirs</p>
                </div>
            </div>
        </section>
    );
}
