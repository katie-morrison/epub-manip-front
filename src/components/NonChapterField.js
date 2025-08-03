function NonChapterField(props) {
    return (
        <div>
            <label htmlFor={'nonChapterFileName' + props.id}>File Name:</label>
            <input id={'nonChapterFileName' + props.id} type='text' defaultValue={props.nonChapterName}></input>
            <label htmlFor={'descriptor' + props.id}>Descriptor:</label>
            <input id={'descriptor' + props.id} type='text' defaultValue={props.descriptor}></input>
            <label htmlFor={'beforeChapterCheck' + props.id}>Before Chapters?</label>
            <input id={'beforeChapterCheck' + props.id} type='checkbox' defaultChecked={props.checked}></input>
        </div>
    )
}

export default NonChapterField