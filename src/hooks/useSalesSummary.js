// hooks: encapsula logica reutilizavel de estado e comportamento para manter paginas e componentes mais limpos.
function useSalesSummary(getSummary) {
  const data = getSummary()

  return {
    cards: data.cards,
    statusLabel: data.status,
  }
}

export default useSalesSummary
