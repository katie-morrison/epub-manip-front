import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import EpubManip from './EpubManip';
import EpubSettings from './EpubSettings';
import EpubDiagnostics from './EpubDiagnostics';

function EpubDirectory() {
    useEffect(() => {
        if(!directoryContainer) {
            directoryContainer = ReactDOM.createRoot(document.querySelector('#epubDirectoryContainer'))
        }
    }, [])
    return (
        <div>
            <header className='App-header'>
                <div>
                    <button onClick={display_main}>Main</button>
                    <button onClick={display_settings}>Settings</button>
                    <button onClick={display_diagnostics}>Epub Diagnostics</button>
                </div>
                <div id="epubDirectoryContainer">
                    <EpubManip options={fileOptions} />
                </div>
            </header>
        </div>
    )
}

let directoryContainer
const fileOptions = {
    chapterFormat: [{id: 0, format: 'body'}],
    nonChapterXHTML: [{id: 0, format: 'body', descriptor: 'Title Page', isBeforeChapters: true}],
    replacements: []
  }

function display_main() {
    updateOptions()
    directoryContainer.render(<EpubManip options={fileOptions} />)
}

function display_settings() {
    updateOptions()
    directoryContainer.render(<EpubSettings options={fileOptions} />)
}

function display_diagnostics() {
    updateOptions()
    directoryContainer.render(<EpubDiagnostics />)
}

function updateOptions() {
    let bodyFormatContainer = document.querySelector('#bodyFormatContainer')
    let nonBodyFormatContainer = document.querySelector('#nonBodyFormatContainer')
    let replacementsContainer = document.querySelector('#replacementsContainer')
    if (bodyFormatContainer && nonBodyFormatContainer && replacementsContainer) {
        let newChapterFormats = []
        let newNonBodyFormats = []
        let newReplacements = []
        let chapterFormats = bodyFormatContainer.querySelectorAll('.chapterFormat')
        let nonBodyFormats = nonBodyFormatContainer.querySelectorAll('.nonChapterField')
        let replacements = replacementsContainer.querySelectorAll('.replaceField')
        for (let chapterFormat of chapterFormats) {
            if (chapterFormat.value) {
                let id = parseInt(chapterFormat.id.replace('chapterFormat', ''))
                newChapterFormats.push({id: id, format: chapterFormat.value})
            }
        }
        for (let nonBodyFormat of nonBodyFormats) {
            let format = nonBodyFormat.querySelector('.nonChapterFileName')
            let descriptor = nonBodyFormat.querySelector('.descriptor')
            if (format.value && descriptor.value) {
                let id = parseInt(format.id.replace('nonChapterFileName', ''))
                let isBeforeChapters = nonBodyFormat.querySelector('.beforeChapterCheck')
                newNonBodyFormats.push({id: id, format: format.value, descriptor: descriptor.value, isBeforeChapters: isBeforeChapters.checked})
            }
        }
        for (let replacement of replacements) {
            let before = replacement.querySelector('.replaceBefore')
            let after = replacement.querySelector('.replaceAfter')
            if (before.value && after.value) {
                let id = parseInt(before.id.replace('replaceBefore', ''))
                newReplacements.push({id: id, before: before.value, after: after.value})
            }
        }
        fileOptions.chapterFormat = newChapterFormats
        fileOptions.nonChapterXHTML = newNonBodyFormats
        fileOptions.replacements = newReplacements
    }
}

export default EpubDirectory