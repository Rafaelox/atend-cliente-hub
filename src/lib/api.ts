// API Configuration and Client
class ApiClient {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor() {
    // Configuração será carregada do localStorage para manter segurança
    this.baseUrl = this.getConfig('apiBaseUrl') || '';
    this.apiKey = this.getConfig('apiKey') || '';
    this.headers = {
      'Content-Type': 'application/json',
      ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
    };
  }

  private getConfig(key: string): string {
    return localStorage.getItem(`agenda_oxum_${key}`) || '';
  }

  public setConfig(baseUrl: string, apiKey: string) {
    localStorage.setItem('agenda_oxum_apiBaseUrl', baseUrl);
    localStorage.setItem('agenda_oxum_apiKey', apiKey);
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
  }

  public isConfigured(): boolean {
    return !!(this.baseUrl && this.apiKey);
  }

  public clearConfig() {
    localStorage.removeItem('agenda_oxum_apiBaseUrl');
    localStorage.removeItem('agenda_oxum_apiKey');
    this.baseUrl = '';
    this.apiKey = '';
    this.headers = { 'Content-Type': 'application/json' };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.baseUrl) {
      throw new Error('API não configurada. Configure a URL base e chave de API primeiro.');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Métodos para diferentes recursos
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Métodos específicos da aplicação
  async getClientes() {
    return this.get('/clientes');
  }

  async createCliente(cliente: unknown) {
    return this.post('/clientes', cliente);
  }

  async updateCliente(id: string, cliente: unknown) {
    return this.put(`/clientes/${id}`, cliente);
  }

  async deleteCliente(id: string) {
    return this.delete(`/clientes/${id}`);
  }

  async getAgendamentos() {
    return this.get('/agendamentos');
  }

  async createAgendamento(agendamento: unknown) {
    return this.post('/agendamentos', agendamento);
  }

  async updateAgendamento(id: string, agendamento: unknown) {
    return this.put(`/agendamentos/${id}`, agendamento);
  }

  async deleteAgendamento(id: string) {
    return this.delete(`/agendamentos/${id}`);
  }

  async login(credentials: { username: string; password: string }) {
    return this.post('/auth/login', credentials);
  }

  async logout() {
    return this.post('/auth/logout', {});
  }
}

export const apiClient = new ApiClient();
export default apiClient;