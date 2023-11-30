import impresion from "../../components/assets/services/impresion.jpeg";
import papeleria from "../../components/assets/services/papeleria.jpg";
import sublimacion from "../../components/assets/services/sublimacion.jpg";

export const ServicesPage = () => {
    const textPageStyle = "text-center font-bold text-rose-500 mb-5";

    const gridInfoStyle = "flex flex-col md:flex-row gap-x-8 mb-4 md:mb-8";
    const contenedorImgStyle = "w-full h-96 hidden md:block";
    const imgStyle = "object-cover w-full h-full" ;

    const contenedorTextoStyle = "grid place-items-center w-full md:h-96";
    const textoHeadingStyle = "text-center text-rose-500 font-bold";

    const listStyle = "columns-2 xl:columns-3 gap-x-8 w-min mx-auto";
    const unorderedListStyle = "marker:text-rose-500 list-disc font-semibold";

    return (
        <div className="contenedor px-12 py-6">
            <h2 className={textPageStyle}>Nuestros Servicios</h2>
            <div className={gridInfoStyle}>
                <div className={contenedorImgStyle}>
                    <img className={imgStyle} src={papeleria} alt="Imagen Papelería"/>
                </div>

                <div className={contenedorTextoStyle}>
                    <div>
                        <h3 className={textoHeadingStyle}>Papelería Comercial y Publicitaria</h3>
                        <div className={listStyle}>
                            <ul className={unorderedListStyle}>
                                <li>Facturas</li>
                                <li>Recibos</li>
                                <li>Membretes</li>
                                <li>Carnet</li>
                                <li>Tarjetas</li>
                                <li>Carpetas</li>
                                <li>Etiquetas</li>
                                <li>Separadores</li>
                                <li>Sobres</li>
                                <li>Folletos</li>
                                <li>Catálogos</li>
                                <li>Revistas</li>
                                <li>Brochure</li>
                                <li>Boletas</li>
                                <li>Bingo</li>
                                <li>Almanaques</li>
                                <li>Bolsas</li>
                                <li>Agendas</li>
                                <li>Botones</li>
                                <li>LLaveros</li>
                                <li>Afiches</li>
                                <li>Volantes</li>
                                <li>Lapiceros</li>
                                <li>Sellos</li>
                                <li>Impresiones</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse gap-x-8 mb-4 md:mb-8">
                <div className={contenedorImgStyle}>
                    <img className={imgStyle} src={impresion} />
                </div>

                <div className={contenedorTextoStyle}>
                    <div>
                        <h3 className={textoHeadingStyle}>Impresión Digital</h3>
                        <div className={listStyle}>
                            <ul className={unorderedListStyle}>
                                <li>Avisos</li>
                                <li>Pendones</li>
                                <li>Vallas</li>
                                <li>Vinilos</li>
                                <li>Imantados</li>
                                <li>Cajas de luz</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={gridInfoStyle}>
                <div className={contenedorImgStyle}>
                    <img className={imgStyle} src={sublimacion} />
                </div>

                <div className={contenedorTextoStyle}>
                    <div>
                        <h3 className={textoHeadingStyle}>Sublimación</h3>
                        <div className={listStyle}>
                            <ul className={unorderedListStyle}>
                                <li>Mugs</li>
                                <li>Gorras</li>
                                <li>Camisetas</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}