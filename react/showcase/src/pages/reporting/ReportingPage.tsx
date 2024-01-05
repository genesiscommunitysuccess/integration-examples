import { useEffect, useState } from 'react'

const ReportingPage = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // @todo - this is a workaround for foundation-reporting which includes path '' for reporting in config:
    // https://github.com/genesislcap/foundation-ui/blob/62024ec5e139ca25c5d65e11798e009a1e86074d/packages/foundation/foundation-mf/foundation-reporting/src/routes/config.ts#L43C13-L43C13
    // without that FastRouter from foundation-reporting will call falback and redirect to not found page
    history.pushState(null, '', '/')
    setReady(true)
    setTimeout(() => {
      history.pushState(null, '', '/reporting')
    }, 1000)
  }, [])

  return (
    <div className="reporting-page">
      {ready && <foundation-reporting></foundation-reporting>}
    </div>
  )
}

export default ReportingPage
