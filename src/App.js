import './App.css';
import ReactDOM from 'react-dom/client';
import ChapterContainer from './components/ChapterContainer';
import NonChapterContainer from './components/NonChapterContainer';
import ReplacementContainer from './components/ReplacementContainer'

import axios from 'axios';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Files:</p>
        <p>This shouldnt be in production</p>
        <div id="fileContainer"></div>
        <button id="addFile" type="button" onClick={add_file_input}>Add file</button>
        <p>Options:</p>
        <div className="container">
          <div className="options-block">
            <div id="bodyFormatContainer">
              <ChapterContainer chapterData={bodyData}/>
            </div>
            <button id="addBodyFormatButton" type="button" onClick={add_chapter_format}>Add chapter file name</button>
          </div>
          <div className="options-block">
            <div id="nonBodyFormatContainer">
              <NonChapterContainer nonChapterData={nonBodyData}/>
            </div>
            <button id="addFile" type="button" onClick={add_non_chapter_format}>Add non-chapter file name</button>
          </div>
          <div className="options-block">
            <div id="replacementsContainer">
              <ReplacementContainer replacementData={replacementData} />
            </div>
            <button id="addFile" type="button" onClick={add_replacement}>Add replacement</button>
          </div>
        </div>
        <div>
          <label htmlFor="outputName">Output Name: </label>
          <input id="outputName" type="text"></input>
        </div>
        <button type="button" onClick={send}>Merge</button>
      </header>
    </div>
  );
}

const backend = process.env.REACT_APP_BACKEND
let nextFileID = 0
let nextChapterID = 1
let nextNonChapterID = 1
let nextReplacementID = 1
const bodyData = [{id: 0, chapterName: 'body'}]
const nonBodyData = [{id: 0, nonChapterName: 'body', descriptor: 'Title Page', checked: true}]
const replacementData = [{id: 0, before: '', after: ''}]
let bodyFormatContainer
let nonBodyFormatContainer
let replacementsContainer
const tinyid = Math.floor(Math.random()*10000)

/**
 * Returns the extension of a file.
 * @function getFileExtension
 * @param {String} name A string representing a file name.
 * @returns {String} The file's extension, if it has one, including the dot. e.g. getFileExtension('test.txt') will return '.txt'
 */
function getFileExtension(name) {
    const start = name.lastIndexOf('.')
    if (start === -1) {
        return ''
    }
    return name.slice(start, name.length)
}


function add_file_input() {
  const fileContainer = document.querySelector('#fileContainer')
  const div = document.createElement('div')
  const inp = document.createElement('input')
  inp.type = 'file'
  inp.id = `file${nextFileID}`
  nextFileID++
  div.appendChild(inp)
  fileContainer.appendChild(div)
  inp.click()
}

function add_chapter_format() {
  if (!bodyFormatContainer) {
    bodyFormatContainer = ReactDOM.createRoot(document.querySelector('#bodyFormatContainer'))
  }
  for(let i = 0;i <= nextChapterID;i++) {
    let chapterName = document.querySelector(`#chapterFormat${i}`)
    if (chapterName) {
      bodyData[i].chapterName = chapterName.value
    }
  }
  bodyData.push({id: nextChapterID, chapterName: ''})
  bodyFormatContainer.render(<ChapterContainer chapterData={bodyData}/>)
  nextChapterID++
}

function add_non_chapter_format() {
  if(!nonBodyFormatContainer) {
    nonBodyFormatContainer = ReactDOM.createRoot(document.querySelector('#nonBodyFormatContainer'))
  }
  for (let i=0;i <= nextNonChapterID;i++) {
    let nonChapterName = document.querySelector(`#nonChapterFileName${i}`)
    let descriptor = document.querySelector(`#descriptor${i}`)
    let checked = document.querySelector(`#beforeChapterCheck${i}`)
    if (nonChapterName && descriptor && checked) {
      nonBodyData[i].nonChapterName = nonChapterName.value
      nonBodyData[i].descriptor = descriptor.value
      nonBodyData[i].checked = checked.value
    }
  }
  nonBodyData.push({id: nextNonChapterID, nonChapterName: '', descriptor: '', checked: true})
  nonBodyFormatContainer.render(<NonChapterContainer nonChapterData={nonBodyData}/>)
  nextNonChapterID++
}

