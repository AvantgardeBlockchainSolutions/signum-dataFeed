import React, { useContext } from 'react'
//Assets
import { ReactComponent as Tellor } from '../../assets/signum_logo.svg'
import { ReactComponent as TellorDark } from '../../assets/signum_logo.svg'
//Components
//import WalletConnect from "./WalletConnect";
//Styles
import '../../styles/frontendBoilerplate/Nav.css'
//Contexts
import { ModeContext } from '../../contexts/Mode'

function Nav() {
  const mode = useContext(ModeContext)
  return (
    <div className="Nav">
      <a
        href="https://signum.win/"
        alt="https://signum.win/"
        rel="noopener noreferrer"
      >
        {mode && mode.mode === 'dark' ? (
          <Tellor className="TellorLogo" />
        ) : (
          <TellorDark className="TellorLogo" />
        )}
      </a>
      {/* <WalletConnect /> */}
    </div>
  )
}

export default Nav
