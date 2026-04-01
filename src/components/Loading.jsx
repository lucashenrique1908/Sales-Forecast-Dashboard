import { FORECAST_UI_COPY } from '../constants/forecast'
import LoadingState from './ui/LoadingState'

function Loading() {
  return (
    <LoadingState
      compact
      title={FORECAST_UI_COPY.appLoadingTitle}
      description={FORECAST_UI_COPY.appLoadingDescription}
    />
  )
}

export default Loading
