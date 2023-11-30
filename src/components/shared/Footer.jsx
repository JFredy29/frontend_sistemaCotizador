import Logo from "../assets/shared/logo.png";

export default function Footer() {
    const footerGridStyle = "contenedor md:grid md:grid-cols-3";
    const footerWidgetStyle = "mb-5 md:mb-0";
    const footerWidgetHeaderStyle = "text-center text-rose-500 font-bold";
    const footerWidgetNavStyle = "flex flex-col items-center justify-between";

    const navTextStyle = "font-semibold py-1";
    const navTextLinkStyle = "font-semibold py-1 hover:text-rose-500";

    const copyrightTextStyle = "text-center overline decoration-4 text-rose-500 text-xl font-bold py-4";
    const year = new Date().getFullYear();

    return (
        <footer className="pt-6 shadow-inner">
            <div className={footerGridStyle}>
                <div className={footerWidgetStyle}>
                    <img className="w-4/5 mx-auto" src={Logo} alt="Logo Impacto Creativo"/>
                </div>

                <div className="footer-widget">
                    <h3 className={footerWidgetHeaderStyle}>Contacto</h3>
                    <nav className={footerWidgetNavStyle}>
                        <p className={navTextStyle}>Impacto Creatico - Garzón, (H)</p>
                        <p className={navTextStyle}>Cel: +57 312 529 1481, Whatsapp</p>
                        <p className={navTextStyle}>Dir: Cra 1B # 4 - 26, Las Palmas</p>
                        <p className={navTextStyle}>Email: impactocreativopf@gmail.com</p>
                    </nav>
                </div>

                <div className="footer-widget">
                    <h3 className={footerWidgetHeaderStyle}>Terminos y Condiciones</h3>
                    <nav className={footerWidgetNavStyle}>
                        <a className={navTextLinkStyle} href="#">Politica de Privacidad</a>
                    </nav>
                </div>
            </div>

            <p className={copyrightTextStyle}>Todos los derechos reservados &copy; {year}</p>
        </footer>
    );
}
