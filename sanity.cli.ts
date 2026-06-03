import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "epe7jy8x",
    dataset: "production",
  },
  // Studio autónomo (Sanity-hosted). `sanity deploy` publica em
  // https://agencia25horas.sanity.studio — onde o cliente edita o conteúdo.
  // Nota: o hostname TEM de começar por letra (não dígito), por isso é
  // "agencia25horas" e não "25horas". Alterar aqui muda o subdomínio.
  studioHost: "agencia25horas",
  // appId fixado para `sanity deploy` não pedir a app interativamente.
  deployment: {
    appId: "seoe372xgy3jeznz3p8p5xsk",
  },
});
