function NonChapterField(props) {
    return (
        <div className='nonChapterField'>
            <label htmlFor={'nonChapterFileName' + props.id}>File Name:</label>
            <input id={'nonChapterFileName' + props.id} className='nonChapterFileName' type='text' defaultValue={props.fileName}></input>
        </div>
    )
}

export default NonChapterField