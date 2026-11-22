const FAQ = [
  {
    q: "Vous faites quoi exactement ?",
    a: "Je fais du développement web freelance et des solutions IA sur mesure. Titouan Hirsch prend en charge des MVP, des refontes d'applications, des agents IA et des architectures plus solides. Je code ce que l'IA ne code pas, puis je vous laisse un produit que vous pouvez faire vivre sans moi.",
  },
  {
    q: "C'est pour qui, votre travail ?",
    a: "Je travaille pour les gens qui veulent lancer vite, corriger une app qui fatigue, ou automatiser des tâches qui leur mangent du temps. Titouan Hirsch parle aux fondateurs, aux équipes produit et aux entreprises qui veulent un développeur ia freelance avec une vision produit, pas juste du code qui tourne.",
  },
  {
    q: "Comment on réserve un appel ?",
    a: "Vous réservez un appel sur le lien Cal. L'accueil du site le montre clairement avec le bouton « Réserver un appel ». 30 minutes suffisent pour voir si on peut travailler ensemble et cadrer le besoin sans partir dans tous les sens.",
  },
  {
    q: "Vous faites du modèle d'IA privé ?",
    a: "Oui, Titouan Hirsch installe des modèles open source sur vos machines ou sur un serveur que vous possédez. Je forme aussi vos équipes à s'en servir au quotidien. Vos données ne sortent pas, et vous gardez la main sur vos usages, sans dépendre d'un outil externe.",
  },
  {
    q: "Vous pouvez créer un MVP rapidement ?",
    a: "Je crée des MVP en développement express, avec un maximum de 2 mois annoncé sur le site. L'idée est de tester votre marché, de valider une hypothèse et de sortir une première version exploitable sans gonfler la dette technique dès le départ.",
  },
  {
    q: "Vous reprenez une app codée par l'IA ?",
    a: "Oui, je reprends une app générée par IA quand elle bugge ou manque de solidité. Je la restructure pour qu'elle devienne un produit fiable et maintenable. Titouan Hirsch intervient là où le code généré seul laisse des angles morts, du debug au socle technique.",
  },
  {
    q: "Vous créez aussi des agents IA ?",
    a: "Je crée des agents IA sur mesure pour prendre en charge des tâches répétitives. L'objectif est simple : automatiser ce qui vous ralentit et rendre vos process plus fluides. Je les adapte à votre stack et à vos usages, pas à un modèle générique.",
  },
];

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Faq() {
  return (
    <>
      {/* <!-- got_the_ref:faq --> */}
      <section className="mx-auto my-14 w-full max-w-5xl px-5">
        <div className="grid gap-8 md:grid-cols-[5fr_7fr] md:gap-12">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
              Questions fréquentes
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Vous avez une question ? Nous y avons sûrement déjà répondu.
            </h2>
            <span
              aria-hidden="true"
              className="mt-4 block h-[3px] w-11 rounded-full bg-accent"
            />
          </div>
          <div className="border-t border-border">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-4 font-semibold group-open:text-accent [&::-webkit-details-marker]:hidden">
                  <span className="flex-1">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex size-6 flex-none items-center justify-center rounded-full bg-accent/10 text-lg leading-none text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-4 pr-10 text-[15px] leading-relaxed opacity-80">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
      {/* <!-- /got_the_ref:faq --> */}
    </>
  );
}
