import HomeHero from "../../components/assets/home/home_hero.jpg";
import HomeHeroAvif from "../../components/assets/home/home_hero.avif";
import HomeHeroWebp from "../../components/assets/home/home_hero.webp";
import VentajasHome from "../../components/home/VentajasHome";

export const HomePage = () => {
    const degradadoTextoStyle = "text-transparent bg-gradient-to-r from-sky-500 to-rose-500 bg-clip-text";
    const btnCallToActionStyle = "bg-rose-500 py-2 border rounded-lg px-4 w-fit text-white text-left font-semibold text-lg";
    const textoCallToActionStyle = "mb-5 text-lg font-semibold";

    return (
        <>
            <div className="contenedor py-12 md:grid md:grid-cols-2">
                <div className="flex flex-col justify-around md:pr-16 mb-12 ">
                    <p className="text-3xl md:text-2xl font-bold">¡Haz realidad tus ideas con la magia de la litografía!</p>

                    <h1 className={`${degradadoTextoStyle} text-6xl md:text-5xl font-black my-5`}>En Impacto Creativo</h1>
                    
                    <p className={textoCallToActionStyle}>
                    Transformamos conceptos en impresiones impactantes. ¿Listo para destacar? Cotiza tu proyecto ahora y da vida a tus visiones. ¡Haz que cada detalle cuente con nosotros!
                    </p>

                    <button className={btnCallToActionStyle}>Cotizar</button>
                </div>

                <div>
                    <picture>
                        <source srcSet={HomeHeroAvif} type="image/avif" />
                        <source srcSet={HomeHeroWebp} type="image/webp" />
                        <img className="h-full object-cover" loading="lazy" decoding="async" src={HomeHero} alt="Imagen Header" width="630" height="420" />
                    </picture>
                </div>
            </div>
            
            <VentajasHome />
        </>
    )
}