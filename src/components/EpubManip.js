import { useEffect } from 'react';
import axios from 'axios';

import { getFileExtension } from '../util/file-functions';


function EpubManip(props) {
    useEffect(() => {
        fileOptions = props.options
        document.title = 'Epub Upload'
    }, [props])
    return (
        <div>
            <h1>Files:</h1>
            <div id="fileContainer"></div>
            <button id="addFile" type="button" onClick={add_file_input}>Add file</button>
            <div>
                <label htmlFor="outputName">Output Name: </label>
                <input id="outputName" type="text"></input>
            </div>
            <button type="button" onClick={send}>Merge</button>
            <p>The purpose of this page is to help merge epub files representing individual, serialized chapters into one epub file. Some light editing is also supported.</p>
            <br />
            <p>Please note, this is an ongoing project, and due to structural quirks, some epubs may not currently work properly. If you do not have epub files, but would like to play around regardless, you can download a set of samples below:</p>
            <button type="button" onClick={downloadDemoFiles}>Download Demo Files</button>
        </div>
    )
}

function downloadDemoFiles() {
  downloadFileViaAxios(`${backend}/getDemoEpubs`, 'Demo.zip')
}

function downloadFileViaAxios(route, name) {
  axios.get(route, {responseType: 'blob'}).then(response => {
    const href = URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = href
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }).catch(error => {
    console.log('Error: ', error)
  })
}

const backend = process.env.REACT_APP_BACKEND
const tinyid = Math.floor(Math.random()*10000)
let fileOptions

function add_file_input() {
    const fileContainer = document.querySelector('#fileContainer')
    const div = document.createElement('div')
    const inp = document.createElement('input')
    inp.type = 'file'
    inp.className = 'upload'
    div.appendChild(inp)
    fileContainer.appendChild(div)
    inp.click()
}



function send() {
  let outputName = document.querySelector('#outputName').value
  if (outputName === '') {
    outputName = 'file'
  }
  const formData = new FormData()
  let files = document.querySelector('#fileContainer').querySelectorAll('.upload')
  files.forEach(file => {
    if(file.files.length > 0 && getFileExtension(file.files[0].name) === '.epub') {
      const altered = new File([file.files[0]], tinyid + file.files[0].name, {type: file.files[0].type})
      formData.append('myFiles', altered)
    }
  })
  if(formData.getAll('myFiles').length < 1) {
    alert('No .epubs uploaded!')
    return
  }
  fileOptions.outputName = outputName
  formData.append('fileOptions',JSON.stringify(fileOptions))
  axios.post(`${backend}/uploads`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then( response => {
    console.log('Files uploaded successfully: ', response.data)
    downloadFileViaAxios(`${backend}/getEpub/${response.data}`, `${outputName}.epub`)
  }).catch(error => {
    console.error('Error:', error)
  });
}

console.log(`Sending requests to ${backend}`)

export default EpubManip