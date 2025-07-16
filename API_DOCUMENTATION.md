# Documentação da API - Agenda Oxum

Este documento descreve os endpoints e padrões de API necessários para integrar com o sistema Agenda Oxum.

## Configuração Base

O sistema espera uma API REST padrão com os seguintes requisitos:

### Autenticação
- **Método**: Bearer Token
- **Header**: `Authorization: Bearer {sua-chave-api}`
- **Formato**: JWT ou API Key personalizada

### Content-Type
- **Request**: `application/json`
- **Response**: `application/json`

### Base URL
Configure a URL base da sua API na interface de configurações do sistema.

## Endpoints Obrigatórios

### 1. Health Check
**GET** `/health`

Endpoint para verificar se a API está funcionando.

**Response 200:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### 2. Autenticação

#### Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response 200:**
```json
{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string"
  },
  "expiresAt": "2024-01-15T10:30:00Z"
}
```

#### Logout
**POST** `/auth/logout`

**Response 200:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### 3. Clientes

#### Listar Clientes
**GET** `/clientes`

**Query Parameters:**
- `page`: number (opcional, padrão: 1)
- `limit`: number (opcional, padrão: 10)
- `search`: string (opcional)

**Response 200:**
```json
{
  "data": [
    {
      "id": "string",
      "nome": "string",
      "email": "string",
      "telefone": "string",
      "cpf": "string",
      "data_nascimento": "1990-01-15",
      "endereco": {
        "rua": "string",
        "numero": "string",
        "bairro": "string",
        "cidade": "string",
        "cep": "string"
      },
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

#### Criar Cliente
**POST** `/clientes`

**Request Body:**
```json
{
  "nome": "string",
  "email": "string",
  "telefone": "string",
  "cpf": "string",
  "data_nascimento": "1990-01-15",
  "endereco": {
    "rua": "string",
    "numero": "string",
    "bairro": "string",
    "cidade": "string",
    "cep": "string"
  }
}
```

**Response 201:**
```json
{
  "id": "string",
  "nome": "string",
  "email": "string",
  // ... outros campos
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### Atualizar Cliente
**PUT** `/clientes/{id}`

**Request Body:** Mesmo formato do POST

**Response 200:** Mesmo formato do POST com updated_at atualizado

#### Deletar Cliente
**DELETE** `/clientes/{id}`

**Response 204:** Sem conteúdo

### 4. Agendamentos

#### Listar Agendamentos
**GET** `/agendamentos`

**Query Parameters:**
- `page`: number (opcional)
- `limit`: number (opcional)
- `data_inicio`: string (formato: YYYY-MM-DD)
- `data_fim`: string (formato: YYYY-MM-DD)
- `cliente_id`: string (opcional)

**Response 200:**
```json
{
  "data": [
    {
      "id": "string",
      "cliente_id": "string",
      "cliente": {
        "id": "string",
        "nome": "string",
        "telefone": "string"
      },
      "data_agendamento": "2024-01-15T14:30:00Z",
      "servico": "string",
      "status": "agendado|confirmado|em_andamento|concluido|cancelado",
      "observacoes": "string",
      "valor": 150.00,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### Criar Agendamento
**POST** `/agendamentos`

**Request Body:**
```json
{
  "cliente_id": "string",
  "data_agendamento": "2024-01-15T14:30:00Z",
  "servico": "string",
  "observacoes": "string",
  "valor": 150.00
}
```

#### Atualizar Agendamento
**PUT** `/agendamentos/{id}`

**Request Body:** Mesmo formato do POST + campo status

#### Deletar Agendamento
**DELETE** `/agendamentos/{id}`

**Response 204:** Sem conteúdo

## Códigos de Status HTTP

### Sucesso
- **200**: OK - Operação realizada com sucesso
- **201**: Created - Recurso criado com sucesso
- **204**: No Content - Operação realizada sem retorno

### Erros do Cliente
- **400**: Bad Request - Dados inválidos
- **401**: Unauthorized - Token inválido ou expirado
- **403**: Forbidden - Sem permissão para o recurso
- **404**: Not Found - Recurso não encontrado
- **409**: Conflict - Conflito (ex: CPF já cadastrado)

### Erros do Servidor
- **500**: Internal Server Error - Erro interno do servidor
- **503**: Service Unavailable - Serviço indisponível

## Formato de Erros

Todas as respostas de erro devem seguir o formato:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dados inválidos fornecidos",
    "details": [
      {
        "field": "email",
        "message": "Email é obrigatório"
      }
    ]
  }
}
```

## Segurança

### Headers de Segurança Recomendados
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

### Rate Limiting
Recomenda-se implementar rate limiting:
- **Autenticação**: 5 tentativas por minuto por IP
- **API Geral**: 100 requests por minuto por token

### CORS
Configure CORS adequadamente para permitir apenas domínios autorizados.

## Exemplos de Implementação

### Node.js/Express
```javascript
app.use('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});
```

### Python/FastAPI
```python
@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    }
```

### PHP/Laravel
```php
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString()
    ]);
});
```

## Testes da API

### Ferramenta Recomendada: Postman/Insomnia

### Sequência de Testes
1. **Health Check**: Verificar se API responde
2. **Autenticação**: Testar login e obter token
3. **CRUD Clientes**: Criar, listar, atualizar, deletar
4. **CRUD Agendamentos**: Operações completas

### Dados de Teste
```json
{
  "cliente_teste": {
    "nome": "João Silva",
    "email": "joao@teste.com",
    "telefone": "(11) 99999-9999",
    "cpf": "123.456.789-00"
  }
}
```

## Monitoramento

### Logs Recomendados
- Todas as requisições com timestamp
- Erros com stack trace
- Tentativas de autenticação
- Operações CRUD com user_id

### Métricas
- Tempo de resposta por endpoint
- Taxa de sucesso/erro
- Número de requisições por minuto
- Uso de recursos (CPU, memória)

## Suporte

Para dúvidas sobre a implementação da API:

1. Verifique os logs do sistema Agenda Oxum
2. Teste os endpoints com ferramentas como Postman
3. Valide o formato JSON das respostas
4. Confirme a configuração de CORS e headers

## Changelog

### v1.0.0 (Inicial)
- Definição dos endpoints básicos
- Padrões de autenticação
- Formato de dados para clientes e agendamentos