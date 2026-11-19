import type { Metadata } from "next";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: { absolute: "Développeur application mobile | Titouan Hirsch" },
  description:
    "Applications mobiles en MVP, refonte d'apps générées par IA, architecture qui tient la charge et modèles IA privés sur vos machines ou serveur.",
  alternates: { canonical: "/developpeur-application-mobile" },
};

const linkClass = "font-semibold underline underline-offset-4";

const cards = [
  {
    title: "Lancement MVP",
    text: "Développement express pour tester une idée et sortir vite une première version.",
  },
  {
    title: "Refonte et debug",
    text: "Je restructure une app générée par IA quand elle bugge ou manque de solidité.",
  },
  {
    title: "Agents IA sur-mesure",
    text: "Des agents intelligents pour prendre en charge les tâches répétitives.",
  },
  {
    title: "App scalable",
    text: "Une architecture pensée pour supporter des centaines de milliers d'utilisateurs.",
  },
];

const faq = [
  {
    q: "Que faites-vous sur une application mobile ?",
    a: "Je développe des MVP, je reprends les apps codées par l'IA et je les rends fiables et maintenables. Je peux aussi construire une architecture capable de supporter des centaines de milliers d'utilisateurs.",
  },
  {
    q: "Travaillez-vous avec l'IA privée ?",
    a: "Oui, j'installe des modèles open source sur vos machines ou sur un serveur que vous possédez. Je forme aussi vos équipes à s'en servir au quotidien.",
  },
  {
    q: "Pouvez-vous reprendre une app cassée ?",
    a: "Oui, je restructure une application générée par l'IA quand elle bugge ou manque de solidité. L'objectif est d'en faire un produit fiable et maintenable.",
  },
];

export default function DeveloppeurApplicationMobile() {
  return (
    <PageWrapper>
      <main className="mx-auto w-full max-w-4xl px-4 py-16">
        <header className="mb-10">
          <p className="mb-3 text-sm opacity-65">
            <Link href="/">Accueil</Link> › Développeur application mobile
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Développeur application mobile
          </h1>
        </header>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">
            Développeur application mobile
          </h2>
          <p className="text-lg leading-relaxed">
            Titouan Hirsch / @bobodigital crée des applications mobiles, les
            reprend quand elles ont été codées par l'IA, et les fait grandir
            sans casser la base. Il travaille aussi avec des MVP rapides, des
            architectures solides et des modèles IA privés.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Du MVP à l'app solide</h2>
          <p className="text-lg leading-relaxed">
            Je pars souvent d'une idée à valider vite. Le lancement MVP sert à
            tester le marché et à convaincre les premiers utilisateurs avec un
            développement express, max. 2 mois. Quand il faut aller plus loin,
            je structure l'application pour qu'elle reste maintenable. Si le
            besoin dépasse la simple app mobile, je peux aussi intervenir sur
            une{" "}
            <Link href="/application-sur-mesure" className={linkClass}>
              application sur mesure
            </Link>{" "}
            ou une{" "}
            <Link href="/agence-developpement-web" className={linkClass}>
              agence développement web
            </Link>{" "}
            quand le projet demande une équipe plus large.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Quatre façons d'avancer</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border p-5">
                <h3 className="mb-1.5 text-lg font-bold">{c.title}</h3>
                <p className="opacity-80">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-lg leading-relaxed">
            <Link href="/creation-agent-ia" className={linkClass}>
              création agent ia
            </Link>{" "}
            ·{" "}
            <Link href="/automatisation-entreprise" className={linkClass}>
              automatisation entreprise
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">L'IA, mais privée</h2>
          <p className="text-lg leading-relaxed">
            Je crée ce que l'IA ne peut pas coder seule : une vision produit,
            une structure fiable, et le cadre pour faire tourner le projet au
            quotidien. J'installe aussi des modèles open source sur vos machines
            ou sur un serveur que vous possédez, puis je forme vos équipes à
            s'en servir. Quand il faut garder les données à l'intérieur, le
            modèle IA privé est la bonne piste.{" "}
            <Link href="/creation-agent-ia" className={linkClass}>
              création agent ia
            </Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold">Questions de clients</h2>
          <div className="grid gap-3">
            {faq.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border p-5">
                <h3 className="mb-1.5 text-lg font-bold">{f.q}</h3>
                <p className="opacity-80">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <aside className="mb-6 rounded-2xl border border-border p-6">
            <p className="mb-2 text-xl font-bold">
              Lancez votre MVP mobile en 2 mois
            </p>
            <p className="leading-relaxed">
              Vous cherchez un développeur d'application mobile pour concrétiser
              votre idée ? Le{" "}
              <Link href="/" className={linkClass}>
                Lancement MVP
              </Link>{" "}
              vous permet de développer votre produit en express, en deux mois
              maximum, pour tester votre marché et convaincre vos premiers
              utilisateurs. Cette offre inclut la conception et le
              développement de votre MVP, avec un accompagnement pour valider
              votre concept. Elle s'adresse aux porteurs de projet pressés de
              lancer leur application mobile.
            </p>
          </aside>

          <div className="rounded-3xl bg-[#161616] p-8 text-white">
            <h2 className="mb-4 text-2xl font-bold">Parlons de l'app</h2>
            <p className="text-lg leading-relaxed">
              Si le projet doit sortir vite, tenir la charge ou repartir d'une
              base instable, je prends le sujet en main. Le plus simple est de
              partir d'une{" "}
              <Link
                href="/application-sur-mesure"
                className="font-semibold text-white underline underline-offset-4"
              >
                application sur mesure
              </Link>{" "}
              quand le besoin est clair.
            </p>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
