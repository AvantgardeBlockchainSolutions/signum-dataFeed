import React, { useContext } from 'react'
//Assets
import signumLogo from '../../assets/signum_logo.png';
import signumLogoDark from '../../assets/signum_logo.png';
import { ReactComponent as Tellor } from '../../assets/signum_logo.png'
import { ReactComponent as TellorDark } from '../../assets/signum_logo.png'
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
          <img className="TellorLogo" style={{width: "50px"}} src={signumLogo} alt="Signum Logo" />
        ) : (
          <img className="TellorLogo" style={{width: "50px"}} src={signumLogo} alt="Signum Logo" />
        )}
      </a>
      <p style={{ color: "#fbc51b", textDecoration: "underline" }}>TEST NETWORK</p>
      {/* <WalletConnect /> */}
    </div>
  )
}

export default Nav
