import { LegalLayout, H2, P, UL, Updated } from "./LegalLayout";

export default function PrivacidadePage() {
  return (
    <LegalLayout title="Política de Privacidade">
      <Updated date="Última atualização: maio de 2025" />
      <H2>1. Quem somos</H2>
      <P>O responsável pelo tratamento dos seus dados pessoais é:</P>
      <P><strong>Dentassiste Unipessoal Lda.</strong><br />NIF: 506 272 338<br />Braga / Barcelos, Portugal<br />Telefone: 938 936 586</P>
      <P>Pode contactar-nos diretamente pelo telefone indicado ou através do formulário disponível no site.</P>

      <H2>2. Que dados recolhemos</H2>
      <P>Quando preenche o formulário de pedido de recolha, os dados recolhidos são:</P>
      <UL items={["Nome e nome da clínica ou entidade", "Número de telefone", "Endereço de e-mail", "Morada completa (para agendamento da recolha)", "Observações que opte por partilhar voluntariamente"]} />
      <P>Se entrar em contacto por telefone, apenas registamos os dados necessários para dar seguimento ao pedido.</P>

      <H2>3. Para que utilizamos os seus dados</H2>
      <P>Os dados recolhidos são utilizados exclusivamente para:</P>
      <UL items={["Responder ao seu pedido e confirmar os detalhes da recolha", "Analisar e orçamentar o serviço solicitado", "Gerir a reparação e coordenar o transporte dos equipamentos", "Emitir fatura e cumprir obrigações legais e fiscais"]} />
      <P>Não utilizamos os seus dados para envio de newsletters, campanhas de marketing automático ou comunicações não solicitadas.</P>

      <H2>4. Base legal do tratamento</H2>
      <P>O tratamento dos seus dados assenta nas seguintes bases legais, nos termos do Regulamento (UE) 2016/679 (RGPD):</P>
      <UL items={["Execução de um contrato ou diligências pré-contratuais — para responder ao pedido e prestar o serviço", "Cumprimento de obrigação legal — para efeitos de faturação e obrigações fiscais"]} />

      <H2>5. Partilha com terceiros</H2>
      <P>Os seus dados não são vendidos nem cedidos a terceiros para fins comerciais. Podem ser partilhados de forma limitada e apenas quando necessário com:</P>
      <UL items={["Serviço de contabilidade, para efeitos de faturação e obrigações fiscais", "Transportadora ou serviço de recolha, para coordenação da logística"]} />
      <P>Estes parceiros tratam os dados exclusivamente para a finalidade indicada e estão sujeitos a obrigações de confidencialidade.</P>

      <H2>6. Prazo de conservação</H2>
      <P>Os dados são conservados pelo tempo necessário para a prestação do serviço e, no mínimo, pelo prazo exigido por lei para fins fiscais e contabilísticos (habitualmente 10 anos). Após esse período, os dados são eliminados ou anonimizados.</P>

      <H2>7. Os seus direitos</H2>
      <P>Tem o direito de, a qualquer momento:</P>
      <UL items={["Aceder aos dados pessoais que temos sobre si", "Solicitar a correção de dados incorretos", "Solicitar o apagamento dos seus dados (quando legalmente possível)", "Opor-se ao tratamento ou solicitar a sua limitação", "Apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD) em www.cnpd.pt"]} />
      <P>Para exercer os seus direitos, pode contactar-nos pelo telefone 938 936 586.</P>

      <H2>8. Segurança</H2>
      <P>Os dados recolhidos são armazenados e tratados em sistemas que cumprem os requisitos de segurança exigidos pelo RGPD. Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda ou destruição.</P>
    </LegalLayout>
  );
}
