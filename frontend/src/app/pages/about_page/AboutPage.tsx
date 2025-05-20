import styles from './AboutPage.module.css';
export default function AboutPage(){
    return(
        <section className={styles.main_section}>
            <div className={styles.image_cont}>
                <img src="/images/about.jpg" alt="ArteMauricio" />
            </div>
            <h1>Quem somos? Saiba um pouco mais sobre a ArteMauricio</h1>
            <h3>Onde a Natureza Encontra a Criatividade</h3>
            <p>
                Explore nossa coleção de lembranças autênticas, feitas à mão com
                materiais naturais. Cada peça captura a essência tropical, perfeita para
                presentear ou guardar como uma recordação especial.
            </p>
            <h3>Algo mais?</h3>
            <p>
                Para orçamentos, dúvidas, parcerias e etc. Entre em contato conosco
                através do nosso <a href="">Instagram</a> ou se preferir, acesse nossa{" "}
                <a href="/contact">Página de Contato</a>.
            </p>
        </section>
    )
}