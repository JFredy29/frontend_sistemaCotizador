export const ContactPage = () => {
    const textPageStyle = "text-center font-bold text-rose-500 mb-4 md:mb-10";

    const gridInfoStyle = "flex flex-col-reverse gap-y-8 md:gap-y-0 md:flex-row gap-x-8 mb-4 md:mb-8";
    const contenedorImgStyle = "w-full";

    const contenedorTextoStyle = "grid place-items-center w-full md:h-96";
    const textoHeadingStyle = "text-center text-rose-500 font-bold";
    const textoStyle = "mb-2 font-semibold";

    return (
        <div className="contenedor px-12 py-6">
            <h2 className={textPageStyle}>Contacto</h2>
            <div className={gridInfoStyle}>
                <div className={contenedorImgStyle}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d996.7248129180185!2d-75.62163435175218!3d2.1918443396818583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMsKwMTEnMzAuNiJOIDc1wrAzNycxMy43Ilc!5e0!3m2!1ses-419!2sco!4v1700345661422!5m2!1ses-419!2sco"
                        className="w-full h-full border-4 border-rose-500"
                        allowFullScreen=""
                        aria-hidden="false"
                        tabIndex="0"
                    />
                </div>

                <div className={contenedorTextoStyle}>
                    <div>
                        <h3 className={textoHeadingStyle}>Estamos para ayudarte</h3>
                        <p className={textoStyle}>Impacto Creativo</p>
                        <p className={textoStyle}>Celular: +57 312 529 1481, Whatsapp</p>
                        <p className={textoStyle}>Email: impactocreativopf@gmail.com</p>
                        <p className={textoStyle}>Dirección: Cra 1B # 4 - 26, Las Palmas</p>
                        <p className={textoStyle}>Ciudad: Garzón, Huila</p>
                    </div>
                </div>
            </div>
        </div>
    );
}