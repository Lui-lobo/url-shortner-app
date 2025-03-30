# URL Shortener API

Uma API para encurtamento de URLs, permitindo que usuários gerem links curtos a partir de URLs longas. Usuários autenticados podem gerenciar seus links encurtados, acompanhar estatísticas de acessos e realizar operações como edição e exclusão lógica dos registros.

---

## 📋 Índice

- [🔧 Recursos](#recursos)
- [👷 Arquitetura e Diagramas](#arquitetura-e-diagramas)
- [🖥️ Como rodar o projeto](#como-rodar-o-projeto)
- [🧪 Como rodar os testes](#como-rodar-os-testes)
- [📄 Documentacação da Api](#documentacao)
- [🧭 Endpoints](#endpoints)

---

## 🔧 Recursos

A URL Shortener API fornece uma série de funcionalidades para o gerenciamento de URLs encurtadas, garantindo segurança e rastreabilidade. Abaixo estão os principais recursos oferecidos:

### 🏷️ Encurtamento de URLs
- Permite a criação de URLs curtas a partir de links longos.
- Qualquer usuário pode encurtar uma URL, mas usuários autenticados terão suas URLs vinculadas às suas contas.

### 🔍 Redirecionamento e Contagem de Cliques
- Sempre que uma URL encurtada for acessada, a API redireciona o usuário para a URL original.
- O número de acessos de cada URL é registrado para estatísticas.

### 👤 Autenticação e Gestão de Usuários
- Registro e login de usuários.
- URLs criadas por usuários autenticados são associadas às suas contas.
- Apenas o proprietário de uma URL pode editá-la ou excluí-la.

### 📋 Gerenciamento de URLs
- Listagem de URLs encurtadas associadas ao usuário autenticado.
- Atualização de uma URL encurtada.
- Exclusão lógica de URLs (soft delete), garantindo que não possam mais ser acessadas.

### 📊 Estatísticas
- Exibição da quantidade de cliques em cada URL encurtada.

### 🔒 Segurança
- Validação de autenticação para operações restritas.
- Proteção contra duplicação de URLs dentro da conta do usuário.
