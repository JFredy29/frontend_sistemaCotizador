import puzzle from "../../components/assets/about/puzzle.jpg";
import brujula from "../../components/assets/about/brujula.jpg";
import vision from "../../components/assets/about/vision.jpg";

export const AboutPage = () => {
    const textPageStyle = "text-center font-bold text-rose-500 mb-5";

    const gridInfoStyle = "flex flex-col md:flex-row gap-x-8 mb-4 md:mb-8";
    const contenedorImgStyle = "w-full h-96 hidden md:block";
    const imgStyle = "object-cover w-full h-full" ;

    const contenedorTextoStyle = "grid place-items-center w-full md:h-96";
    const textoHeadingStyle = "text-center text-rose-500 font-bold";
    const textoStyle = "mb-5 font-semibold";

    return (
        <div className="contenedor px-12 py-6">
            <h2 className={textPageStyle}>Acerca de</h2>
            <div className={gridInfoStyle}>
                <div className={contenedorImgStyle}>
                    <img className={imgStyle} src={puzzle} alt="Imagen Rompecabezas"/>
                </div>

                <div className={contenedorTextoStyle}>
                    <div>
                        <h3 className={textoHeadingStyle}>¿Quienes Somos?</h3>
                        <p className={textoStyle}>Una empresa de publicidad y medios impresos con el proposito de diseñar e imprimir efizcamente proyectos de comunicación visual para hacerle las cosas más faciles a nuestros clientes.</p>

                        <p className={textoStyle}>Nos interesa vender "Soluciones Visuales" adaptadas 100% a sus necesidades y ser responsables en el tiempo de entrega, sabemos que la única manera en que un cliente regrese es que termine satisfecho con el trabajo realizado, que sienta que trabajamos para lograr sus objetivos.</p>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row-reverse gap-x-8 mb-4 md:mb-8">
                <div className={contenedorImgStyle}>
                    <img className={imgStyle} src={brujula} />
                </div>

                <div className={contenedorTextoStyle}>
                    <div>
                        <h3 className={textoHeadingStyle}>Misión</h3>
                        <p className={textoStyle}>Ofrecer a nuestros clientes, soluciones en el área de impresión litográfica, digital, en tiempo record, para que la labor de su empresa no se detenga, incorporando siempre lo mejor de nuestro trabajo en la producción de sus impresos, con el objetivo de dar un aporte significativo a ustedes "Nuestros Clientes".</p>
                    </div>
                </div>
            </div>

            <div className={gridInfoStyle}>
                <div className={contenedorImgStyle}>
                    <img className={imgStyle} src={vision} />
                </div>

                <div className={contenedorTextoStyle}>
                    <div>
                        <h3 className={textoHeadingStyle}>Visión</h3>
                        <p className={textoStyle}>Satisfacer las necesidades de nuestros clientes y llegar a ser una empresa líder en la rama de las artes gráficas, contribuyend con el desarrollo de la región.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}