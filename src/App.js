import { useState } from 'react';
import { Web3Storage } from 'web3.storage'
import logo from './assets/Images/logo.png';
import './App.css';



function App(e) {
  const [isVisible, setVisible] = useState(false)
  const [Link, setLink] = useState("")

  function getAccessToken() {

    return process.env.react_app_apiKey

  }

  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
  }

  async function storeFiles() {
    const fileInput = document.querySelector('input[type="file"]')
    const client = makeStorageClient()
    const cid = await client.put(fileInput.files)
    setLink("https://cloudflare-ipfs.com/ipfs/"+ cid )
    setVisible(true)
    console.log('stored files with cid:', cid)
    return cid
  }

  function openLink(){
    window.open(Link,'_blank', 'noopener,noreferrer')
  }

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <input type="file" />
      <button className='upload-button' onClick={() => { storeFiles() }}>Upload Files</button>
      {isVisible
        ?<button className='upload-button' onClick={()=>{openLink()}}>Visit File</button>
        :<></>
      }
    </div>
  );
}
export default App;
