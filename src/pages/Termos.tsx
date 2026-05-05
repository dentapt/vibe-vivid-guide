import { LegalLayout, H2, P, Note, Updated } from "@/components/dentassiste/legal/LegalLayout";

export default function TermosPage() {
  return (
    <LegalLayout title="Termos e Condições">
      <Updated date="Última atualização: maio de 2025" />
      <H2>1. Identificação da empresa</H2>
      <P><strong>Dentassiste Unipessoal Lda.</strong><br />NIF: 506 272 338 · Braga / Barcelos, Portugal<br />Telefone: 938 936 586</P>

      <H2>2. Âmbito do serviço</H2>
      <P>A Dentassiste presta serviços de reparação de instrumentos rotatórios dentários, nomeadamente turbinas, contra-ângulos, micromotores e peças de mão retas, de todas as marcas.</P>
      <P>O serviço inclui, sempre que aplicável, a recolha do equipamento nas instalações do cliente e a entrega após a intervenção.</P>

      <H2>3. Pedido de serviço e recolha</H2>
      <P>O pedido pode ser efetuado através do formulário disponível no site ou por contacto telefónico. Após receção do pedido, entraremos em contacto para confirmar os detalhes e agendar a recolha.</P>
      <P>Nas reparações de turbinas, a recolha e a entrega estão incluídas no preço. Para outros equipamentos, o transporte é acordado caso a caso.</P>
      <P>O cliente é responsável por embalar o equipamento de forma adequada para o transporte, exceto se acordado de outra forma.</P>

      <H2>4. Análise técnica e orçamento</H2>
      <P>Após receção do equipamento, é realizada uma análise técnica. Quando o valor da intervenção não está fixado previamente, o cliente receberá um orçamento antes de qualquer trabalho ser iniciado.</P>
      <P>A reparação só é realizada após confirmação expressa do cliente. Se o orçamento não for aceite, o equipamento é devolvido sem custos de análise, salvo acordo em contrário.</P>

      <H2>5. Casos não reparáveis</H2>
      <P>Em alguns casos, o equipamento pode não ter solução técnica viável, nomeadamente por falta de peças, dano irreversível ou custo de reparação desproporcionado. Nestas situações, o cliente é informado e pode solicitar a devolução do equipamento no estado em que se encontra.</P>

      <H2>6. Garantia</H2>
      <P>As reparações de turbinas têm uma garantia de 12 meses a contar da data de entrega, cobrindo o trabalho realizado e os componentes substituídos.</P>
      <P>Para os restantes equipamentos, a garantia é definida e comunicada no momento do orçamento.</P>
      <P>A garantia não cobre danos causados por utilização indevida, manutenção inadequada ou acidentes posteriores à entrega.</P>

      <H2>7. Transporte e responsabilidade</H2>
      <P>A Dentassiste assegura a coordenação da recolha e da entrega. Em caso de extravio ou dano durante o transporte sob responsabilidade da Dentassiste, o cliente será informado e será encontrada uma solução adequada.</P>
      <P>O cliente assume a responsabilidade pelos equipamentos enquanto estes estão nas suas instalações, incluindo na fase de embalagem para envio.</P>

      <H2>8. Limitação de responsabilidade</H2>
      <P>A Dentassiste não se responsabiliza por danos indiretos ou perdas de rendimento resultantes da indisponibilidade temporária do equipamento durante o período de reparação.</P>
      <P>A responsabilidade total da Dentassiste perante o cliente, em qualquer circunstância, não excederá o valor cobrado pelo serviço em causa.</P>

      <H2>9. Alterações ao site e conteúdos</H2>
      <P>A Dentassiste reserva-se o direito de atualizar, modificar ou remover qualquer conteúdo do site, incluindo preços e descrições de serviços, sem aviso prévio. As condições aplicáveis são as vigentes no momento do pedido.</P>

      <H2>10. Legislação aplicável</H2>
      <P>Os presentes Termos e Condições são regidos pela lei portuguesa. Em caso de litígio, é competente o tribunal da comarca da sede da empresa, sem prejuízo do recurso a meios alternativos de resolução de conflitos.</P>
      <Note>Para resolução de litígios de consumo, pode recorrer ao sistema de mediação disponível em www.consumidor.gov.pt.</Note>
    </LegalLayout>
  );
}
