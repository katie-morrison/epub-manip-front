function NonChapterField(props) {
    return (
        <div className='nonChapterField'>
            <label htmlFor={'nonChapterFileName' + props.id}>File Name:</label>
            <input id={'nonChapterFileName' + props.id} className='nonChapterFileName' type='text' defaultValue={props.nonChapterName}></input>
            <label htmlFor={'descriptor' + props.id}>Descriptor:</label>
            <input id={'descriptor' + props.id} className='descriptor' type='text' defaultValue={props.descriptor}></input>
            <label htmlFor={'beforeChapterCheck' + props.id}>Before Chapters?</label>
            <input id={'beforeChapterCheck' + props.id} className='beforeChapterCheck' type='checkbox' defaultChecked={props.checked}></input>
        </div>
    )
}

export default NonChapterField