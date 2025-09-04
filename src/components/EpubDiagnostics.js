import { useEffect } from 'react'
import axios from 'axios'

import { getFileExtension } from "../util/file-functions"

function EpubDiagnostics() {
    useEffect(() => {
        document.title = 'Epub Diagnostics'
    })
    return (
        <div>
            <h1>Diagnostics: </h1>
            <input id='diagnosticFile' type='file'></input>
            <button type='button' onClick={getDiagnostics}>Diagnose</button>
            <ol id='epubFiles'></ol>
            <p>Here you can upload an epub file to easily view the names of the files inside, to help choose the correct values for the settings page.</p>
        </div>
    )
}

const backend = process.env.REACT_APP_BACKEND

function getDiagnostics() {
    const formData = new FormData()
    let file = document.querySelector('#diagnosticFile')
    if(file.files.length > 0 && getFileExtension(file.files[0].name) === '.epub') {
        formData.append('myFile', file.files[0])
    }
    if (formData.getAll('myFile').length < 1) {
        console.error('No valid epub uploaded!')
        return
    }
    axios.post(`${backend}/calculateDiagnostics`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        let ol = document.querySelector('#epubFiles')
        ol.replaceChildren()
        for (let name of response.data) {
            const item = document.createElement('li')
            item.textContent = name
            ol.appendChild(item)
        }
    }).catch(error => {
        console.error('Error:', error)
    })
}

export default EpubDiagnostics