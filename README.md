# Sales Forecast Dashboard

Frontend React focado em visualizacao de forecast comercial com arquitetura escalavel, estados globais bem definidos e camada de dados desacoplada da UI.

## Visao Geral

O projeto simula um dashboard usado por times comerciais para acompanhar receita, crescimento e volume de vendas. A aplicacao foi organizada para refletir um padrao de mercado:

- `services`: acesso HTTP e transporte bruto
- `hooks`: orquestracao de fetch e estado assíncrono
- `selectors`: derivacao reutilizavel de view models
- `utils/forecast`: normalizacao, filtros, KPIs, charts e helpers
- `contexts`: compartilhamento global separado entre dados e estado visual
- `components`: renderizacao e composicao visual

Fluxo principal de dados:

`forecastService -> useForecastData -> DataContext -> DashboardPage -> componentes de UI`

## Arquitetura

### Camada de dados

- [src/services/forecastService.js](src/services/forecastService.js): busca os dados brutos da API ou fallback local.
- [src/hooks/useForecastData.js](src/hooks/useForecastData.js): controla `loading`, `error`, `filters`, `viewOptions` e `refetch`.
- [src/selectors/forecastSelectors.js](src/selectors/forecastSelectors.js): transforma estado bruto em um modelo pronto para a tela.

### Dominio de forecast

- [src/utils/forecast/normalizeForecast.js](src/utils/forecast/normalizeForecast.js): normalizacao dos dados da API.
- [src/utils/forecast/forecastKpis.js](src/utils/forecast/forecastKpis.js): KPIs, cards e highlights.
- [src/utils/forecast/forecastCharts.js](src/utils/forecast/forecastCharts.js): series para os graficos.
- [src/utils/forecast/forecastFilters.js](src/utils/forecast/forecastFilters.js): filtros, ordenacao, Top N e feedback dos filtros.
- [src/utils/forecast/forecastHelpers.js](src/utils/forecast/forecastHelpers.js): formatacao e helpers reutilizaveis.
- [src/constants/forecast.js](src/constants/forecast.js): labels, configuracoes e opcoes centralizadas.

### Camada visual

- [src/contexts/DataContext.jsx](src/contexts/DataContext.jsx): compartilha dados derivados e estado assíncrono.
- [src/contexts/UIContext.jsx](src/contexts/UIContext.jsx): compartilha apenas estado visual da shell.
- [src/components/ui](src/components/ui): estados reutilizaveis de loading, error e empty.
- [src/components/dashboard](src/components/dashboard): composicao da pagina do dashboard.
- [src/components/charts](src/components/charts): wrappers reutilizaveis para os graficos Recharts.

## Decisoes Tecnicas

- `selectors` concentram derivados reutilizaveis para evitar logica em componentes.
- `useMemo` e `useCallback` foram aplicados nas fronteiras de derivacao e handlers para reduzir re-render desnecessario.
- A UI recebe apenas valores prontos, como `revenueFormatted`, `growthFormatted` e `filter feedback`.
- Estados de `loading`, `error` e `empty` foram padronizados em componentes reutilizaveis.
- Os graficos consomem series prontas do dominio de forecast, sem transformacoes locais.

## Como Rodar

### Requisitos

- Node.js 20+
- npm 10+

### Instalar dependencias

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

### Build de producao

```bash
npm run build
```

### Testes

```bash
npm run test
```

### Lint

```bash
npm run lint
```

## Testes Implementados

Cobertura inicial voltada para as partes mais criticas da arquitetura:

- hook `useForecastData`
- normalizacao e KPIs de forecast
- selectors de derivacao
- componentes criticos de filtros e tratamento de erro

## Melhorias Futuras

- persistencia de filtros na URL
- dark mode e temas por empresa
- cache de requests com React Query ou SWR
- testes E2E com Playwright
- internacionalizacao completa

## Resultado

O projeto esta pronto para portfolio e entrevistas tecnicas com uma base modular, testavel e alinhada com boas praticas reais de frontend.
