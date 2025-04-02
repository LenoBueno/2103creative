
import { NFe } from '@/types/nfe';

// Esta classe é só um mock para demonstração
// Em produção, ela se comunicaria com o backend real
class NFeService {
  async emitirNFe(nfe: Partial<NFe>): Promise<{
    success: boolean;
    message: string;
    data?: {
      chaveAcesso: string;
      numeroProtocolo: string;
      status: string;
      pdf?: string;
    }
  }> {
    // Simular uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulação de sucesso na emissão
        resolve({
          success: true,
          message: "NF-e autorizada com sucesso",
          data: {
            chaveAcesso: '43' + new Date().getFullYear() + new Date().getMonth() + '12345678000199550010000001029',
            numeroProtocolo: '123456789012345',
            status: 'autorizada',
            pdf: 'data:pdf;base64,abc123'
          }
        });
      }, 2000);
    });
  }

  async consultarNFe(chaveAcesso: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      status: string;
      dataAutorizacao?: string;
      dataCancelamento?: string;
      motivoCancelamento?: string;
    }
  }> {
    // Simular uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "NF-e encontrada",
          data: {
            status: 'autorizada',
            dataAutorizacao: new Date().toISOString()
          }
        });
      }, 1000);
    });
  }

  async downloadDANFE(chaveAcesso: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      pdf: string;
    }
  }> {
    // Simular uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "DANFE gerado com sucesso",
          data: {
            pdf: 'data:pdf;base64,abc123'
          }
        });
      }, 1500);
    });
  }

  async cancelarNFe(chaveAcesso: string, motivo: string): Promise<{
    success: boolean;
    message: string;
    data?: {
      protocoloCancelamento: string;
    }
  }> {
    // Simular uma chamada à API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "NF-e cancelada com sucesso",
          data: {
            protocoloCancelamento: '987654321098765'
          }
        });
      }, 2000);
    });
  }
}

export default new NFeService();
