import { Avatar } from "@heroui/react";

export default function Hero() {
  return (
    <>
      <div className="w-fit p-4 rounded-full border border-neutral mx-auto mt-6 md:mt-20">
        <div className="w-fit border-2 border-neutral rounded-full p-1">
          <Avatar className="size-24 md:size-30">
            <Avatar.Image alt="Titouan Hirsch" src="titou.jpeg" />
          </Avatar>
        </div>
      </div>
      <div className="space-y-4 md:space-y-8">
        <div className="mb-10 mt-6 md:mt-20 mx-auto relative">
          <h1 className="font-semibold text-2xl md:text-4xl leading-tight tracking-tighter text-base-content text-center text-muted opacity-98 before:absolute before:w-full before:border before:border-neutral before:inset-x-0 before:top-[-8] after:absolute after:w-full after:border after:border-neutral after:inset-x-0 after:bottom-[-10]">
            Bonjour ! Je suis Titouan/@bobodigital
            <br />
            Je Code ce que l&apos;IA ne sait pas Coder...
          </h1>
        </div>
        <p className="text-sm md:text-base w-full text-center text-foreground mx-auto leading-8 text-balance max-w-3xl">
          Du MVP au réseau social qui peut tenir un gros trafic. De
          l&apos;application mobile, jusqu&apos;au site internet, je donne vie à
          vos idées avec 2 ans d&apos;expertises
        </p>
      </div>
    </>
  );
}
