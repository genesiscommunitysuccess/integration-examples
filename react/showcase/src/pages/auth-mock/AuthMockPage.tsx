import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AuthMockPage.module.css'
import stylesForLogin from './AuthMockLoginCss'
import { configure } from '@genesislcap/foundation-login'
import { connectService } from '../../services/connect.service'

const MOCK_SUCCESSFUL_LOGIN_PATH = '/protected'

const AuthMockPage: React.FC = () => {
  const mainContainer = useRef<HTMLElement>(null)
  const foundationLogin = useRef<HTMLElement>(null)
  const [isLoginComponentDefined, setIsLoginComponentDefined] = useState(false)
  const currentPath = window.location.pathname

  useEffect(() => {
    if (mainContainer?.current) {
      const container = connectService.getContainer()
      configure(container, {
        background: stylesForLogin,
        showConnectionIndicator: true,
        hostPath: 'auth',
        defaultRedirectUrl: MOCK_SUCCESSFUL_LOGIN_PATH,
      })

      setIsLoginComponentDefined(true)
    }
  }, [])

  const navigate = useNavigate()

  useEffect(() => {
    //@todo workaournd for foundation-login redirect
    const intervalId = setInterval(() => {
      const newPath = window.location.pathname
      if (newPath !== currentPath) {
        navigate(newPath)
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [currentPath, navigate])
  return (
    <section ref={mainContainer} className={styles.AuthMockPage}>
      {isLoginComponentDefined && <foundation-login ref={foundationLogin} />}
    </section>
  )
}

export default AuthMockPage
