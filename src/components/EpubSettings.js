import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import ChapterContainer from './ChapterContainer';
import NonChapterContainer from './NonChapterContainer';
import ReplacementContainer from './ReplacementContainer';

function EpubSettings(props) {
    useEffect(() => {
        fileOptions = props.options
        bodyFormatContainer = ReactDOM.createRoot(document.querySelector('#bodyFormatContainer'))
        nonBodyFormatContainer = ReactDOM.createRoot(document.querySelector('#nonBodyFormatContainer'))
        replacementsContainer = ReactDOM.createRoot(document.querySelector('#replacementsContainer'))
        bodyFormatContainer.render(<ChapterContainer chapterData={fileOptions.chapterFormat} />)
        nonBodyFormatContainer.render(<NonChapterContainer nonChapterData={fileOptions.nonChapterXHTML}/>)
        replacementsContainer.render(<ReplacementContainer replacementData={fileOptions.replacements}/>)
        document.title = 'Upload Settings'
    }, [props])
    return (
        <div>
            <h1>Options:</h1>
            <div className="container">
                <div className="options-block">
                    <button type="button" onClick={add_chapter_format}>Add chapter file name</button>
                    <div id="bodyFormatContainer"></div>
                </div>
                <div className="options-block">
                    <button type="button" onClick={add_non_chapter_format}>Add non-chapter file name</button>
                    <div id="nonBodyFormatContainer"></div>
                </div>
                <div className="options-block">
                    <button type="button" onClick={add_replacement}>Add replacement</button>
                    <div id="replacementsContainer"></div>
                </div>
            </div>
            <p>Xhtml files in the epubs with names in the format name1, name2, etc will be considered chapters if name is in the chapter file name list. For default settings, this means the program will look for files such as body1.xhtml as chapters.</p>
            <br />
            <p>Xhtml files in the epubs with names exactly matching those in the non-chapter file name list will not be considered chapters, and only included once in the final epub, even if they exist in each epub. This is to prevent things like title pages, forewards, or about the author pages from showing up multiple times.</p>
            <br />
            <p>Entries in the replacement sections will replace each instance of before text in the chapter bodies with an instance of after text.</p>
        </div>
    )
}

let bodyFormatContainer
let nonBodyFormatContainer
let replacementsContainer
let fileOptions

function add_chapter_format() {
    let lastEntry = fileOptions.chapterFormat.at(-1)
    const id = lastEntry ? lastEntry.id + 1 : 0
    fileOptions.chapterFormat.push({id: id, format: ''})
    bodyFormatContainer.render(<ChapterContainer chapterData={fileOptions.chapterFormat} />)
}

function add_non_chapter_format() {
    let lastEntry = fileOptions.nonChapterXHTML.at(-1)
    const id = lastEntry ? lastEntry.id + 1 : 0
    fileOptions.nonChapterXHTML.push({id: id, format: '', descriptor: '', isBeforeChapters: true})
    nonBodyFormatContainer.render(<NonChapterContainer nonChapterData={fileOptions.nonChapterXHTML}/>)
}

function add_replacement() {
    let lastEntry = fileOptions.replacements.at(-1)
    const id = lastEntry ? lastEntry.id + 1 : 0
    fileOptions.replacements.push({id: id, before: '', after: ''})
    replacementsContainer.render(<ReplacementContainer replacementData={fileOptions.replacements}/>)
}

export default EpubSettings