function add_replacement() {
  if (!replacementsContainer) {
    replacementsContainer = ReactDOM.createRoot(document.querySelector('#replacementsContainer'))
  }
  for (let i = 0;i <= nextReplacementID;i++) {
    let before = document.querySelector(`#replaceBefore${i}`)
    let after = document.querySelector(`#replaceAfter${i}`)
    if(before && after) {
      replacementData[i].before = before.value
      replacementData[i].after = after.value
    }
  }
  replacementData.push({id: nextReplacementID, before: '', after: ''})
  replacementsContainer.render(<ReplacementContainer replacementData={replacementData}/>)
  nextReplacementID++
}

function send() {
  let outputName = document.querySelector('#outputName').value
  if (outputName === '') {
    outputName = 'file'
  }
  const formData = new FormData()
  for (let i = 0; i < nextFileID; i++) {
    let file = document.querySelector(`#file${i}`)
    if(file.files.length > 0 && getFileExtension(file.files[0].name) === '.epub') {
      const altered = new File([file.files[0]], tinyid + file.files[0].name, {type: file.files[0].type})
      formData.append('myFiles', altered)
    }
  }
  // const fileContainer = document.querySelector('#fileContainer')
  // for (let child of fileContainer.children) {
  //   if(child.files.length > 0 && getFileExtension(child.files[0].name) === '.epub') {
  //     const altered = new File([child.files[0]], tinyid + child.files[0].name, {type: child.files[0].type})
  //     formData.append('myFiles', altered)
  //   }
  // }
  if(formData.getAll('myFiles').length < 1) {
    alert('No .epubs uploaded!')
    return
  }
  const fileOptions = {
    chapterFormat: [],
    nonChapterXHTML: [],
    replacements: [],
    outputName: outputName
  }
  for (let i = 0; i < nextChapterID; i++) {
    let chapterName = document.querySelector(`#chapterFormat${i}`)
    if (chapterName && chapterName.value) {
      fileOptions.chapterFormat.push(chapterName.value)
    }
  }
  for (let i = 0; i < nextNonChapterID; i++) {
    let fileName = document.querySelector(`#nonChapterFileName${i}`)
    let descriptor = document.querySelector(`#descriptor${i}`)
    let beforeChapter = document.querySelector(`#beforeChapterCheck${i}`)
    if (fileName && descriptor && beforeChapter && fileName.value && descriptor.value) {
      fileOptions.nonChapterXHTML.push({
        format: fileName.value,
        descriptor: descriptor.value,
        isBeforeChapters: beforeChapter.checked
      })
    }
  }
  for (let i = 0; i < nextReplacementID; i++) {
    let before = document.querySelector(`#replaceBefore${i}`)
    let after = document.querySelector(`#replaceAfter${i}`)
    if (before && after && before.value && after.value) {
      fileOptions.replacements.push({before: before.value, after: after.value})
    }
  }
  formData.append('fileOptions',JSON.stringify(fileOptions))
  axios.post(`${backend}/uploads`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then( response => {
    console.log('Files uploaded successfully: ', response.data)
    axios.get(`${backend}/getEpub/${response.data}`, {responseType: 'blob'}).then(response => {
      const href = URL.createObjectURL(response.data)
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', `${outputName}.epub`)
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    }).catch(error => {
      console.log('Error: ', error)
    })
  }).catch(error => {
    console.error('Error:', error)
  });
}

console.log(`Sending requests to ${backend}`)


export default App;
