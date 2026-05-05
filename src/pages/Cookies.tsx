import { LegalLayout, H2, P, UL, Updated } from "@/components/dentassiste/legal/LegalLayout";

export default function CookiesPage() {
  return (
    <LegalLayout title="Política de Cookies">
      <Updated date="Última atualização: maio de 2025" />
      <H2>O que são cookies</H2>
      <P>Os cookies são pequenos ficheiros de texto guardados no seu navegador quando visita um site. Servem para que o site funcione corretamente e, em alguns casos, para recolher informação sobre a forma como é utilizado.</P>

      <H2>Cookies que utilizamos</H2>
      <P>Este site utiliza apenas cookies essenciais ao seu funcionamento:</P>
      <UL items={[
        "Cookies técnicos e funcionais — necessários para o correto funcionamento do site. Não recolhem dados pessoais identificáveis.",
        "Cookies de análise (analytics) — podem ser utilizados para compreender de forma anónima como os visitantes utilizam o site, com o objetivo de melhorar a experiência. Não são usados para publicidade.",
      ]} />
      <P>Não utilizamos cookies de publicidade, rastreamento entre sites ou partilha de dados com redes sociais.</P>

      <H2>Como gerir os cookies</H2>
      <P>Pode controlar e eliminar cookies diretamente no seu navegador:</P>
      <UL items={[
        "Google Chrome: Definições → Privacidade e segurança → Cookies",
        "Mozilla Firefox: Opções → Privacidade e segurança",
        "Safari: Preferências → Privacidade",
      ]} />
      <P>Tenha em atenção que bloquear todos os cookies pode afetar o funcionamento de algumas funcionalidades do site.</P>

      <H2>Consentimento</H2>
      <P>Ao continuar a navegar neste site sem alterar as definições do seu navegador, aceita o uso dos cookies descritos nesta política.</P>
    </LegalLayout>
  );
}
