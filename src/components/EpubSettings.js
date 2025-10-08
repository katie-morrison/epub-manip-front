import ReactDOM from 'react-dom/client';
import { useEffect } from 'react';
import ChapterContainer from './ChapterContainer';
import NonChapterContainer from './NonChapterContainer';
import ReplacementContainer from './ReplacementContainer';
import NavContainer from './NavContainer';

function EpubSettings(props) {
    useEffect(() => {
        fileOptions = props.options
        bodyFormatContainer = ReactDOM.createRoot(document.querySelector('#bodyFormatContainer'))
        nonBodyFormatContainer = ReactDOM.createRoot(document.querySelector('#nonBodyFormatContainer'))
        replacementsContainer = ReactDOM.createRoot(document.querySelector('#replacementsContainer'))
        navsContainer = ReactDOM.createRoot(document.querySelector('#navsContainer'))
        bodyFormatContainer.render(<ChapterContainer chapterData={fileOptions.chapterFormat} />)
        nonBodyFormatContainer.render(<NonChapterContainer nonChapterData={fileOptions.nonChapterXHTML}/>)
        replacementsContainer.render(<ReplacementContainer replacementData={fileOptions.replacements}/>)
        navsContainer.render(<NavContainer navData={fileOptions.xhtmlNav}/>)
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
                    <button type="button" onClick={add_non_chapter_format}>Add chapter exclusion</button>
                    <div id="nonBodyFormatContainer"></div>
                </div>
                <div className="options-block">
                    <button type="button" onClick={add_replacement}>Add replacement</button>
                    <div id="replacementsContainer"></div>
                </div>
                <div className="options-block">
                    <button type="button" onClick={add_nav}>Add navigation file name</button>
                    <div id="navsContainer"></div>
                </div>
            </div>
            <p>Xhtml files in the epubs with names in the format name1, name2, etc will be considered chapters if name is in the chapter file name list. For default settings, this means the program will look for files such as body1.xhtml as chapters.</p>
            <br />
            <p>Xhtml files in the epubs with names <em>exactly</em> matching those in the chapter exclusion list will only be picked up once regardless of how many times it occurs throughout the uploaded epubs. Most files will only be picked up once regardless, but in situations where a file that should not be duplicated is named with the same convention as the chapters, (e.g. each chapter contains a body.xhtml which is a title page, and a body1.xhtml which is a chapter) including the specific file name in the list will prevent it from being treated as a proper chapter.</p>
            <br />
            <p>Entries in the replacement sections will replace each instance of before text in the chapter bodies with an instance of after text.</p>
            <br />
            <p>Entries in the navigation file list will be treated as table of contents files. If a file matches the name of a file in this list <em>exactly</em>, it will be dissected for its content data and stitched together with other similar files to make an updated table of contents. Some epubs dont have these files and only use .ncx files for table of contents.</p>
        </div>
    )
}

let bodyFormatContainer
let nonBodyFormatContainer
let replacementsContainer
let navsContainer
let fileOptions

function add_chapter_format() {
    let lastEntry = fileOptions.chapterFormat.at(-1)
    const id = lastEntry ? lastEntry.id + 1 : 0
    fileOptions.chapterFormat.push({id: id, format: ''})
    bodyFormatContainer.render(<ChapterContainer chapterData={fileOptions.chapterFormat}/>)
}

function add_non_chapter_format() {
    let lastEntry = fileOptions.nonChapterXHTML.at(-1)
    const id = lastEntry ? lastEntry.id + 1 : 0
    fileOptions.nonChapterXHTML.push({id: id, fileName: ''})
    nonBodyFormatContainer.render(<NonChapterContainer nonChapterData={fileOptions.nonChapterXHTML}/>)
}

function add_replacement() {
    let lastEntry = fileOptions.replacements.at(-1)
    const id = lastEntry ? lastEntry.id + 1 : 0
    fileOptions.replacements.push({id: id, before: '', after: ''})
    replacementsContainer.render(<ReplacementContainer replacementData={fileOptions.replacements}/>)
}

function add_nav() {
    let lastEntry = fileOptions.xhtmlNav.at(-1)
    const id = lastEntry ? lastEntry.id + 1 : 0
    fileOptions.xhtmlNav.push({id: id, format: ''})
    navsContainer.render(<NavContainer navData={fileOptions.xhtmlNav}/>)
}

export default EpubSettings