import { LegalLayout, H2, P } from "@/components/dentassiste/legal/LegalLayout";

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso Legal">
      <H2>Identificação da empresa</H2>
      <P><strong>Dentassiste Unipessoal Lda.</strong><br />NIF: 506 272 338<br />Sede: Braga / Barcelos, Portugal<br />Telefone: 938 936 586<br />Horário: segunda a sexta, 09h00 – 18h00</P>

      <H2>Atividade</H2>
      <P>A Dentassiste presta serviços de reparação de instrumentos rotatórios dentários — turbinas, contra-ângulos, micromotores e peças de mão retas — destinados a profissionais e clínicas do setor da medicina dentária.</P>

      <H2>Responsabilidade sobre os conteúdos do site</H2>
      <P>A Dentassiste assegura que as informações publicadas neste site são verdadeiras e atualizadas na medida do razoavelmente possível. No entanto, os conteúdos têm caráter meramente informativo e não constituem qualquer compromisso contratual.</P>
      <P>A Dentassiste reserva-se o direito de atualizar ou corrigir os conteúdos do site a qualquer momento, sem aviso prévio. Em caso de dúvida, sugerimos que nos contacte diretamente para confirmação.</P>

      <H2>Propriedade intelectual</H2>
      <P>Todos os conteúdos presentes neste site — textos, imagens, logótipo e estrutura — são propriedade da Dentassiste ou utilizados com autorização. A sua reprodução, total ou parcial, sem autorização expressa é proibida.</P>

      <H2 id="marcas">Marcas comerciais</H2>
      <P>As marcas e nomes comerciais referidos neste site (incluindo KaVo, NSK, W&amp;H, Bien-Air, Sirona, MK-dent, Coxo e Soco) pertencem aos respetivos titulares e são mencionados apenas para identificar os equipamentos que reparamos.</P>
      <P>A Dentassiste é uma empresa independente de assistência técnica. Não é representante, distribuidor oficial nem parceiro destas marcas, e não tem qualquer vínculo com os respetivos fabricantes.</P>
      <P>Se for titular de uma destas marcas e pretender que o seu nome seja retirado do site, contacte-nos através de <a href="mailto:geral@dentassiste.com" className="font-semibold text-accent-dark underline-offset-2 hover:underline">geral@dentassiste.com</a> e procederemos à sua remoção.</P>

      <H2>Links externos</H2>
      <P>Este site pode conter ligações para sites de terceiros. A Dentassiste não é responsável pelos conteúdos, políticas ou práticas desses sites.</P>

      <H2>Livro de Reclamações</H2>
      <P>Nos termos da legislação em vigor, pode apresentar reclamação através do Livro de Reclamações Eletrónico em <strong>www.livroreclamacoes.pt</strong>.</P>
    </LegalLayout>
  );
}
