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
                <div className='navigation-container'>
                    <button className='link-style' onClick={display_main}>Main</button>
                    <button className='link-style' onClick={display_settings}>Settings</button>
                    <button className='link-style' onClick={display_diagnostics}>Epub Diagnostics</button>
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
    nonChapterXHTML: [{id: 0, fileName: 'body'}],
    xhtmlNav: [{id: 0, format: 'contents'}, {id: 1, format: 'nav'}],
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
    let navsContainer = document.querySelector('#navsContainer')
    if (bodyFormatContainer && nonBodyFormatContainer && replacementsContainer && navsContainer) {
        let newChapterFormats = []
        let newNonBodyFormats = []
        let newReplacements = []
        let newNavs = []
        let chapterFormats = bodyFormatContainer.querySelectorAll('.chapterFormat')
        let nonBodyFormats = nonBodyFormatContainer.querySelectorAll('.nonChapterFileName')
        let replacements = replacementsContainer.querySelectorAll('.replaceField')
        let navs = navsContainer.querySelectorAll('.navFormat')
        for (let chapterFormat of chapterFormats) {
            if (chapterFormat.value) {
                let id = parseInt(chapterFormat.id.replace('chapterFormat', ''))
                newChapterFormats.push({id: id, format: chapterFormat.value})
            }
        }
        for (let nonBodyFormat of nonBodyFormats) {
            if (nonBodyFormat.value) {
                let id = parseInt(nonBodyFormat.id.replace('nonChapterFileName', ''))
                newNonBodyFormats.push({id: id, fileName: nonBodyFormat.value})
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
        for (let nav of navs) {
            if (nav.value) {
                let id = parseInt(nav.id.replace('navFormat', ''))
                newNavs.push({id: id, format: nav.value})
            }
        }
        fileOptions.chapterFormat = newChapterFormats
        fileOptions.nonChapterXHTML = newNonBodyFormats
        fileOptions.replacements = newReplacements
        fileOptions.xhtmlNav = newNavs
    }
}

export default EpubDirectory